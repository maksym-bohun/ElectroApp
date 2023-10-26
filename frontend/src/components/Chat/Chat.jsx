import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
import Navigation from "../navigation/Navigation";
// allUsersRoute,
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAdv, setCurrentAdv] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const currentUserFromState = useSelector(
    (state) => state.currentUserReducer.user
  );

  const socket = useRef();

  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  //     setIsLoaded(true);
  //   }
  // }, []);

  // useEffect(async () => {
  //   if (currentUser) {
  //     if (currentUser.isAvatarImageSet) {
  //       const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
  //       setContacts(data.data.users);
  //     } else {
  //       navigate("/setAvatar");
  //     }
  //   }
  // }, [currentUser]);

  const getChat = async () => {
    if (
      currentUserFromState &&
      Object.values(currentUserFromState).length !== 0
    ) {
      setCurrentUser(currentUserFromState);
      console.log("get and post chat");
      console.log(currentUser, params.advertisementId);
      const { data } = await axios.post(getAndPostChat, {
        sender: currentUserFromState,
        advertisement_id: params.advertisementId,
      });
      setCurrentChat(data.chat);
      console.log("data.chat", data.chat);
      setIsLoaded(true);
    } else {
      fetch(getMeRoute, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => res.json())
        .then((userData) => {
          setCurrentUser(userData.data);
          axios
            .post(getAndPostChat, {
              sender: userData.data,
              advertisement_id: params.advertisementId,
            })
            .then((chatData) => {
              console.log(chatData.data.chat);
              setCurrentChat(chatData.data.chat);
              setIsLoaded(true);
            });
        });
    }
  };

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === ""
    ) {
      navigate("/signin");
    } else {
      getChat();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const getAdvertisment = async () => {
    console.log("currenct chat in getAdv", currentChat);
    const { data } = await axios.get(
      `${getAdvertisementRoute}/${currentChat.advertisement_id}`
    );
    console.log(data.data);
    setCurrentAdv(data.data);
  };

  useEffect(() => {
    if (currentChat !== undefined) {
      console.log("CURRENT CHAT EXISTS", currentChat);
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
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
