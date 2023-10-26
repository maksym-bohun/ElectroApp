import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import {
  getAdvertisementRoute,
  getAndPostChat,
  host,
} from "../../utils/APIRoutes";
import { useSelector } from "react-redux";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";
// allUsersRoute,
// import ChatContainer from "../components/ChatContainer";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAdv, setCurrentAdv] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const currentUser = useSelector((state) => state.currentUserReducer.user);

  const socket = useRef();

  // useEffect(async () => {
  //   if (!localStorage.getItem("chat-app-user")) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
  //     setIsLoaded(true);
  //   }
  // }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
    if (currentUser) {
      const { data } = await axios.post(getAndPostChat, {
        sender: currentUser,
        advertisement_id: params.advertisementId,
      });
      setCurrentChat(data.chat);
      console.log("data.chat", data.chat);
      setIsLoaded(true);
    }
  };

  const getAdvertisment = async () => {
    const { data } = await axios.get(
      `${getAdvertisementRoute}/${currentChat.advertisement_id}`
    );
    setCurrentAdv(data.data);
  };

  useEffect(() => {
    if (currentChat !== undefined) {
      getAdvertisment();
    }
  }, [currentChat]);

  useEffect(() => {
    getChat();
  }, [currentUser]);

  return (
    <>
      <Container>
        <div className="container">
          {isLoaded && currentAdv && (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
              advertisement={currentAdv}
            />
          )}
        </div>
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
