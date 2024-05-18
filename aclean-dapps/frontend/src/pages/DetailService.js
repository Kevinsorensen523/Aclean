import {
	Box,
	Container,
	Heading,
	Divider,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Stack,
	Text,
	ButtonGroup,
	Button,
	Image,
	Flex,
	Center,
	Icon,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { FooterBar } from '../components/FooterBar';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useEffect } from 'react';

export const DetailService = () => {
	const params = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Box
			maxWidth={'full'}
			bgColor={'black'}
			textColor={'white'}
			minHeight={'100dvh'}>
			<NavigationBar />

			<Container
				maxWidth={'container.xl'}
				paddingY={8}>
				<Heading
					as={'h1'}
					marginBottom={4}>
					Detail Service
				</Heading>

				<Card
					bgGradient="linear(to-br, black, aclean.500)"
					variant="outline"
					textColor={'white'}>
					<CardBody>
						<Stack spacing="3">
							<Heading
								as={'h2'}
								textAlign={'center'}
								fontStyle={'italic'}>
								AC Service {params.id}
							</Heading>

							<Center>
								<Image
									objectFit="cover"
									src="https://media.pricebook.co.id/article/5e5e294ab92c2e49128b456b/5e5e294ab92c2e49128b456b_1638247494.jpg"
									alt="Caffe Latte"
									// maxWidth={'lg'}
									borderRadius={'lg'}
									boxSize={'sm'}
								/>
							</Center>

							<Stack
								direction={'column'}
								spacing={3}>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Owner Service
									</Text>
									<Text>Owner</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Category
									</Text>
									<Text>Category 01, Category 02, Category 03</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Description Service
									</Text>
									<Text>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Donec tempus, nibh sit amet dignissim ornare, lacus nisi
										mattis urna, et malesuada dolor quam quis magna. In
										convallis, velit vitae interdum elementum, libero tellus
										rutrum lacus, vitae ornare justo dui at urna. Aliquam a
										maximus ante. Donec mattis eros risus. Praesent pharetra,
										leo id tempor aliquam, lectus magna convallis ante, ut
										interdum risus eros vitae felis. Nulla in augue sit amet
										odio lobortis tincidunt. Curabitur ut lorem a magna vehicula
										pretium. Etiam placerat eget lorem nec pharetra. Mauris sit
										amet metus feugiat, euismod ex ut, faucibus felis.
										Pellentesque imperdiet egestas leo nec varius. Fusce
										tincidunt vitae ex a consectetur. Aenean ut tempus ex.
										Suspendisse potenti.
									</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Address Owner
									</Text>
									<Text>Suite 827 399 Regan Ville, South Troy, TN 25899</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Phone Number
									</Text>
									<Text>+62 123-4567-8900</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Email Address
									</Text>
									<Text>john.doe@gmail.com</Text>
								</Stack>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Finished Order
									</Text>
									<Text>10 Finished Orders</Text>
								</Stack>
							</Stack>
						</Stack>
					</CardBody>

					<Divider />

					<CardFooter>
						<Stack
							width={'full'}
							spacing={'-8'}
							textAlign={'center'}>
							<Text
								fontSize={'xl'}
								fontFamily={'heading'}
								fontWeight={700}
								fontStyle={'italic'}>
								Price
							</Text>
							<Text fontSize={'4xl'}>10 ETH</Text>
						</Stack>
					</CardFooter>
				</Card>

				<Flex
					paddingTop={4}
					gap={2}
					justifyContent={'center'}>
					<ChakraLink
						as={ReactRouterLink}
						to="/order-service">
						<Button
							leftIcon={
								<Icon
									viewBox="0 0 576 512"
									color={'white'}>
									<path
										fill="currentColor"
										d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
									/>
								</Icon>
							}
							colorScheme={'aclean'}
							backgroundColor={'aclean.500'}
							textColor={'white'}
							fontWeight={500}>
							Order Service
						</Button>
					</ChakraLink>
				</Flex>
			</Container>
			<FooterBar />
		</Box>
	);
};
