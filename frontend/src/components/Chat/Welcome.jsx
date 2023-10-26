import React from "react";
import styled from "styled-components";

function Welcome({ user }) {
  return (
    <Container>
      {/* <img src={Robot} alt="Robot" />{" "} */}
      <h1>
        Welcome, <span>{user?.username}</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    height: 20rem;
  }

  span {
    color: #4e0eff;
  }
`;

export default Welcome;
