import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Heading,
	Card,
	CardBody,
	Text,
	Tag,
	Divider,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { FooterBar } from '../components/FooterBar';
import { NavigationBar } from '../components/NavigationBar';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import ServiceContract from './../contracts/ServiceContract.json';

export const DetailTransaction = () => {
	const { id } = useParams();
	const [account, setAccount] = useState(null);
	const [contract, setContract] = useState(null);
	const [transaction, setTransaction] = useState(null);
	const [service, setService] = useState(null);
	const toast = useToast();

	useEffect(() => {
		loadWeb3();
		loadBlockchainData();
	}, []);

	const loadWeb3 = async () => {
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum);
			await window.ethereum.enable();
			const accounts = await window.web3.eth.getAccounts();
			setAccount(accounts[0]);
		} else {
			// console.log(
			//   "Non-Ethereum browser detected. You should consider trying MetaMask!"
			// );
			toast({
				title: 'Error!',
				description: `Non-Ethereum browser detected. You should consider trying MetaMask!`,
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const loadBlockchainData = async () => {
		const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
		const networkId = await web3.eth.net.getId();
		const deployedNetwork = ServiceContract.networks[networkId];
		const contractInstance = new web3.eth.Contract(
			ServiceContract.abi,
			deployedNetwork && deployedNetwork.address
		);
		setContract(contractInstance);

		const orders = await contractInstance.methods.getAllOrders().call();
		const services = await contractInstance.methods.getAllServices().call();

		const transaction = orders[id];
		const service = services[transaction.serviceId];

		setTransaction(transaction);
		setService(service);
	};

	if (!transaction || !service) {
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
					<Heading as={'h2'}>Loading...</Heading>
				</Container>
				<FooterBar />
			</Box>
		);
	}

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
					Detail Transaction History {id}
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
									<Text>{id}</Text>
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
										colorScheme={transaction.isCompleted ? 'green' : 'red'}
										size={'sm'}
										rounded={'full'}>
										{transaction.isCompleted ? 'Done' : 'Pending'}
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
									<Text>
										{new Date(transaction.timestamp * 1000).toUTCString()}
									</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										From
									</Text>
									<Text>{transaction.user}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										To
									</Text>
									<Text>{service.owner}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Amount
									</Text>
									<Text>
										{service.cost} {service.currency}
									</Text>
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
									<Text>{service.name}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Service Provider
									</Text>
									<Text>{service.owner}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Address
									</Text>
									<Text>{service.addressDetail}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Phone Number
									</Text>
									<Text>{service.phoneNumber}</Text>
								</Stack>
								<Stack spacing={'-3'}>
									<Text
										fontSize={'xl'}
										fontFamily={'heading'}
										fontWeight={700}
										fontStyle={'italic'}>
										Email Address
									</Text>
									<Text>{service.email}</Text>
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
