import React, { useState, useEffect } from 'react';
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
	useToast,
} from '@chakra-ui/react';
import { NavigationBar } from '../components/NavigationBar';
import { FooterBar } from '../components/FooterBar';
import {
	AddIcon,
	ArrowBackIcon,
	ArrowForwardIcon,
	SearchIcon,
	DeleteIcon,
} from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import Web3 from 'web3';
import ServiceContract from './../contracts/ServiceContract.json';

export const MyService = () => {
	const [account, setAccount] = useState(null);
	const [services, setServices] = useState([]);
	const [contract, setContract] = useState(null);
	const toast = useToast();

	useEffect(() => {
		loadWeb3();
		loadBlockchainData();
	}, []);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider);
		} else {
			// window.alert('Non-Ethereum browser detected. Consider trying MetaMask!');
			toast({
				title: 'Error!',
				description: 'Non-Ethereum browser detected. Consider trying MetaMask!',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const loadBlockchainData = async () => {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);

		const networkId = await web3.eth.net.getId();
		const deployedNetwork = ServiceContract.networks[networkId];
		if (deployedNetwork) {
			const contractInstance = new web3.eth.Contract(
				ServiceContract.abi,
				deployedNetwork.address
			);
			setContract(contractInstance);

			const services = await contractInstance.methods
				.getServices(accounts[0])
				.call();
			setServices(services);
		} else {
			// window.alert('Smart contract not deployed to detected network.');
			toast({
				title: 'Error!',
				description: 'Smart contract not deployed to detected network.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const deleteService = async (index) => {
		try {
			await contract.methods.deleteService(index).send({ from: account });
			const updatedServices = await contract.methods
				.getServices(account)
				.call();
			setServices(updatedServices);
			toast({
				title: 'Service deleted.',
				description: 'Service has been deleted successfully.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: 'Error deleting service.',
				description:
					'There was an error deleting the service. Please try again.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

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

				{/* <Box
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
				</Box> */}

				<Stack direction={'column'}>
					{services.length === 0 && (
						<Card
							bgGradient="linear(to-br, black, red.500)"
							textColor={'white'}
							variant="outline">
							<CardBody>
								<Heading
									size={'lg'}
									textAlign={'center'}>
									No Service cant be displayed
								</Heading>
							</CardBody>
						</Card>
					)}
					{services.map((service, index) => (
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
								alt="Service Image"
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
												{service.category}
											</Tag>
										</Flex>
										<Box>
											<Heading
												as={'h2'}
												fontStyle={'italic'}>
												{service.name}
											</Heading>
										</Box>
									</Stack>

									<Flex gap={2}>
										<ChakraLink
											as={ReactRouterLink}
											to={`/detail-my-service/${index}`}>
											<Button
												rightIcon={<ArrowForwardIcon />}
												size={'sm'}
												textColor={'aclean.500'}
												fontWeight={500}
												backgroundColor={'white'}>
												Detail Service
											</Button>
										</ChakraLink>
										<Button
											leftIcon={<DeleteIcon />}
											size={'sm'}
											colorScheme="red"
											onClick={() => deleteService(index)}>
											Delete Service
										</Button>
									</Flex>
								</Flex>
							</CardBody>
						</Card>
					))}
				</Stack>

				{/* <Flex
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
				</Flex> */}
			</Container>

			<FooterBar />
		</Box>
	);
};
