import "./App.css";
import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import styled from "styled-components";

const BackgroundImage = styled.div`
  background-image: url("./imgs/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-image: url("./imgs/container.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  min-width: 1100px;
  min-height: 1030px;
  box-shadow: 0 10px 6px rgb(32 33 36 / 45%);
  border: 4px solid black;
`;

const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 0.8fr;
  font-size: 2rem;
  letter-spacing: 0.4rem;
`;

const HeadItem = styled.div`
  padding: 10px;
  text-align: center;
  border-bottom: 4px solid black;
  &.combine {
    grid-row: span 2;
    border-left: 4px solid black;
    &.bigText {
      font-size: 3rem;
      padding-top: 26px;
    }
  }
  &.combine2 {
    grid-column: span 3;
    text-align: left;
    padding-left: 50px;
  }
  > img {
    margin: 0;
    padding: 0;
    width: 240px;
    height: 80px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-left: -220px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3.3rem;
  padding: 25px 25px 5px 25px;
  letter-spacing: 1.3rem;
  line-height: 5rem;
  > img {
    position: absolute;
    top: 165px;
    left: 540px;
    width: 370px;
    height: 210px;
    z-index: 3;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <>
      <BackgroundImage>
        <Container>
          <HeadContainer>
            <HeadItem>구 호</HeadItem>
            <HeadItem className="combine bigText">가 정 통 신 문</HeadItem>
            <HeadItem className="combine">
              <img src="/imgs/headimage.png" alt="코망주로고"></img>
            </HeadItem>
            <HeadItem>재밌는 코딩</HeadItem>
            <HeadItem className="combine2">제목: 공부하고 게임도 하기</HeadItem>
          </HeadContainer>

          <TitleContainer>
            <div>
              오늘
              <br />
              뭐하지?
            </div>
            <img src="/imgs/titleimage3.png" alt="타이틀이미지"></img>
          </TitleContainer>
          <MainContainer>
            <TodoList></TodoList>
            <div>게임창</div>
          </MainContainer>
        </Container>
      </BackgroundImage>
    </>
  );
}

export default App;
