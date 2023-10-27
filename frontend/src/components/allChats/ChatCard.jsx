import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMeRoute } from "../../utils/APIRoutes";

const ChatCard = ({ chat, panel }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const getMe = async () => {
    const res = await fetch(getMeRoute, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();

    setCurrentUser(data.data);
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <Container>
      <Link
        to={`/chat/${chat.advertisement_id._id}`}
        state={{ chat, user: currentUser }}
      >
        <div className="container">
          <img
            src={require(`../../../../backend/images/products/${chat.advertisement_id.images[0]}`)}
            alt="Product image"
          />
          <div className="chat-info">
            <div className="username">
              {panel === "buy"
                ? chat.users.author.name
                : chat.users.sender.name}
            </div>
            <div className="advertisement-name">
              {chat.advertisement_id.name}
            </div>
            <div className="last-message">{chat.last_message}</div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 6fr;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    img {
      height: 5.2rem;
      max-width: 7rem;
      object-fit: cover;
      // border-radius: 50%;
      justify-self: center;
    }

    .chat-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      font-size: 1.1rem;
      margin-left: 1rem;

      .username,
      .last-message {
        color: #7b7b7b;
      }

      .advertisement-name {
        font-weight: 500;
      }

      .last-message {
        font-weight: 600;
      }
    }
  }
`;

export default ChatCard;
