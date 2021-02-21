import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import ChartGraph from './ChartGraph';
import styles from '../../styles/chart.css';
import Title from './Title';

const ShowDetails = () => {
  const [show, setShow] = useState(false);
  return (
    <Box
      className={styles.container}
      rounded="2xl"
      boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
    >
      {show ? <ChartGraph setShow={setShow} /> : <Title setShow={setShow} />}
    </Box>
  );
};

export default ShowDetails;
