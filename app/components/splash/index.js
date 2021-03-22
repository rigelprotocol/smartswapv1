import React from 'react';
import { Image, Box } from '@chakra-ui/react';
import splashImg from 'images/start-up.png';

const Splash = () => {
  return (
    <Box>
      <Image src={splashImg} htmlWidth="100%" htmlHeight="100%" />
    </Box>
  );
};

export default Splash;
