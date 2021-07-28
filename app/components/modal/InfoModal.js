import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    Box,
    Button,
    Link,
    ListItem, OrderedList,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'

const InfoModal = ({ 
     onCloseModal,
     isOpenModal,
     title,
     children,
     showModalWithInput,
     setShowModalWithInput,
     submitData,
     InputData,
     setInputData 
    }) => {
    return (
        <>
            <Modal onClose={()=>{
                setShowModalWithInput(false)
                onCloseModal()
            }}
                 isOpen={isOpenModal} isCentered>
                <ModalOverlay />
                <ModalContent bg="#120136" color="#fff" borderRadius="20px">
                <ModalCloseButton
                onClick={()=>{
                    setShowModalWithInput(false)
                    onCloseModal()
                }} 
          bg="none"
          border="0px"
          color="#fff"
          cursor="pointer"
          _focus={{ outline: 'none' }}
        />
                    <ModalHeader>{title}</ModalHeader>

                    <ModalBody>
                        {children}
                        {showModalWithInput &&  <Box mt={4}>
                            <Input
                            my={2}
                type="text"
                color="#fff"
                placeholder="0"
                bg="#29235E"
                opacity="0.5"
                h="50px"
                borderRadius="20px"
                name="InputData"
                 value={InputData}
                 onChange={e => setInputData(e.target.value)}
                border="0"
              />
              <Button
                            mt="2"
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
                            _hover={{ background: 'rgba(64, 186, 213, 0.35)' }}
                            onClick={submitData}>Get whitelisted!!!</Button>
             
                        </Box>
              
           }
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mt={showModalWithInput? "-4" : "2"}
                            mb="2"
                            mx="auto"
                            color={showModalWithInput? "white" : "#40BAD5"}
                            width="100%"
                            background={showModalWithInput ? "#444159" : "rgba(64, 186, 213, 0.15)"}
                            cursor="pointer"
                            border="none"
                            borderRadius="13px"
                            padding="10px"
                            height="50px"
                            fontSize="16px"
                            _hover={showModalWithInput  ?  { background: '#444159' }
                            : { background: 'rgba(64, 186, 213, 0.15)' }}
                            onClick={()=>{
                                setShowModalWithInput(false)
                                onCloseModal()
                            }}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InfoModal