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
  const [isFinished, setisFinished] = useState(false);

  const slotRefs = [useRef(null), useRef(null), useRef(null)];

  const foods = [
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
  ];

  useEffect(() => {
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

  const roll = () => {
    const totalRotations = 10;
    setisFinished(!isFinished);
    setRolling(true);
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
    }, totalRotations * 400);
  };

  const triggerSlotRotation = (slotRef, slotIndex, foods) => {
    function setTop(top) {
      slotRef.current.style.top = `${top}px`;
    }

    const options = slotRef.current.children;
    const filteredFoods = foods[slotIndex];
    const randomOption = Math.floor(Math.random() * filteredFoods.length);
    const chosenOption = options[randomOption];
    setTop(-chosenOption.offsetTop + 1);
    return filteredFoods[randomOption];
  };

  return (
    <div className="MainGame">
      {isFinished && food1 === javascript ? <div>자바스크립트</div> : null}
      <GameWrap slotRefs={slotRefs} foods={foods}></GameWrap>

      <div className="subWarp">
        <RollContainer rolling={rolling} roll={roll} />
      </div>
    </div>
  );
}

export default Slots;
