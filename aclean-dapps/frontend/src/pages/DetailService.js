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
} from "@chakra-ui/react";
import React, { useState } from "react";
import Web3 from "web3";
import { useParams, Link as ReactRouterLink } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { FooterBar } from "../components/FooterBar";
import { useEffect } from "react";
import ServiceContract from "./../contracts/ServiceContract.json";

export const DetailService = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [service, setService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      window.alert("Non-Ethereum browser detected. Consider trying MetaMask!");
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

      const services = await contractInstance.methods.getAllServices().call();
      setService(services[id]);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  if (!service) {
    return (
      <Box
        maxWidth={"full"}
        bgColor={"black"}
        textColor={"white"}
        minHeight={"100dvh"}
      >
        <NavigationBar />
        <Container maxWidth={"container.xl"} paddingY={8}>
          <Heading as={"h2"}>Loading...</Heading>
        </Container>
        <FooterBar />
      </Box>
    );
  }

  return (
    <Box
      maxWidth={"full"}
      bgColor={"black"}
      textColor={"white"}
      minHeight={"100dvh"}
    >
      <NavigationBar />

      <Container maxWidth={"container.xl"} paddingY={8}>
        <Heading as={"h1"} marginBottom={4}>
          Detail Service
        </Heading>

        <Card
          bgGradient="linear(to-br, black, aclean.500)"
          variant="outline"
          textColor={"white"}
        >
          <CardBody>
            <Stack spacing="3">
              <Heading as={"h2"} textAlign={"center"} fontStyle={"italic"}>
                {service.name}
              </Heading>

              <Center>
                <Image
                  objectFit="cover"
                  src={service.logo}
                  alt={service.name}
                  borderRadius={"lg"}
                  boxSize={"sm"}
                />
              </Center>

              <Stack direction={"column"} spacing={3}>
                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Owner Service
                  </Text>
                  <Text>{account}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Category
                  </Text>
                  <Text>{service.category}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Description Service
                  </Text>
                  <Text>{service.description}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Address Owner
                  </Text>
                  <Text>{service.addressDetail}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Phone Number
                  </Text>
                  <Text>{service.phoneNumber}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Email Address
                  </Text>
                  <Text>{service.email}</Text>
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Finished Order
                  </Text>
                  <Text>10 Finished Orders</Text>
                </Stack>
              </Stack>
            </Stack>
          </CardBody>

          <Divider />

          <CardFooter>
            <Stack width={"full"} spacing={"-8"} textAlign={"center"}>
              <Text
                fontSize={"xl"}
                fontFamily={"heading"}
                fontWeight={700}
                fontStyle={"italic"}
              >
                Price
              </Text>
              <Text fontSize={"4xl"}>
                {service.cost} {service.currency}
              </Text>
            </Stack>
          </CardFooter>
        </Card>

        <Flex paddingTop={4} gap={2} justifyContent={"center"}>
          <ChakraLink as={ReactRouterLink} to="/order-service">
            <Button
              leftIcon={
                <Icon viewBox="0 0 576 512" color={"white"}>
                  <path
                    fill="currentColor"
                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                  />
                </Icon>
              }
              colorScheme={"aclean"}
              backgroundColor={"aclean.500"}
              textColor={"white"}
              fontWeight={500}
            >
              Order Service
            </Button>
          </ChakraLink>
        </Flex>
      </Container>
      <FooterBar />
    </Box>
  );
};
