import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

const Gamecontainer = styled.div`
  padding: 20px 20px 20px 15px;
  width: 415px;
`;

const GameTop = styled.div`
  border: 2.5px solid black;
  background: rgba(235, 235, 235, 0.589);
  border-radius: 10px 10px 0 0;
  padding: 4.5px 0px 4.5px 10px;
  font-size: 1.2rem;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    letter-spacing: 0.2rem;

    > img {
      width: 80px;
      margin-left: 205px;
    }
  }
`;

const GameMain = styled.div`
  border-right: 2.5px solid black;
  border-bottom: 2.5px solid black;
  border-left: 2.5px solid black;
  // 박스크기 조정
  height: 499px;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15px;

  > div {
    &.bigtext {
      font-size: 2rem;
    }

    &.middletext {
      font-size: 1.5rem;
      margin: 5px 5px 0px 5px;
    }

    &.smalltext {
      font-size: 1rem;
      margin-top: 10px;
      text-align: left;
    }
  }

  > img {
    width: 350px;
    height: 270px;
  }

  .coin {
    font-size: 0.9rem;
    margin-left: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      width: 20px;
      margin-right: 5px;
    }
  }
`;

const Effect = keyframes`
//단계 별로 변화를 주는 코드
0% {
    color: black;
    font-size: 1.7rem;
    font-weight: 600;
  }
  49% {
    color: black;
    font-size: 1.5rem;
    font-weight: 500;
  }
  70% {
    color: transparent;
  }
  97% {
    color: transparent;
  }
  100% {
    color: black;
    font-size: 1.7rem;
    font-weight: 600;
  }
`;

const Click = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 15px;
  width: 50%;
  height: 12%;
  border: 2.5px solid black;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
  background: rgba(235, 235, 235, 0.589);

  &:hover {
    background: #595959;
    color: white;
  }

  &.enter {
    animation: ${Effect} 1.5s ease infinite;
  }
`;

const Game = ({ todos, setTodos, coinCount, setCoinCount }) => {
  // 보유 코인수 상태관리를 위한 useState
  // const [coinCount, setCoinCount] = useState(0);

  useEffect(() => {
    // todos의 상태가 바뀔때마다 랜더링
    // coin 초기값을 completedTodos로 설정
    const completedTodos = todos.filter((todo) => todo.completed).length;
    setCoinCount(completedTodos);
  }, [todos]);

  // 페이지 이동 navigate
  const navigate = useNavigate();

  // 클릭시 보유코인수를 3개씩 감소시키는 이벤트핸들러 + 페이지 이동
  const handleEnterGame = () => {
    if (coinCount >= 3) {
      setCoinCount((prevCoinCount) => prevCoinCount - 3);
      setTimeout(() => {
        navigate("/slotgame");
      }, 500);
    }
  };

  return (
    <Gamecontainer>
      <GameTop>
        <div>
          🎰 오락실
          <img src="/imgs/menuimage.png" alt="메뉴이미지"></img>
        </div>
      </GameTop>
      <GameMain>
        <div className="bigtext">코 딩 랜 드</div>
        <img src="/imgs/gameslot.png" alt="메뉴이미지"></img>
        <div className="middletext">안 내 사 항</div>
        <div className="coin">
          <img src="/imgs/coin.png" alt="코인사진"></img>보유코인 수:
          {coinCount}개
        </div>
        <div className="smalltext">
          - 과제 1개 완성시 코인 1개씩을 드립니다.
        </div>
        <div className="smalltext">
          - 코딩 랜드 입장에는 코인 3개가 필요합니다.
        </div>

        {coinCount >= 3 ? (
          <Click className="enter" onClick={handleEnterGame}>
            {">>> 입장 <<<"}
          </Click>
        ) : (
          <Click>{"입장불가"}</Click>
        )}
      </GameMain>
    </Gamecontainer>
  );
};

export default Game;
