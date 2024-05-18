import {
	Heading,
	Box,
	Container,
	Text,
	Divider,
	Flex,
	Card,
	CardBody,
	CardFooter,
	Button,
	Image,
	ButtonGroup,
	Stack,
} from '@chakra-ui/react';
import { FooterBar } from '../components/FooterBar';
import { NavigationBar } from '../components/NavigationBar';

export const AboutUs = () => {
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
					fontSize={'6xl'}
					marginBottom={4}
					fontStyle={'italic'}
					textAlign={'center'}>
					AClean
				</Heading>

				<Text textAlign={'center'}>
					AClean is a high quality and trusted air conditioning maintenance
					service because it uses a blockchain system in the use of its
					technology. You can use various payment methods commonly used in
					cryptocurrency technology, so you can trust us at the highest level.
				</Text>

				<Box paddingY={8}>
					<Heading
						as={'h3'}
						fontSize={'3xl'}
						marginBottom={4}
						fontStyle={'italic'}
						textAlign={'center'}>
						The Team behind the AClean Website
					</Heading>

					<Flex
						gap={6}
						justifyContent={'center'}>
						<Card
							width="full"
							bgGradient="linear(to-br, black, aclean.500)"
							variant="outline"
							textColor={'white'}
							maxW="sm">
							<CardBody>
								<Image
									src="https://media.licdn.com/dms/image/D5603AQHhkz2QS2dd7g/profile-displayphoto-shrink_800_800/0/1692074868795?e=1721260800&v=beta&t=6-8P1lYAcLfqSJKgtfHlArj-8qn1xg51AO2sC8Nbq1g"
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Stack
									mt="6"
									spacing="1"
									textAlign={'center'}>
									<Heading fontStyle={'italic'}>
										Adhitya Bagus Wicaksono
									</Heading>
									<Heading size={'md'}>00000048211</Heading>
									<Text>Informatics 2020</Text>
									<Text>UI Designer and Front-End Website Developer</Text>
								</Stack>
							</CardBody>
						</Card>
						<Card
							width="full"
							bgGradient="linear(to-br, black, aclean.500)"
							variant="outline"
							textColor={'white'}
							maxW="sm">
							<CardBody>
								<Image
									src="https://media.licdn.com/dms/image/D5603AQE6buJlYOWwAQ/profile-displayphoto-shrink_800_800/0/1713524466659?e=1721260800&v=beta&t=XKRff9TjtBYQEjjm_28Z41glYYGKP43QRZTwVR602M8"
									alt="Green double couch with wooden legs"
									borderRadius="lg"
								/>
								<Stack
									mt="6"
									spacing="1"
									textAlign={'center'}>
									<Heading fontStyle={'italic'}>Kevin Sorensen</Heading>
									<Heading size={'md'}>00000062002</Heading>
									<Text>Informatics 2021</Text>
									<Text>Back-End Website and Blockchain Developer</Text>
								</Stack>
							</CardBody>
						</Card>
					</Flex>
				</Box>
			</Container>

			<FooterBar />
		</Box>
	);
};
