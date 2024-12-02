import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Space, Slider } from 'antd';
import Img from './assets/101.jpeg';
import './css/index.less';

const App = () => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log('dom');
  }, []);

  const asyncLoadHome = async () => {
    const { default: Home } = await import(/* webpackChunkName: "Home" */ './Home');
    ReactDOM.render(<Home />, document.getElementById('container'));
  };


  const asyncLoadAbout = async () => {
    const { default: About } = await import(/* webpackChunkName: "About" */ './About');
    ReactDOM.render(<About />, document.getElementById('container'));
  };

  return (
    <div>
      <h1 className='red font'>Counter: {count}</h1>
      <Button type='primary' onClick={() => setCount(count + 1)}>Add Counter</Button>
      <Slider></Slider>
      <div>
        <h4>img</h4>
        <img src={Img} alt="" />
      </div>
      <Space>
        <Button onClick={() => asyncLoadHome()}>asyncLoadHome</Button>
        <Button onClick={() => asyncLoadAbout()}>asyncLoadAbout</Button>
      </Space>

      <div id='container'> </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
