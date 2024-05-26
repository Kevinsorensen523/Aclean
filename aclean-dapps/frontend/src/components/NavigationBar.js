import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import {
	Box,
	Heading,
	Flex,
	Spacer,
	Center,
	Container,
	Button,
	Link as ChakraLink,
	useToast,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
	Link as ReactRouterLink,
	NavLink as RouterLink,
} from 'react-router-dom';

export const NavigationBar = () => {
	const [account, setAccount] = useState(null);
	const toast = useToast();

	useEffect(() => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			// window.alert("Non-Ethereum browser detected. Consider trying MetaMask!");
			toast({
				title: 'Error!',
				description: `Non-Ethereum browser detected. Consider trying MetaMask!`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	}, []);

	const connectMetaMask = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});
				setAccount(accounts[0]);
				// console.log('MetaMask account connected:', accounts[0]);
			} catch (error) {
				// console.error('User denied account access', error);
				toast({
					title: 'Error!',
					description: `User denied account access`,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} else {
			// window.alert('Please install MetaMask!');
			toast({
				title: 'Error!',
				description: `Please install MetaMask!`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			bg="aclean.700"
			maxWidth={'100dvw'}
			pb={2}
			color="white"
			roundedBottom={'lg'}>
			<Box
				bg="aclean.600"
				w="100%"
				pb={2}
				color="white"
				roundedBottom={'lg'}>
				<Box
					bg="aclean.500"
					w="100%"
					paddingY={4}
					color="white"
					roundedBottom={'lg'}>
					<Container maxW={'container.xl'}>
						<Flex>
							<Center>
								<ChakraLink
									as={RouterLink}
									to="/"
									_activeLink={{ fontWeight: 900 }}
									_hover={{ textDecoration: 'none' }}>
									<Heading
										as="h1"
										size="3xl"
										noOfLines={1}
										fontStyle={'italic'}>
										AClean
									</Heading>
								</ChakraLink>
							</Center>
							<Spacer />
							<Center
								gap={3}
								fontSize={'sm'}>
								<ChakraLink
									as={RouterLink}
									to="/transaction-history"
									_activeLink={{ fontWeight: 900 }}
									_hover={{ textDecoration: 'none' }}>
									Transaction History
								</ChakraLink>
								<ChakraLink
									as={RouterLink}
									to="/my-service"
									_activeLink={{ fontWeight: 900 }}
									_hover={{ textDecoration: 'none' }}>
									My Service
								</ChakraLink>
								<ChakraLink
									as={RouterLink}
									to="/about-us"
									_activeLink={{ fontWeight: 900 }}
									_hover={{ textDecoration: 'none' }}>
									About Us
								</ChakraLink>
							</Center>
							<Spacer />
							<Center>
								<Button
									onClick={connectMetaMask}
									rightIcon={<ExternalLinkIcon />}
									size={'sm'}
									fontWeight={'500'}
									bgColor={'white'}
									textColor={'aclean.500'}>
									{account
										? `Connected: ${account.substring(
												0,
												6
										  )}...${account.substring(account.length - 4)}`
										: 'Connect to Wallet'}
								</Button>
							</Center>
						</Flex>
					</Container>
				</Box>
			</Box>
		</Box>
	);
};
