import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import Spinner from "../UI/Spinner";
import {
  getAdvertisementRoute,
  getAndPostChat,
  getMeRoute,
  host,
} from "../../utils/APIRoutes";
import { useSelector } from "react-redux";
import ChatContainer from "./ChatContainer";
import Navigation from "../navigation/Navigation";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAdv, setCurrentAdv] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  let chat = null,
    user = null;
  if (location.state?.chat) {
    chat = location.state.chat;
    user = location.state.user;
  }
  const params = useParams();
  const currentUserFromState = useSelector(
    (state) => state.currentUserReducer.user
  );

  const socket = useRef();

  const getChat = async () => {
    if (
      currentUserFromState &&
      Object.values(currentUserFromState).length !== 0
    ) {
      setCurrentUser(currentUserFromState);
      const { data } = await axios.post(getAndPostChat, {
        sender: currentUserFromState,
        advertisement_id: params.advertisementId,
      });
      setCurrentChat(data.chat);
      setIsLoaded(true);
    } else {
      console.log("ELSE");
      fetch(getMeRoute, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((userData) => {
          console.log("Got me", userData.data);
          setCurrentUser(userData.data);
          axios
            .post(getAndPostChat, {
              sender: userData.data._id,
              advertisement_id: params.advertisementId,
            })
            .then((chatData) => {
              console.log("ELSE", chatData);
              setCurrentChat(chatData.data.chat);
              setIsLoaded(true);
            });
        });
    }
  };

  useEffect(() => {
    if (!chat) {
      if (
        !localStorage.getItem("token") ||
        localStorage.getItem("token") === ""
      ) {
        navigate("/signin");
      } else {
        getChat();
      }
    } else {
      setCurrentChat(chat);
      setIsLoaded(true);
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      console.log(currentUser._id);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const getAdvertisment = async () => {
    const { data } = await axios.get(
      `${getAdvertisementRoute}/${
        chat ? currentChat.advertisement_id._id : currentChat.advertisement_id
      }`
    );
    setCurrentAdv(data.data);
  };

  useEffect(() => {
    if (currentChat !== undefined) {
      getAdvertisment();
    }
  }, [currentChat]);

  return (
    <>
      <Navigation />
      <Container>
        {!isLoaded && <Spinner />}
        {isLoaded && currentAdv && (
          <div className="container">
            <ChatContainer
              chat={chat}
              user={user}
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              advertisement={currentAdv}
            />
          </div>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #f3f3f3;
  .container {
    height: 85vh;
    width: 75vw;
    border-radius: 15px;
    border: 2px solid #898989;
    background-color: #fff;
    display: grid;
    grid-template-columns: 100% 0%;
    // @media screen and (min-width: 720px) and (max-width: 1080px) {
    //   grid-template-columns: 35% 65%;
    // }
  }
`;
