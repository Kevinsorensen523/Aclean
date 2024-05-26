import {
	Box,
	Heading,
	Flex,
	Spacer,
	Container,
	Link as ChakraLink,
	Text,
} from '@chakra-ui/react';
import {
	Link as ReactRouterLink,
	NavLink as RouterLink,
} from 'react-router-dom';

export const FooterBar = () => {
	return (
		<Box
			bg="aclean.700"
			maxWidth={'100dvw'}
			pt={2}
			color="white"
			roundedTop={'lg'}>
			<Box
				bg="aclean.600"
				w="100%"
				pt={2}
				color="white"
				roundedTop={'lg'}>
				<Box
					bg="aclean.500"
					w="100%"
					paddingY={4}
					color="white"
					roundedTop={'lg'}>
					<Container maxW={'container.xl'}>
						<Flex
							flexDirection={'column'}
							gap={4}>
							<Flex flexDirection={'row'}>
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

								<Spacer />

								<Flex
									flexDirection={'column'}
									alignItems={'end'}
									gap={1}
									fontSize={'sm'}>
									<ChakraLink
										as={RouterLink}
										to={'/transaction-history'}
										_activeLink={{ fontWeight: 900 }}
										_hover={{ textDecoration: 'none' }}>
										Transaction History
									</ChakraLink>
									<ChakraLink
										as={RouterLink}
										to={'/my-service'}
										_activeLink={{ fontWeight: 900 }}
										_hover={{ textDecoration: 'none' }}>
										My Service
									</ChakraLink>
									<ChakraLink
										as={RouterLink}
										to={'/about-us'}
										_activeLink={{ fontWeight: 900 }}
										_hover={{ textDecoration: 'none' }}>
										About Us
									</ChakraLink>
								</Flex>
							</Flex>

							<Text
								fontSize={'xs'}
								textAlign={'center'}>
								Copyright © {new Date().getFullYear()}
								<br />
								Made with ❤️ by AClean Developer
							</Text>
						</Flex>
					</Container>
				</Box>
			</Box>
		</Box>
	);
};
