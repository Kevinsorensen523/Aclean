import {
	Box,
	Container,
	Heading,
	Flex,
	Select,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Stack,
	Card,
	CardBody,
	Tag,
	Text,
	Link as ChakraLink,
	Image,
} from '@chakra-ui/react';
import { NavigationBar } from '../components/NavigationBar';
import { FooterBar } from '../components/FooterBar';
import {
	AddIcon,
	ArrowBackIcon,
	ArrowForwardIcon,
	SearchIcon,
} from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

export const MyService = () => {
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
					gap={2}>
					<Heading
						as={'h1'}
						marginBottom={4}>
						My Service
					</Heading>
					<ChakraLink
						as={ReactRouterLink}
						to={'/new-service'}>
						<Button
							leftIcon={<AddIcon />}
							colorScheme="aclean">
							New Service
						</Button>
					</ChakraLink>
				</Flex>

				<Box
					paddingY={8}
					textColor={'black'}>
					<Flex
						gap={4}
						direction={'row'}>
						<Select
							width={'max-content'}
							backgroundColor={'white'}>
							<option value="all">All Status</option>
							<option value="option2">Option 2</option>
							<option value="option3">Option 3</option>
						</Select>
						<InputGroup size="md">
							<Input
								backgroundColor={'white'}
								placeholder="Search something here..."
							/>
							<InputRightElement marginRight={1}>
								<Button
									size="sm"
									colorScheme="aclean">
									<SearchIcon />
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Box>

				<Stack direction={'column'}>
					{Array.from(Array(15).keys()).map((value, index) => {
						return (
							<Card
								key={`card-${index}`}
								direction={'row'}
								bgGradient="linear(to-br, black, aclean.500)"
								textColor={'white'}
								variant="outline">
								<Image
									objectFit="cover"
									maxW={{ base: '100%', sm: '150px' }}
									src="https://media.pricebook.co.id/article/5e5e294ab92c2e49128b456b/5e5e294ab92c2e49128b456b_1638247494.jpg"
									alt="Caffe Latte"
								/>

								<CardBody>
									<Flex
										direction={'row'}
										justifyContent={'space-between'}
										flexWrap={'wrap'}
										alignItems={'center'}>
										<Stack direction={'column'}>
											<Flex
												gap={1}
												flexDirection={'row'}
												flexWrap={'wrap'}
												width={'full'}>
												<Tag
													width={'fit-content'}
													variant={'subtle'}
													colorScheme={'aclean'}
													size={'sm'}
													rounded={'full'}>
													Ketegori 1
												</Tag>
												<Tag
													width={'fit-content'}
													variant={'subtle'}
													colorScheme={'aclean'}
													size={'sm'}
													rounded={'full'}>
													Ketegori 1
												</Tag>
												<Tag
													width={'fit-content'}
													variant={'subtle'}
													colorScheme={'aclean'}
													size={'sm'}
													rounded={'full'}>
													Ketegori 1
												</Tag>
											</Flex>
											<Box>
												<Heading
													as={'h2'}
													fontStyle={'italic'}>
													AC Service {index + 1}
												</Heading>
											</Box>
										</Stack>

										<ChakraLink
											as={ReactRouterLink}
											to={`/detail-my-service/${index + 1}`}>
											<Button
												rightIcon={<ArrowForwardIcon />}
												size={'sm'}
												textColor={'aclean.500'}
												fontWeight={500}
												backgroundColor={'white'}>
												Detail Service
											</Button>
										</ChakraLink>
									</Flex>
								</CardBody>
							</Card>
						);
					})}
				</Stack>

				<Flex
					paddingY={8}
					gap={2}
					justifyContent={'center'}>
					<Button textColor={'aclean.500'}>
						<ArrowBackIcon />
					</Button>
					<Button
						variant={'solid'}
						colorScheme="aclean">
						1
					</Button>
					<Button textColor={'aclean.500'}>2</Button>
					<Button textColor={'aclean.500'}>3</Button>
					<Button textColor={'aclean.500'}>
						<ArrowForwardIcon />
					</Button>
				</Flex>
			</Container>

			<FooterBar />
		</Box>
	);
};
