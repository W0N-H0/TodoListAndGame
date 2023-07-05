import React, { useRef, useState, useEffect } from "react";
import GameWrap from "./GameWrap";
import RollContainer from "./RollContainer";
import javascript from "../img/1javascript.png";
import typescript from "../img/2typescript.png";
import reactf from "../img/3react.png";
import vue from "../img/4vue.png";
import node from "../img/5node.png";

function Slots() {
  const [food1, setFood1] = useState(javascript);
  const [food2, setFood2] = useState(javascript);
  const [food3, setFood3] = useState(javascript);
  const [rolling, setRolling] = useState(false);

  // 룰렛이 다돌아갔는지를 확인하는 상태
  const [isFinished, setisFinished] = useState(false);
  // 모달 on off를 위한 상태 추가
  const [openModal, setopenModal] = useState(true);
  console.log(openModal);

  // DOM요소에 접근하고, 조작하기 위해서 useRef훅 사용
  // 룰렛을 돌리기 위해서는 룰렛요소가 담긴 배열 컨테이너의 top 속성을 조작해줘야 하기 때문임
  const slotRefs = [useRef(null), useRef(null), useRef(null)];

  const foods = [
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
  ];

  useEffect(() => {
    // rolling이 끝난경우 useEffect 콜백함수 실행
    // 이 룰렛은 slot1,2,3가 독립적으로 돌아감.
    // 룰렛이 다 돌아간경우 slot1의 결과(top속성)을 slot2,3에도 동일하게 귀속시키기 위한 코드
    if (!rolling) {
      const slot1Top = slotRefs[0].current.style.top;
      const slot3Top = `calc(${slot1Top} - 1px)`;
      slotRefs[2].current.style.top = slot3Top;
      slotRefs.slice(1, 2).forEach((slotRef) => {
        slotRef.current.style.top = slot1Top;
        setisFinished(true);
      });
    }
  }, [rolling, isFinished]);

  // 실제 click을 눌럿을때, 룰렛이 돌아가게하는 함수
  const roll = () => {
    const totalRotations = 10;
    setisFinished(!isFinished);
    setRolling(true);
    // 0.5초 간격으로 setInterval 안에 있는 콜백함수를 반복적으로 실행
    const rotationInterval = setInterval(() => {
      slotRefs.forEach((slotRef, i) => {
        const selected = triggerSlotRotation(slotRef, i, foods);
        if (i === 0) {
          const foodIndex = foods[0].indexOf(selected);
          setFood1(selected);
          setFood2(foods[1][foodIndex]);
          setFood3(foods[2][foodIndex]);
        }
      });
    }, 500);

    setTimeout(() => {
      clearInterval(rotationInterval);
      setRolling(false);
      setisFinished(!isFinished);
      //  클릭버튼 누를시 다시 모달상태 업데이트 => setTimeout을 이용하여, 슬롯 결과가 나오고 모달창이 1초뒤에 뜨도록 구현
      setTimeout(() => {
        setopenModal(!openModal);
      }, 1000);
    }, totalRotations * 400);
  };

  //
  const triggerSlotRotation = (slotRef, slotIndex, foods) => {
    // dom요소의 top css속성을 변화시키기 위한 함수
    function setTop(top) {
      slotRef.current.style.top = `${top}px`;
    }
    // 여기서 options는 슬롯 목록을 담고있는 container를 말함 ex) [javascript, typescript, reactf, vue, node]
    const options = slotRef.current.children;
    const filteredFoods = foods[slotIndex];
    const randomOption = Math.floor(Math.random() * filteredFoods.length);
    const chosenOption = options[randomOption];
    setTop(-chosenOption.offsetTop + 1);
    return filteredFoods[randomOption];
  };

  const closeModal = () => {
    // 모달끄는 이벤트핸들러 함수
    return setopenModal(!openModal);
  };

  // 모달창 조건부 하드코딩 방지를 위한 변수 선언 및 할당
  const resultOptions = [
    {
      food: javascript,
      href: "https://www.youtube.com/watch?v=WHUvtiKy_pg",
    },
    {
      food: typescript,
      href: "https://www.youtube.com/watch?v=xkpcNolC270&t=456s&ab_channel=%EC%BD%94%EB%94%A9%EC%95%A0%ED%94%8C",
    },
    {
      food: reactf,
      href: "https://www.youtube.com/watch?v=00yJy7W0DQE&list=PLfLgtT94nNq0qTRunX9OEmUzQv4lI4pnP&ab_channel=%EC%BD%94%EB%94%A9%EC%95%A0%ED%94%8C",
    },
    {
      food: vue,
      href: "https://www.youtube.com/watch?v=-tVaahsXpwk&ab_channel=%EC%BD%94%EB%94%A9%EC%95%A0%ED%94%8C",
    },
    {
      food: node,
      href: "https://www.youtube.com/watch?v=-zOfTS1HQTc&list=PLfLgtT94nNq1qmsvIii_CAxFlD7tvB5NE&ab_channel=%EC%BD%94%EB%94%A9%EC%95%A0%ED%94%8C",
    },
  ];
  // 슬롯결과에 따른 모달창 조건부 렌더링 / 적절한 링크 연결을 위한 변수 선언 및 할당
  const modalContent = resultOptions.find((el) => el.food === food1);

  return (
    <div className="MainGame">
      {/* 조건부 랜더링 */}
      {isFinished && !openModal && modalContent && (
        <div className="GameModal" onClick={closeModal}>
          🎉🎉🎉🎉🎉
          <br></br>축 하 합 니 다 !<br></br>
          <a target="_blank" rel="noopener noreferrer" href={modalContent.href}>
            💸 선 물 받 기 💸
          </a>
          <br></br>
          🎉🎉🎉🎉🎉
        </div>
      )}
      <GameWrap slotRefs={slotRefs} foods={foods}></GameWrap>

      <div className="subWarp">
        <RollContainer rolling={rolling} roll={roll} />
      </div>
    </div>
  );
}

export default Slots;
