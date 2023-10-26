import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

function ChatContainer({ currentChat, currentUser, socket }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const getMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentChat.users.sender._id,
      to: currentChat.users.author._id,
    });
    setMessages(response.data.messages);
  };

  useEffect(() => {
    console.log("currentChat", currentChat);

    if (currentChat) getMessages();
    setIsLoaded(true);
  }, [currentChat]);

  const handleSendMsg = async (message) => {
    await axios.post(sendMessageRoute, {
      from: currentChat.users.sender._id,
      to: currentChat.users.author._id,
      message,
    });

    socket.current.emit("send-message", {
      from: currentChat.users.sender._id,
      to: currentChat.users.author._id,
      msg: message,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage)
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
    console.log("RECIEVE MSG", arrivalMessage);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      {isLoaded && (
        <>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={
                    require(`../../../../backend/images/users/${currentChat.users.author.photo}`) ||
                    require("../../images/user.png")
                  }
                  alt="User's image"
                />
              </div>
              <div className="username">
                {/* <h3>{currentChat.author.username}</h3> */}
              </div>
            </div>
            {/* <Logout /> */}
          </div>

          {/* <Messages /> */}
          {/* <div className="chat-messages">
            {messages.map((msg) => {
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`message ${
                      msg.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <p className="content">{msg.message}</p>
                  </div>
                </div>
              );
            })}
          </div> */}
        </>
      )}
      <ChatInput className="chat-input" handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      color: #fff;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;
