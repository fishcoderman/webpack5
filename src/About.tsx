import React, { useState } from "react";
import "./css/about.less";

const About = () => {
  const [count, setCount] = useState(1);

  const run = () => {
    let sum = 0; // 耗时操作
    [1, 2, 3].forEach((item) => {
      sum += item;
    });
    console.log(sum);
  };

  const arr = new Array(10).fill(0);

  return (
    <div className="about">
      <h4>This is About!</h4>
      <p className="red font">About: {count},</p>
      <button onClick={() => setCount(count + 1)}>About Counter</button>
      {arr.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default About;
