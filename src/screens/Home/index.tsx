import React from 'react';

import NavBar from '../../components/NavBar';
import BookList from '../../components/BookList/index';

import styles from './styles.module.scss';

function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
      <BookList />
    </div>
  );
}

export default Home;
