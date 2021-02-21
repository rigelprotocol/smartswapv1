/**
 *
 * FarmingPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, Flex } from '@chakra-ui/layout';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Layout from 'components/layout';
import makeSelectFarmingPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export function FarmingPage() {
  useInjectReducer({ key: 'farmingPage', reducer });
  useInjectSaga({ key: 'farmingPage', saga });

  return (
    <div>
      <Layout title="Farming Page">
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
            w={['100%', '100%', '100%', '29.5%']}
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
    </div>
  );
}

FarmingPage.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  farmingPage: makeSelectFarmingPage(),
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
)(FarmingPage);
