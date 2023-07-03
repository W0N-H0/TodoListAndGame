import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slot from "../components/Slot";
import backgroundImg from "../img/background.jpg";

const Background = styled.div`
  background-image: url(${backgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .title {
    margin: -200px 0 10px 0;
    color: white;
    font-size: 4.5rem;
    text-align: center;
    letter-spacing: 0.5rem;
    line-height: 7rem;
    font-weight: 700;
    background-color: rgba(255, 88, 238, 0.75);
    border-radius: 10px;
    padding: 5px;
  }
`;

function SlotGame() {
  return (
    <>
      <Background>
        <div className="title">
          WELCOME TO <br /> CODING LAND!
        </div>
        <Slot></Slot>
      </Background>
    </>
  );
}

export default SlotGame;
