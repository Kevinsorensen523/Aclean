import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { NavigationBar } from "../components/NavigationBar";
import { FooterBar } from "../components/FooterBar";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";

export const TransactionHistory = () => {
  const [account, setAccount] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [providerOrders, setProviderOrders] = useState([]);
  const [services, setServices] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    if (account) {
      loadOrders();
    }
  }, [account]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadOrders = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ServiceContract.networks[networkId];
    const contract = new web3.eth.Contract(
      ServiceContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    const orders = await contract.methods.getAllOrders().call();
    const services = await contract.methods.getAllServices().call();
    setServices(services);

    // Filter orders for user and provider
    const userOrders = orders.filter(
      (order) => order.user.toLowerCase() === account.toLowerCase()
    );
    const providerOrders = orders.filter((order) => {
      const service = services[order.serviceId];
      return service.owner.toLowerCase() === account.toLowerCase();
    });

    setUserOrders(userOrders);
    setProviderOrders(providerOrders);
  };

  const getServiceDetails = (serviceId) => {
    return services[serviceId];
  };

  const startOrder = async (orderId) => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ServiceContract.networks[networkId];
      const contract = new web3.eth.Contract(
        ServiceContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.startOrder(orderId).send({ from: account });
      toast({
        title: "Order started.",
        description: "The order is now in progress.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      loadOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start the order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ServiceContract.networks[networkId];
      const contract = new web3.eth.Contract(
        ServiceContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      await contract.methods.confirmOrder(orderId).send({ from: account });
      toast({
        title: "Order completed.",
        description: "The order has been completed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      loadOrders();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete the order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
          Transaction History
        </Heading>
        <Box paddingY={8} textColor={"black"}>
          <Flex gap={4} direction={"row"}>
            <Select width={"max-content"} backgroundColor={"white"}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </Select>
            <InputGroup size="md">
              <Input
                backgroundColor={"white"}
                placeholder="Search something here..."
              />
              <InputRightElement marginRight={1}>
                <Button size="sm" colorScheme="aclean">
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Box>

        <Heading as={"h2"} size={"md"} marginBottom={4}>
          Your Orders (as Customer)
        </Heading>

        <Stack direction={"column"}>
          {userOrders.map((order, index) => {
            const service = getServiceDetails(order.serviceId);
            return (
              <Card
                key={index}
                bgGradient="linear(to-br, black, aclean.500)"
                textColor={"white"}
                variant="outline"
              >
                <CardBody>
                  <Flex
                    direction={"row"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    <Stack direction={"column"}>
                      <Tag
                        width={"fit-content"}
                        variant={"subtle"}
                        colorScheme={
                          order.status === "Completed"
                            ? "green"
                            : order.status === "InProgress"
                            ? "yellow"
                            : "red"
                        }
                        size={"sm"}
                        rounded={"full"}
                      >
                        {order.status === "Completed"
                          ? "Completed"
                          : order.status === "InProgress"
                          ? "In Progress"
                          : "Pending"}
                      </Tag>
                      <Box>
                        <Text fontSize={"xs"}>{new Date().toUTCString()}</Text>
                        <Heading as={"h2"} fontStyle={"italic"}>
                          {service.name}
                        </Heading>
                        <Text fontFamily={"heading"}>
                          Service Provider: {service.owner}
                        </Text>
                      </Box>
                    </Stack>
                    <Stack direction={"column"}>
                      <Stack>
                        <Text
                          fontFamily={"heading"}
                          fontStyle={"italic"}
                          fontWeight={700}
                          fontSize={"md"}
                          marginBottom={-2}
                          textAlign={"end"}
                        >
                          Total
                        </Text>
                        <Text
                          fontSize={"3xl"}
                          fontStyle={"italic"}
                          fontWeight={700}
                          textAlign={"end"}
                        >
                          {service.cost} {service.currency}
                        </Text>
                      </Stack>
                      {order.status === "InProgress" && (
                        <Button
                          onClick={() => confirmOrder(index)}
                          size={"sm"}
                          textColor={"aclean.500"}
                          fontWeight={500}
                          backgroundColor={"white"}
                        >
                          Confirm Completion
                        </Button>
                      )}
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/detail-transaction/${index}`}
                      >
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          size={"sm"}
                          textColor={"aclean.500"}
                          fontWeight={500}
                          backgroundColor={"white"}
                        >
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

        <Heading as={"h2"} size={"md"} marginTop={8} marginBottom={4}>
          Orders for Your Services (as Service Provider)
        </Heading>
        <Stack direction={"column"}>
          {providerOrders.map((order, index) => {
            const service = getServiceDetails(order.serviceId);
            return (
              <Card
                key={index}
                bgGradient="linear(to-br, black, aclean.500)"
                textColor={"white"}
                variant="outline"
              >
                <CardBody>
                  <Flex
                    direction={"row"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                    alignItems={"center"}
                  >
                    <Stack direction={"column"}>
                      <Tag
                        width={"fit-content"}
                        variant={"subtle"}
                        colorScheme={
                          order.status === "Completed"
                            ? "green"
                            : order.status === "InProgress"
                            ? "yellow"
                            : "red"
                        }
                        size={"sm"}
                        rounded={"full"}
                      >
                        {order.status === "Completed"
                          ? "Completed"
                          : order.status === "InProgress"
                          ? "In Progress"
                          : "Pending"}
                      </Tag>
                      <Box>
                        <Text fontSize={"xs"}>{new Date().toUTCString()}</Text>
                        <Heading as={"h2"} fontStyle={"italic"}>
                          {service.name}
                        </Heading>
                        <Text fontFamily={"heading"}>
                          Customer: {order.user}
                        </Text>
                      </Box>
                    </Stack>
                    <Stack direction={"column"}>
                      <Stack>
                        <Text
                          fontFamily={"heading"}
                          fontStyle={"italic"}
                          fontWeight={700}
                          fontSize={"md"}
                          marginBottom={-2}
                          textAlign={"end"}
                        >
                          Total
                        </Text>
                        <Text
                          fontSize={"3xl"}
                          fontStyle={"italic"}
                          fontWeight={700}
                          textAlign={"end"}
                        >
                          {service.cost} {service.currency}
                        </Text>
                      </Stack>
                      {order.status === "Pending" && (
                        <Button
                          onClick={() => startOrder(index)}
                          size={"sm"}
                          textColor={"aclean.500"}
                          fontWeight={500}
                          backgroundColor={"white"}
                        >
                          Start Order
                        </Button>
                      )}
                      <ChakraLink
                        as={ReactRouterLink}
                        to={`/detail-transaction/${index}`}
                      >
                        <Button
                          rightIcon={<ArrowForwardIcon />}
                          size={"sm"}
                          textColor={"aclean.500"}
                          fontWeight={500}
                          backgroundColor={"white"}
                        >
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

        <Flex paddingY={8} gap={2} justifyContent={"center"}>
          <Button textColor={"aclean.500"}>
            <ArrowBackIcon />
          </Button>
          <Button variant={"solid"} colorScheme="aclean">
            1
          </Button>
          <Button textColor={"aclean.500"}>2</Button>
          <Button textColor={"aclean.500"}>3</Button>
          <Button textColor={"aclean.500"}>
            <ArrowForwardIcon />
          </Button>
        </Flex>
      </Container>
      <FooterBar />
    </Box>
  );
};
