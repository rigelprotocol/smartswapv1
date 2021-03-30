import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Box } from '@chakra-ui/react';
import splashImg from 'images/start-up.png';

const Splash = props => {
  const { history } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/smart-swapping');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Box>
      <Image src={splashImg} htmlWidth="100%" htmlHeight="100%" />
    </Box>
  );
};
const mapStateToProps = state => ({ state });

export default connect(
  mapStateToProps,
  null,
)(Splash);
