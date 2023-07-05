import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slot from "../components/Slot";
import backgroundImg from "../img/background.jpg";
import { useNavigate } from "react-router-dom";

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
    margin: -200px 0 20px 0;
    color: white;
    font-size: 4.5rem;
    text-align: center;
    letter-spacing: 0.5rem;
    line-height: 7rem;
    font-weight: 700;
    background-color: rgba(255, 88, 238, 0.75);
    border-radius: 10px;
    padding: 5px 15px 5px 20px;
    border: 4px dashed white;
  }

  > .goToMain {
    position: fixed;
    top: 0px;
    left: 0px;
    color: white;
    border-radius: 5px;
    border: 3px dashed white;
    padding: 7px;
    background: rgba(255, 88, 238, 0.95);
    font-size: 1.5rem;
    margin: 1px;
    cursor: pointer;

    &:hover {
      background: #a466f7;
    }
  }
`;

function SlotGame() {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate("/");
  };

  return (
    <>
      <Background>
        <div className="goToMain" onClick={handleGoToMain}>
          GO BACK
        </div>
        <div className="title">
          WELCOME TO <br /> CODING LAND!
        </div>
        <Slot></Slot>
      </Background>
    </>
  );
}

export default SlotGame;
