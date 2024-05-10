import {
	Box,
	Heading,
	Flex,
	Spacer,
	Center,
	Container,
	Button,
	Text,
	Link as ChakraLink,
	Input,
	Select,
	HStack,
	Stack,
	InputRightElement,
	InputGroup,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Badge,
	Tag,
} from '@chakra-ui/react';
import {
	ExternalLinkIcon,
	SearchIcon,
	ArrowRightIcon,
	ArrowLeftIcon,
} from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { FooterBar } from '../components/FooterBar';

export const Home = () => {
	return (
		<>
			<Box
				maxWidth={'full'}
				bgColor={'black'}
				textColor={'white'}
				minHeight={'100dvh'}>
				<NavigationBar />
				<Container
					maxWidth={'container.xl'}
					paddingY={8}>
					<Box>
						<Center>
							<Heading
								as={'h1'}
								textAlign={'center'}
								lineHeight={1.5}>
								<Text fontFamily={'body'}>Your Air Conditioner</Text>
								<Text
									fontSize={'sm'}
									fontWeight={'normal'}
									fontFamily={'body'}>
									is
								</Text>
								<Text
									fontSize={'6xl'}
									lineHeight={0.75}>
									Our Priority
								</Text>
							</Heading>
						</Center>
					</Box>
					<Box paddingY={10}>
						<Flex
							gap={4}
							direction={'row'}>
							<Select width={'max-content'}>
								<option value="all">All Category</option>
								<option value="option2">Option 2</option>
								<option value="option3">Option 3</option>
							</Select>
							<InputGroup size="md">
								<Input placeholder="Search something here..." />
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
					<Flex
						flexDirection={'row'}
						flexFlow={'wrap'}
						justifyContent={'center'}
						gap={4}>
						{Array.from(Array(15).keys()).map((value, index) => {
							return (
								<Card
									key={`card-${index}`}
									maxW="sm"
									direction={{ base: 'column', sm: 'row' }}
									overflow="hidden"
									bgGradient="linear(to-br, black, aclean.500)"
									textColor={'white'}
									variant="outline">
									<Image
										objectFit="cover"
										maxW={{ base: '100%', sm: '150px' }}
										src="https://media.pricebook.co.id/article/5e5e294ab92c2e49128b456b/5e5e294ab92c2e49128b456b_1638247494.jpg"
										alt="Caffe Latte"
									/>

									<Stack>
										<CardBody>
											<Flex
												flexWrap={'wrap'}
												gap={1}
												mb={2}>
												<Tag
													variant={'subtle'}
													colorScheme="aclean"
													size={'sm'}
													rounded={'full'}>
													Default
												</Tag>
												<Tag
													variant={'subtle'}
													colorScheme="aclean"
													size={'sm'}
													rounded={'full'}>
													Default
												</Tag>
												<Tag
													variant={'subtle'}
													colorScheme="aclean"
													size={'sm'}
													rounded={'full'}>
													Default
												</Tag>
											</Flex>
											<Heading
												size="xl"
												fontStyle={'italic'}>
												AC Service A
											</Heading>
											<Text fontFamily={'heading'}>Owner</Text>

											<Flex
												flexWrap={'wrap'}
												justifyContent={'space-between'}>
												<Center>
													<Text
														fontSize={'xl'}
														fontStyle={'italic'}>
														10 ETH
													</Text>
												</Center>
												<Center>
													<Text fontSize={'xs'}>10 Finished Orders</Text>
												</Center>
											</Flex>
										</CardBody>

										<CardFooter>
											<Button
												width={'full'}
												size={'sm'}
												variant="solid"
												textColor={'aclean.500'}>
												More Detail <ArrowRightIcon ml={2} />
											</Button>
										</CardFooter>
									</Stack>
								</Card>
							);
						})}
					</Flex>
					<Flex
						paddingY={8}
						gap={2}
						justifyContent={'center'}>
						<Button textColor={'aclean.500'}>
							<ArrowLeftIcon />
						</Button>
						<Button
							variant={'solid'}
							colorScheme="aclean">
							1
						</Button>
						<Button textColor={'aclean.500'}>2</Button>
						<Button textColor={'aclean.500'}>3</Button>
						<Button textColor={'aclean.500'}>
							<ArrowRightIcon />
						</Button>
					</Flex>
				</Container>

				<FooterBar />
			</Box>
		</>
	);
};
