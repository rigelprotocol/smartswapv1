import React from 'react'
import { Helmet } from 'react-helmet';
import { Box } from '@chakra-ui/layout';
import styles from '../../styles/layout.css';
import Nav from '../navbar';
import Footer from '../navbar/Footer';

export default function Layout(props) {
  const { title, description } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`${description}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Helmet>
      <div className={styles.height}>
        <Nav {...props} />
        <Box className={styles.children}>{props.children}</Box>
        <Footer />
      </div>
    </>
  );
}
