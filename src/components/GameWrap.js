import React from "react";
import coin from "../img/coin.png";

const GameWarp = ({ slotRefs, foods }) => {
  return (
    <div className="GameWarp">
      <div className="SlotMachine">
        <div className="slotContainer">
          <img className="coin1" src={coin} alt="coin"></img>
          <img className="coin2" src={coin} alt="coin"></img>
          <div className="line"></div>
          <div className="slot">
            <section>
              <div className="container" ref={slotRefs[0]}>
                {foods[0].map((food, i) => (
                  <div key={i}>
                    <img src={food} alt={`food ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="slot">
            <section>
              <div className="container" ref={slotRefs[1]}>
                {foods[1].map((food, i) => (
                  <div key={i}>
                    <img src={food} alt={`food ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="slot">
            <section>
              <div className="container" ref={slotRefs[2]}>
                {foods[2].map((food, i) => (
                  <div key={i}>
                    <img src={food} alt={`food ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameWarp;
