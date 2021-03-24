import { Box, Flex, Text } from "@chakra-ui/layout";
import RGPImage from "../../assets/rgp.svg";
import React from 'react'
import { Menu } from "@chakra-ui/menu";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";


const Manual = () => {

  return (
    <>
      <Box
        color="#fff"
        bg="#29235E"
        h="100px"
        mb="10px"
        justifyContent="space-between"
        px={4}
        mx={4}
        mt={4}
        rounded="2xl"
      >
        <Flex justifyContent="space-between" mb={1}>
          <Text fontSize="sm" color="#40BAD5">
            From
                    </Text>
          <Text fontSize="sm" color=" rgba(255, 255, 255,0.50)">
            Balance: 2,632.34
                    </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text fontSize="lg" color=" rgba(255, 255, 255,0.25)">
            0.0
                    </Text>
          <Flex
            cursor="pointer"
            justifyContent="space-between"
            alignItems="center"
          >

            <Flex alignItems="center">
              <RGPImage />
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
                  RGP

                                </Button>
              </Menu>
            </Flex>
          </Flex>
        </Flex>

      </Box>
    </>
  );

};

export default Manual;
