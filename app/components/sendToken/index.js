// @ts-nocheck
import React, { useState } from 'react';
import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import ArrowDownImage from '../../assets/arrow-down.svg';
// eslint-disable-next-line import/no-cycle
import From from './from';
import To from './to';
import SwapSettings from './SwapSettings';


const Manual = props => {
  const [fromAmount, setFromAmount] = useState('');
  const [path, setPath] = useState([]);
  const handleChangeFromAmount = event => {
    setFromAmount(event.target.value);
  };
  const setPathArray = target => {
    setPath({ fromPath: target });
  };

  console.log(path);

  return (
    <div>
      <Box
        boxShadow=" 0px 10px 20px  rgba(18, 1, 54,0.25)"
        bg="#120136"
        mt={3}
        p={5}
        rounded="2xl"
      >
        <SwapSettings />
        <From
          fromAmount={fromAmount}
          handleChangeFromAmount={handleChangeFromAmount}
          setPathArray={setPathArray}
        />
        <Box textAlign="center">
          <ArrowDownImage />
        </Box>
        <To />
        <Box mt={14}>
          <Button
            d="block"
            w="100%"
            h="50px"
            color="#40BAD5"
            border="none"
            fontWeight="regular"
            fontSize="lg"
            cursor="pointer"
            rounded="2xl"
            bg="rgba(64, 186, 213,0.25)"
            borderColor="#40BAD5"
            _hover={{ background: 'rgba(64, 186, 213,0.35)' }}
            _active={{ outline: '#29235E', background: '#29235E' }}
            onClick={() => {
              console.log(props);
            }}
          >
            Enter an Amount
          </Button>
        </Box>
      </Box>
    </div>
  );
};
export default Manual;
