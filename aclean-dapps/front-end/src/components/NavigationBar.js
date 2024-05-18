import {
	Box,
	Heading,
	Flex,
	Spacer,
	Center,
	Container,
	Button,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
	Link as ReactRouterLink,
	NavLink as RouterLink,
} from 'react-router-dom';

export const NavigationBar = () => {
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
								<Heading
									as="h1"
									size="3xl"
									noOfLines={1}
									fontStyle={'italic'}>
									AClean
								</Heading>
							</Center>
							<Spacer />
							<Center
								gap={3}
								fontSize={'sm'}>
								<ChakraLink
									as={RouterLink}
									to="/transaction-history"
									_activeLink={{ fontWeight: 900 }}>
									Transaction History
								</ChakraLink>
								<ChakraLink
									as={RouterLink}
									to="/my-service"
									_activeLink={{ fontWeight: 900 }}>
									My Service
								</ChakraLink>
								<ChakraLink
									as={RouterLink}
									to="/about-us"
									_activeLink={{ fontWeight: 900 }}>
									About Us
								</ChakraLink>
							</Center>
							<Spacer />
							<Center>
								<ChakraLink
									href="https://google.com"
									isExternal>
									<Button
										rightIcon={<ExternalLinkIcon />}
										size={'sm'}
										fontWeight={'500'}
										bgColor={'white'}
										textColor={'aclean.500'}>
										Connect to Wallet
									</Button>
								</ChakraLink>
							</Center>
						</Flex>
					</Container>
				</Box>
			</Box>
		</Box>
	);
};
