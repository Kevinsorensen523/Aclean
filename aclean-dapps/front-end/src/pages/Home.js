import {
	Box,
	Heading,
	Flex,
	Center,
	Container,
	Button,
	Text,
	Link as ChakraLink,
	Input,
	Select,
	Stack,
	InputRightElement,
	InputGroup,
	Card,
	CardBody,
	CardFooter,
	Image,
	Tag,
} from '@chakra-ui/react';
import { SearchIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
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
					<Box
						paddingY={10}
						textColor={'black'}>
						<Flex
							gap={4}
							direction={'row'}>
							<Select
								width={'max-content'}
								backgroundColor={'white'}>
								<option value="all">All Category</option>
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
												AC Service {index + 1}
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
											<ChakraLink
												as={ReactRouterLink}
												to={`/detail-service/${index + 1}`}>
												<Button
													width={'full'}
													size={'sm'}
													variant="solid"
													textColor={'aclean.500'}>
													More <ArrowForwardIcon ml={2} />
												</Button>
											</ChakraLink>
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
		</>
	);
};
