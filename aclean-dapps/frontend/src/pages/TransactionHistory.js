import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Stack,
	Card,
	CardBody,
	Text,
	Tag,
	Link as ChakraLink,
} from '@chakra-ui/react';
import { NavigationBar } from '../components/NavigationBar';
import { FooterBar } from '../components/FooterBar';
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';

export const TransactionHistory = () => {
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
					Transaction History
				</Heading>

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
								bgGradient="linear(to-br, black, aclean.500)"
								textColor={'white'}
								variant="outline">
								<CardBody>
									<Flex
										direction={'row'}
										justifyContent={'space-between'}
										flexWrap={'wrap'}
										alignItems={'center'}>
										<Stack direction={'column'}>
											<Tag
												width={'fit-content'}
												variant={'subtle'}
												colorScheme="green"
												size={'sm'}
												rounded={'full'}>
												Done
											</Tag>
											<Box>
												<Text fontSize={'xs'}>{new Date().toUTCString()}</Text>
												<Heading
													as={'h2'}
													fontStyle={'italic'}>
													AC Service {index + 1}
												</Heading>
												<Text fontFamily={'heading'}>Owner</Text>
											</Box>
										</Stack>
										<Stack direction={'column'}>
											<Stack>
												<Text
													fontFamily={'heading'}
													fontStyle={'italic'}
													fontWeight={700}
													fontSize={'md'}
													marginBottom={-2}
													textAlign={'end'}>
													Total
												</Text>
												<Text
													fontSize={'3xl'}
													fontStyle={'italic'}
													fontWeight={700}
													textAlign={'end'}>
													15 ETH
												</Text>
											</Stack>
											<ChakraLink
												as={ReactRouterLink}
												to={`/detail-transaction/${index + 1}`}>
												<Button
													rightIcon={<ArrowForwardIcon />}
													size={'sm'}
													textColor={'aclean.500'}
													fontWeight={500}
													backgroundColor={'white'}>
													Detail Transaction
												</Button>
											</ChakraLink>
										</Stack>
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
