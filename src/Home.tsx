import React, { useState } from 'react';
import { Tag } from 'antd';
import { join } from 'lodash-es';
import './css/index.css';
import styles from './css/home.module.less';

const Home = () => {
  const [count, setCount] = useState(1);

  return (
    <div className={styles['home']}>
      <h4 style={{ color: '@color' }}>This is Home !</h4>
      <div className={styles['link']}>link</div>
      <Tag color={'purple'}>tags</Tag>
      <p className='red font'>Home: {count}</p>
      <button onClick={() => setCount(count + 1)}>Home Counter: {join(['tom', 'jack'], '~')}</button>
    </div>
  );
};

export default Home;
