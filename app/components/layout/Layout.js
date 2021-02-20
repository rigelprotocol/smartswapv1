import React from 'react'
import { Box } from '@chakra-ui/layout';
import styles from '../../styles/layout.module.css';
import Nav from '../navbar';
import Footer from '../navbar/Footer';

export default function Layout(props) {
  return (
    <div className={styles.height}>
      <Nav />
      <Box className={styles.children}>{props.children}</Box>
      <Footer />
    </div>
  );
}
