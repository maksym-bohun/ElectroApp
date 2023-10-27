import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { FaHryvnia } from "react-icons/fa";

function ChatContainer({
  currentChat,
  currentUser,
  socket,
  advertisement,
  chat,
  user,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  if (chat) {
    currentChat = chat;
    currentUser = user;
  }
  const otherUser =
    currentChat.users.sender._id !== currentUser._id
      ? currentChat.users.sender
      : currentChat.users.author;

  const getMessages = async () => {
    const response = await axios.post(getAllMessagesRoute, {
      from: currentUser._id,
      to: otherUser._id,
      advertisement_id: advertisement._id,
    });
    setMessages(response.data.messages);
  };

  useEffect(() => {
    if (currentChat) {
      getMessages();
      setIsLoaded(true);
    }
  }, [currentChat]);

  const handleSendMsg = async (message) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: otherUser._id,
      message,
      advertisement_id: advertisement._id,
    });

    socket.current.emit("send-message", {
      from: currentUser._id,
      to: otherUser._id,
      msg: message,
    });

    const msgs = [...messages];
    msgs.push({
      sender: currentUser._id,
      message: { text: message },
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        setArrivalMessage({ message: { text: data.msg }, sender: data.sender });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage)
      setMessages((prevMessages) => [...prevMessages, arrivalMessage]);
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
                    require(`../../../../backend/images/products/${advertisement.images[0]}`) ||
                    require("../../images/user.png")
                  }
                  alt="User's image"
                />
              </div>
              <div className="username">
                <h3>{advertisement.name}</h3>
              </div>
              <div className="price">
                <FaHryvnia size={20} />
                <h3>{advertisement.price}</h3>
              </div>
            </div>
            {/* <Logout /> */}
          </div>

          {/* <Messages /> */}
          <div className="chat-messages">
            {messages.map((msg) => {
              return (
                <div key={uuidv4()} ref={scrollRef}>
                  <div
                    className={`message ${
                      msg.sender === currentUser._id ? "sended" : "recieved"
                    }`}
                  >
                    {/* {console.log("msg", msg)} */}
                    <p className="content">{msg.message.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      <ChatInput className="chat-input" handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 12% 76% 12%;
  //   gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    background-color: #373737;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: grid;
      width: 95%;
      grid-template-columns: 10% 80% 10%;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4.2rem;
          //   width: 4.2rem;
          object-fit: cover;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
      .price {
        color: #fff;
        display: flex;
        align-items: center;
        gap: 0.1rem;
        // justify-self: right;
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    // gap: 1rem;
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
        color: #fff;
        background-color: #373737;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        color: #fff;
        background-color: #7b7b7b;
      }
    }
  }
`;

export default ChatContainer;
