import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import Game from "../components/Game";
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
  min-width: 900px;
  min-height: 900px;
  box-shadow: 0 10px 6px rgb(32 33 36 / 45%);
  border: 4px solid black;
`;

const HeadContainer = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.5fr 0.8fr;
  font-size: 1.6rem;
  letter-spacing: 0.4rem;
`;

const HeadItem = styled.div`
  padding: 7px;
  text-align: center;
  border-bottom: 4px solid black;
  &.combine {
    grid-row: span 2;
    border-left: 4px solid black;
    &.bigText {
      font-size: 2.7rem;
      padding-top: 20px;
    }
  }
  &.combine2 {
    grid-column: span 3;
    text-align: left;
    padding-left: 23px;
  }
  > img {
    margin: 0;
    padding: 0;
    width: 240px;
    height: 65px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-left: -220px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3.3rem;
  padding: 35px 25px 5px 25px;
  letter-spacing: 0.8rem;
  line-height: 4rem;
  font-weight: 500;
  > img {
    position: absolute;
    top: 130px;
    left: 425px;
    width: 300px;
    height: 190px;
    z-index: 3;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function Main() {
  const [coinCount, setCoinCount] = useState(
    JSON.parse(localStorage.getItem("coins")) || 0
  );
  // * 로컬스토리지 적용 *
  // todos의 초기값을
  // 1. 로컬스토리지에 "todos"라는 키가 있으면 해당 value를 parsing하고,
  // 2. 없는경우 todos상태(값)의 빈배열로함
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // 의존성배열 []로, 초기 랜더링시 1번 useEffect훅의 콜백함수 실행
  // 컴포넌트 처음 마운트 시 로컬 저장소 값와 상태(state)를 동기화하기 위함
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCoins = localStorage.getItem("coins");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      setCoinCount(JSON.parse(storedCoins));
    }
  }, []);

  // todos의 상태가 바뀔때마다 로컬스토리지의 "todos" 라는 키의 value를 json형태로 저장
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("coins", JSON.stringify(coinCount));
  }, [todos, coinCount]);

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
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
            <TodoList
              todos={todos}
              handleDeleteTodo={handleDeleteTodo}
              setTodos={setTodos}
            ></TodoList>
            <Game
              todos={todos}
              coinCount={coinCount}
              setCoinCount={setCoinCount}
            ></Game>
          </MainContainer>
        </Container>
      </BackgroundImage>
    </>
  );
}

export default Main;
