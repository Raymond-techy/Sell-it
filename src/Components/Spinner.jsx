import React from "react";
// import "./spinner.css";

function Spinner({ description }) {
  return (
    <div className="spinn">
      <div className="loader">
        <span>{description}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}

export default Spinner;
