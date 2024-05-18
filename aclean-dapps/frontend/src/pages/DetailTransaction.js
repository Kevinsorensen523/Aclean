import {
	Box,
	Container,
	Heading,
	Card,
	CardBody,
	Text,
	Image,
	Center,
	Stack,
	Tag,
	Divider,
} from '@chakra-ui/react';
import { FooterBar } from '../components/FooterBar';
import { NavigationBar } from '../components/NavigationBar';
import { useParams } from 'react-router-dom';

export const DetailTransaction = () => {
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
				<Heading
					as={'h1'}
					marginBottom={4}>
					Detail Transaction History {params.id}
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
								Detail Transaction
							</Heading>

							<Stack
								direction={'column'}
								spacing={3}>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Transaction ID
									</Text>
									<Text>{new Date().getTime()}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Status
									</Text>
									<Tag
										width={'fit-content'}
										variant={'subtle'}
										colorScheme={'green'}
										size={'sm'}
										rounded={'full'}>
										Done
									</Tag>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Transaction Date
									</Text>
									<Text>{new Date().toUTCString()}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										From
									</Text>
									<Text>{new Date().getTime() + 7161612180}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										To
									</Text>
									<Text>{new Date().getTime() + 18371871702}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Amount
									</Text>
									<Text>15 ETH</Text>
								</Stack>

								<Divider />

								<Heading
									as={'h2'}
									textAlign={'center'}
									fontStyle={'italic'}>
									Detail The Service
								</Heading>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Title Service
									</Text>
									<Text>AC Service A</Text>
								</Stack>
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
										Address
									</Text>
									<Text>Sesame Street Number 05, Los Angeles, USA</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Phone Number
									</Text>
									<Text>+62 123-4678-9000</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Email Address
									</Text>
									<Text>owner@email.com</Text>
								</Stack>

								<Divider />

								<Heading
									as={'h2'}
									textAlign={'center'}
									fontStyle={'italic'}>
									Detail Your Information
								</Heading>

								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Full Name
									</Text>
									<Text>John Doe</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Address
									</Text>
									<Text>Sesame Street Number 05, Los Angeles, USA</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Phone Number
									</Text>
									<Text>+62 123-4678-9000</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Email Address
									</Text>
									<Text>john.doe@email.com</Text>
								</Stack>
							</Stack>
						</Stack>
					</CardBody>
				</Card>
			</Container>

			<FooterBar />
		</Box>
	);
};
