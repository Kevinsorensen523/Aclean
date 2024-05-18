import {
	Box,
	Container,
	Heading,
	Card,
	CardBody,
	Center,
	Stack,
	Image,
	Text,
	CardFooter,
	Divider,
	Flex,
	Button,
} from '@chakra-ui/react';
import { FooterBar } from '../components/FooterBar';
import { NavigationBar } from '../components/NavigationBar';
import { useParams } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';

export const DetailMyService = () => {
	let params = useParams();

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
				<Flex
					flexDirection={'row'}
					flexWrap={'wrap'}
					justifyContent={'space-between'}
					alignItems={'center'}
					gap={2}
					marginBottom={4}>
					<Heading as={'h1'}>Detail My Service {params.id}</Heading>
					<Button
						leftIcon={<DeleteIcon />}
						size={'sm'}
						colorScheme="red">
						Delete Service
					</Button>
				</Flex>

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
			</Container>

			<FooterBar />
		</Box>
	);
};
