/**
 *
 * MarginTradingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, Flex } from '@chakra-ui/layout';

import Layout from 'components/layout/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMarginTradingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function MarginTradingPage() {
  useInjectReducer({ key: 'marginTradingPage', reducer });
  useInjectSaga({ key: 'marginTradingPage', saga });

  return (
    <Layout title="Margin Trading">
      <Flex
        mx={5}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        rounded="lg"
        mb={4}
      >
        <Box
          bg="#120136"
          minHeight="50vh"
          w={['100%', '100%', '29.5%', '29.5%']}
          rounded="lg"
        >
          <Flex
            color="gray.400"
            alignItems="center"
            justifyContent="space-between"
            px={4}
          >
            <Flex alignItems="center" rounded={100} bg="#" cursor="pointer" />
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}

MarginTradingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  marginTradingPage: makeSelectMarginTradingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MarginTradingPage);
