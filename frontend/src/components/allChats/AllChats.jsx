import React, { useEffect, useState } from "react";
import { getAllChatsRoute } from "../../utils/APIRoutes";
import Navigation from "../navigation/Navigation";
import styled from "styled-components";
import ChatCard from "./ChatCard";
import { v4 as uuidv4 } from "uuid";

const AllChats = () => {
  const [buyChats, setBuyChats] = useState([]);
  const [sellChats, setSellChats] = useState([]);
  const [showPanel1, setShowPanel1] = useState(true);
  const [showPanel2, setShowPanel2] = useState(false);

  const fetchChats = async () => {
    const res = await fetch(getAllChatsRoute, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setBuyChats(data.chats.buy);
    setSellChats(data.chats.sell);
    console.log(data.chats.buy);
  };

  const togglePanel = (panel) => {
    if (panel == 1) {
      setShowPanel1(true);
      setShowPanel2(false);
    } else {
      setShowPanel2(true);
      setShowPanel1(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      <Navigation />
      <Container>
        <div className="accordion">
          <div
            className={`accordion-header ${
              showPanel1 ? "accordion-active" : ""
            }`}
            onClick={() => togglePanel(1)}
          >
            Купую
          </div>
          <div
            className={`accordion-header ${
              showPanel2 ? "accordion-active" : ""
            }`}
            onClick={() => togglePanel(2)}
          >
            Продаю
          </div>
        </div>
        {showPanel1 && (
          <div className="accordion-panel" id="panel1">
            {buyChats.map((chat) => (
              <ChatCard chat={chat} panel="buy" key={uuidv4()} />
            ))}
          </div>
        )}
        {showPanel2 && (
          <div className="accordion-panel" id="panel2">
            {sellChats.map((chat) => (
              <ChatCard chat={chat} panel="sell" key={uuidv4()} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 0.5rem;

  .accordion {
    display: flex;
    justify-content: center;
    gap: 2rem;

    &-header {
      cursor: pointer;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 5px;
      width: 10%;
      text-align: center;
      margin-bottom: 2rem;
    }

    &-panel {
      padding: 10px;
      border-radius: 4px;
      margin: 5px;
      width: 50%;
      margin: 5px auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &-active {
      background-color: #373737;
      color: #fff;
    }
  }

  .accordion .active-panel {
    display: block;
  }
`;

export default AllChats;
