import { useState } from "react";
import React from 'react'
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Menu } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TOKENS } from "../../utils/constants";
import BNBImage from "../../assets/bnb.svg";
import ETHImage from "../../assets/eth.svg";
import RGPImage from "../../assets/rgp.svg";

const balanceOf = () => {

  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        mt="10px"
        h="100px"
        justifyContent="space-between"
        px={4}
        mx={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            To
                    </Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" color=" rgba(255, 255, 255,0.25)">
            0.0
                    </Text>
          {/*<Menu>*/}
          {/*    <Button*/}

          {/*        border="0px"*/}
          {/*        h="30px"*/}
          {/*        fontWeight="regular"*/}
          {/*        fontSize="16px"*/}
          {/*        cursor="pointer"*/}
          {/*        bg= '#40BAD5'*/}
          {/*        marginBottom="5px"*/}
          {/*        color="white"*/}
          {/*        _hover={{ background: '#72cfe4', color: '#29235E' }}*/}
          {/*        rightIcon={<ChevronDownIcon />}*/}
          {/*    >*/}
          {/*    Select a token*/}
          {/*    </Button>*/}
          {/*</Menu>*/}
          <Flex alignItems="center">
            <BNBImage />
            <Menu>
              <Button

                border="0px"
                h="30px"
                fontWeight="regular"
                fontSize="16px"
                cursor="pointer"
                bg='#29235E'
                marginBottom="5px"
                color="white"
                _hover={{ background: '#72cfe4', color: '#29235E' }}
                rightIcon={<ChevronDownIcon />}
              >
                BNB

                            </Button>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default balanceOf;
