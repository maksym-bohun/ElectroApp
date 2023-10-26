import React, { useEffect, useState } from "react";
import { getAllChatsRoute } from "../../utils/APIRoutes";

const AllChats = () => {
  const [allChats, setAllChats] = useState([]);

  const fetchChats = async () => {
    const res = await fetch(getAllChatsRoute, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    const buyChatsUnique = new Set(data.chats.buy);
    console.log(buyChatsUnique);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div></div>;
};

export default AllChats;
