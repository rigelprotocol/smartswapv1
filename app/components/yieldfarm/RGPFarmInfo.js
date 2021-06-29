import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Box,
    Button,
    Link,
    ListItem, OrderedList,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'


const RGPFarmInfo = () => (
    <>
        <Box mb={4}>
            Get a chance to get whitelisted on our special staking pool for the Rigel Protocol selected investors.
            Selected addresses would enjoy Zero Impermanent Loss on the exclusive Staking Pool and Huge APY!
        </Box>
        <Box>
            To apply:
        </Box>
        <OrderedList spacing={4} >
            <ListItem>
                Swap or provide liquidity of 1000 RGP or more at our SmartSwap DApp. The higher the amount you swap or lock into the platform the more your chances to be whitelisted!
            </ListItem>
            <ListItem>
                Hold the tokens or keep your liquidity locked for at least 3 weeks on the Rigel Protocol DApp.
            </ListItem>
            <ListItem>
                Submit your details through this {" "}
                <Link color="#40BAD5" href="https://docs.google.com/forms/d/e/1FAIpQLSdu8uewqjgWdcdBPbM2vI65cVLwHYqFyrkWQHqEfeW_Zltr-w/viewform?usp=sf_link" isExternal>
                    form <ExternalLinkIcon mx="2px" />
                </Link>
            </ListItem>
        </OrderedList>
        <Box>All other staking pools are available: (RGP-BUSD, RGP-BNB, BNB-BUSD)</Box>
    </>
)

export default RGPFarmInfo;