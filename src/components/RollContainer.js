import React from "react";
import loading from "../img/loading.gif";

const RollContainer = ({ rolling, roll }) => {
  return (
    <div className="rollContainer">
      <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling ? roll : undefined}
        disabled={rolling}
      >
        {rolling ? (
          <img className="loading" src={loading} alt="loading gif" />
        ) : (
          "C L I C K !"
        )}
      </div>
    </div>
  );
};

export default RollContainer;
