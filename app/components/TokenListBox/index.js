/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// @ts-nocheck
/**
 *
 * TokenListBox
 *
 */

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Input } from '@chakra-ui/react';
import { Flex, Text, Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { tokenList } from 'utils/constants';
import { getTokenListBalance } from 'utils/wallet-wiget/TokensUtils';
import { isFunc } from 'utils/UtilFunc';
import ArrowDownImage from '../../assets/arrow-down.svg';
import {getTokenList } from "utils/tokens"

function TokenListBox({
  setSelectedToken,
  setPathArray,
  getToAmount,
  setSelectedToToken,
  setPathToArray,
  isOpen,
  onClose,
  isOpenModal,
  onOpenModal,
  onCloseModal,
  wallet,
}) {
  const [list, setList] = useState(tokenList);
  const [balanceIsSet, setBalanceIsSet] = useState(false);
  const [searchToken, setSearchToken] = useState('');
  const [openCautionModal, setOpenCautionModal] = useState(false);
  const account = wallet.wallet;
  useEffect(() => {
    getTokenListBalance(list, account, setBalanceIsSet);
  }, [isOpen, account]);
  useEffect(() => {
    searchTokens()
    return setList(tokenList);
  }, [searchToken]);
  const searchTokens =async ()=>{
    if (searchToken !== '') {
      let tokenArrayList =await getTokenList(searchToken)
      console.log({tokenArrayList})
      // const filteredTokenList = tokenList.filter(
      //   token =>
      //     token.symbol.toLowerCase().includes(searchToken.toLowerCase()) ||
      //     token.name.toLowerCase().includes(searchToken.toLowerCase()),
      // );
      // if(filteredTokenList.length>0){
      //  return setList(filteredTokenList); 
      // }else{
      //   setOpenCautionModal(true)
      //   onOpenModal()
      //   return setList(filteredTokenList); 
      // }
      return setList(tokenArrayList);
    }
  }
  const importTokens = () =>{
    alert("import")
  }
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#120136"
        color="#fff"
        borderRadius="20px"
        width="90vw"
        minHeight="60vh"
      >
        <ModalCloseButton
          bg="none"
          border="0px"
          color="#fff"
          cursor="pointer"
          _focus={{ outline: 'none' }}
        />
        <ModalHeader fontWeight="light">Select a token</ModalHeader>
        <ModalBody mt={4}>
          <Input
            placeholder="Search by name or paste address"
            borderColor="#40BAD5"
            color="gray.500"
            rounded="2xl"
            h="50px"
            fontSize="sm"
            variant="outline"
            value={searchToken}
            onChange={e => {
              setSearchToken(e.target.value);
            }}
          />
          <Flex justifyContent="space-between" mt={5}>
            <Text fontSize="sm" fontWeight="light" color="#fff">
              Token
            </Text>
            <ArrowDownImage />
          </Flex>
          {list.map((token,index) => (
            <Flex
              justifyContent="space-between"
              mt={1}
              cursor="pointer"
              onClick={() => {
                isFunc(setSelectedToken) && setSelectedToken(token);
                isFunc(setSelectedToToken) && setSelectedToToken(token);
                isFunc(setPathToArray) &&
                  setPathToArray(token.address, token.symbol);
                isFunc(setPathArray) &&
                  setPathArray(token.address, token.symbol);
                isFunc(getToAmount) && getToAmount();
                isFunc(onClose) && onClose();
              }}
              key={index}
            >
              <Flex alignItems="center">
                <span className={`icon icon-${token.symbol.toLowerCase()}`} />
                <Text fontSize="md" fontWeight="regular" color="#ffinf" ml={2}>
                  {token.symbol}
                </Text>
                <Text mx={3}>
                  <small style={{ display: 'block', color: '#b3b3b3' }}>
                    {token.name}
                  </small>
                </Text>
              </Flex>
              <Text fontSize="md" fontWeight="regular" color="#fff">
                {!balanceIsSet ? '0.0' : token.balance}
              </Text>
            </Flex>
          ))}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
    
  {openCautionModal &&
   <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered>
   <ModalOverlay />
   <ModalContent bg="#120136" color="#fff" borderRadius="20px">
   <ModalCloseButton
   onClick={onCloseModal} 
bg="none"
border="0px"
color="#fff"
cursor="pointer"
_focus={{ outline: 'none' }}
/>
       <ModalHeader>Import tokens</ModalHeader>

       <ModalBody>
       <Flex justifyContent="center">
      <Flex textAlign="center" w="60px" h="60px" borderRadius="50%" border="2px solid white" justifyContent="center" alignItems="center" flexDirection="row">
       <Text fontSize="35px"> ! </Text>
     </Flex>
    </Flex>
     <Box textAlign="center">
<Text>
  This token doesn't appear on the active token list(s). Make sure this is the token that you want to trade.
</Text>
<Box bg="#29235e21" w="90%" m="0 auto" color="rgba(255, 255, 255, 0.555)" borderRadius="15px" padding="15px">
<h2>Image</h2>
<h3>MUM</h3>
<h4>Mother</h4>
<h6>address</h6>
<Button padding ="1 2" border={0} background="rgba(230, 214, 214, 0.664)" color="red">
  null unknown source
</Button>
</Box>
     </Box>
       </ModalBody>
       <ModalFooter>
           <Button
               my="2"
               mx="auto"
               color="#40BAD5"
               width="100%"
               background="rgba(64, 186, 213, 0.15)"
               cursor="pointer"
               border="none"
               borderRadius="13px"
               padding="10px"
               height="50px"
               fontSize="16px"
               _hover={{ background: 'rgba(64, 186, 213, 0.15)' }}
               onClick={importTokens}>Import tokens</Button>
       </ModalFooter>
   </ModalContent>
</Modal> 
    }
    </>
  );
}
TokenListBox.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setSelectedToken: PropTypes.func,
  setPathArray: PropTypes.func,
  getToAmount: PropTypes.func,
  setSelectedToToken: PropTypes.func,
  setPathToArray: PropTypes.func,
  wallet: PropTypes.object,
};
const mapStateToProps = ({ wallet }) => ({ wallet });

export default connect(
  mapStateToProps,
  {},
)(TokenListBox);
