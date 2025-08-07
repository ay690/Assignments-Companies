import React from "react";

const Debounce = () => {
  const myDebounce = (cb, d) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, d);
    };
  };

  const handleChange = myDebounce((e) => {
    console.log(e.target.value);
  }, 3000);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <input onChange={handleChange} style={{ padding: "20px" }} />
    </div>
  );
};

export default Debounce;
