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
import { Link as ReactRouterLink } from 'react-router-dom';

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
									as={ReactRouterLink}
									href="#">
									Transaction History
								</ChakraLink>
								<ChakraLink
									as={ReactRouterLink}
									href="#">
									My Workspace
								</ChakraLink>
								<ChakraLink
									as={ReactRouterLink}
									href="#">
									About Us
								</ChakraLink>
							</Center>
							<Spacer />
							<Center>
								<ChakraLink
									href="https://google.com"
									isExternal>
									<Button
										size={'sm'}
										fontWeight={'500'}
										bgColor={'white'}
										textColor={'aclean.500'}>
										Connect to Wallet <ExternalLinkIcon ml={2} />
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
