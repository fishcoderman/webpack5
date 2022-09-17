import React, { useState } from 'react';

const About = () => {
  const [count, setCount] = useState(1);
  return (
    <div>
      <h4>This is About!</h4>
      <p className='red font'>About: {count},</p>
      <button onClick={() => setCount(count + 1)}>About Counter</button>
    </div>
  );
};

export default About;
