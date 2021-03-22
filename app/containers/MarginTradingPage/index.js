/**
 *
 * Margin Trading Page
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Box, Flex } from '@chakra-ui/layout';

import Layout from 'components/layout/index';

import makeSelectMarginTradingPage from './selectors';

export function MarginTradingPage() {

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

const mapStateToProps = () => ({
  marginTradingPage: makeSelectMarginTradingPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarginTradingPage);
