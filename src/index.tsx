import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { useState, useEffect, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Button, Space, Slider } from 'antd';
import ErrorBoundary from './ErrorBoundary';
// @ts-ignore
import MyImg from './assets/101.jpeg';
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
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className='red font'>Counter: {count}</h1>
        <Button type='primary' onClick={() => setCount(count + 1)}>
          Ad Counter
        </Button>
        <Slider></Slider>
        <div className='box'>
          <h4>this is img</h4>
        </div>

        <div>
          <img src={MyImg} alt='#' />
        </div>
        <Space>
          <Button onClick={() => asyncLoadHome()}>asyncLoadHome</Button>
          <Button onClick={() => asyncLoadAbout()}>asyncLoadAbout</Button>
        </Space>

        <div id='container'> </div>
      </Suspense>
    </ErrorBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
