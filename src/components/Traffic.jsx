import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import Light from "./Light";

const Traffic = ({ config }) => {
  const [currentColor, setCurrentColor] = useState("green");

  const changeColor = useCallback(() => {
    const { duration, next } = config[currentColor];
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);
    return () => clearInterval(timerId);
  }, [currentColor, config]);

  useEffect(() => {
    const cleanUp = changeColor();
    return cleanUp;
  }, [changeColor]);

  //   useEffect(() => {
  //     const { duration, next } = config[currentColor];
  //     const timerId = setTimeout(() => {
  //       setCurrentColor(next);
  //     }, duration);
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   }, [currentColor]);

  return (
    <div className="traffic-light-container">
      {Object.keys(config).map((color) => {
        return (
          <Light
            key={color}
            backgroundColor={
              color === currentColor ? config[color].backgroundColor : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default Traffic;
