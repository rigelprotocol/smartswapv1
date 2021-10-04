import React from 'react'
import {
    Alert,
    AlertIcon,
    AlertDescription,
    CloseButton,
    Box,
    Link
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

function AlertSvg(props) {
    return (
        <svg
            overflow="visible"
            width={48}
            height={48}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width={48} height={48} rx={8} fill="#2D276A" />
            <path
                d="M33.935 27.658L30.638 15.38c-.358-1.335-1.999-1.827-3.035-.91l-2.078 1.84a19.916 19.916 0 01-8.054 4.325 4.68 4.68 0 00-3.31 5.732 4.691 4.691 0 005.738 3.313 19.94 19.94 0 019.142-.274l2.721.556c1.357.277 2.531-.968 2.173-2.303zM19.718 20L23.5 34"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FarmingV2Alert({ message }) {
    return (
        <Box mx={[5, 10, 15, 16]} my={4}>
            <Alert color="#FFFFFF" background="#726AC8" borderRadius="8px">
                <AlertSvg />
                <AlertDescription
                    fontFamily="Inter"
                    fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                    fontWeight="500"
                    lineHeight="24px"
                    letterSpacing="0em"
                    textAlign="left"
                    padding="10px"
                >
                    {message}
                    {' '}
                    <Link href="http://link.medium.com/4xqFCYZb3jb" isExternal>
                        More Details <ExternalLinkIcon />
                    </Link>
                </AlertDescription>
                <CloseButton
                    position="absolute"
                    height="14px"
                    width="14px"
                    background="#726AC8"
                    color="#fff"
                    right="20px"
                    border="2px solid #726AC8"
                    textAign="center"
                />
            </Alert>
        </Box >
    )
}

export default FarmingV2Alert
