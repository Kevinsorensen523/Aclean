import {
	Box,
	Heading,
	Flex,
	Spacer,
	Container,
	Link as ChakraLink,
	Text,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

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
								<Heading
									as="h1"
									size="3xl"
									noOfLines={1}
									fontStyle={'italic'}>
									AClean
								</Heading>

								<Spacer />

								<Flex
									flexDirection={'column'}
									alignItems={'end'}
									gap={1}
									fontSize={'sm'}>
									<ChakraLink
										as={ReactRouterLink}
										to="/detail-transaction">
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
