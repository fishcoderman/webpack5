import React, { useState } from 'react';
import './css/about.less';

const About = () => {
  const [count, setCount] = useState(1);
  return (
    <div className='about'>
      <h4>This is About!</h4>
      <p className='red font'>About: {count},</p>
      <button onClick={() => setCount(count + 1)}>About Counter</button>
    </div>
  );
};

export default About;
