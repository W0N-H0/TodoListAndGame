import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import styled from "styled-components";

const BackgroundImage = styled.div`
  background-image: url("./imgs/backgroundimage.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <>
      <BackgroundImage>
        <div>테스트</div>
        <TodoList></TodoList>
      </BackgroundImage>
    </>
  );
}

export default App;
