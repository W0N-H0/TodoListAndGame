import React, { useRef, useState, useEffect } from "react";
import GameWrap from "./GameWrap";
import RollContainer from "./RollContainer";
import koreanFood1 from "../img/koreanFood1.png";
import koreanFood2 from "../img/koreanFood2.png";
import koreanFood3 from "../img/koreanFood3.png";
import chineseFood1 from "../img/chineseFood1.png";
import chineseFood2 from "../img/chineseFood2.png";
import chineseFood3 from "../img/chineseFood3.png";
import westernFood1 from "../img/westernFood1.png";
import westernFood2 from "../img/westernFood2.png";
import westernFood3 from "../img/westernFood3.png";
import japaneseFood1 from "../img/japaneseFood1.png";
import japaneseFood2 from "../img/japaneseFood2.png";
import japaneseFood3 from "../img/japaneseFood3.png";
import schoolFood1 from "../img/schoolFood1.png";
import schoolFood2 from "../img/schoolFood2.png";
import schoolFood3 from "../img/schoolFood3.png";
import javascript from "../img/1javascript.png";
import typescript from "../img/2typescript.png";
import reactf from "../img/3react.png";
import vue from "../img/4vue.png";
import node from "../img/5node.png";

function Slots() {
  const [food1, setFood1] = useState(javascript);
  const [food2, setFood2] = useState(typescript);
  const [food3, setFood3] = useState(reactf);

  const [rolling, setRolling] = useState(false);

  const slotRefs = [useRef(null), useRef(null), useRef(null)];

  const foods = [
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
    [javascript, typescript, reactf, vue, node],
  ];

  useEffect(() => {
    if (!rolling) {
      const slot1Top = slotRefs[0].current.style.top;
      const slot3Top = `calc(${slot1Top} -0px)`;
      slotRefs[2].current.style.top = slot3Top;
      slotRefs.slice(1, 2).forEach((slotRef) => {
        slotRef.current.style.top = slot1Top;
      });
    }
  }, [rolling]);

  const roll = () => {
    const totalRotations = 10;

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
      <GameWrap slotRefs={slotRefs} foods={foods}></GameWrap>

      <div className="subWarp">
        <RollContainer rolling={rolling} roll={roll} />
      </div>
    </div>
  );
}

export default Slots;
