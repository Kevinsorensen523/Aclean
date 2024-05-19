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
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
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
    if (!deployedNetwork) {
      console.error("Smart contract not deployed on detected network.");
      return;
    }
    const contract = new web3.eth.Contract(
      ServiceContract.abi,
      deployedNetwork.address
    );

    try {
      const orders = await contract.methods.getAllOrders().call();
      const services = await contract.methods.getAllServices().call();
      setServices(services);

      const userOrders = orders.filter(
        (order) => order.user.toLowerCase() === account.toLowerCase()
      );
      const providerOrders = orders.filter((order) => {
        const service = services[order.serviceId];
        return service.owner.toLowerCase() === account.toLowerCase();
      });

      setUserOrders(userOrders);
      setProviderOrders(providerOrders);
      console.log("User Orders: ", userOrders);
      console.log("Provider Orders: ", providerOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
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
        title: "Order Started",
        description: `Order ${orderId} has been started.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      loadOrders();
    } catch (error) {
      console.error("Failed to start the order", error);
      toast({
        title: "Error",
        description: "Failed to start the order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("Using account:", account);
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
        title: "Order Confirmed",
        description: `Order ${orderId} has been confirmed.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      loadOrders();
    } catch (error) {
      console.error("Failed to confirm the order", error);
      toast({
        title: "Error",
        description: "Failed to confirm the order.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const getServiceDetails = (serviceId) => {
    return services[serviceId];
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
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
                            : order.status === "In Progress"
                            ? "orange"
                            : "red"
                        }
                        size={"sm"}
                        rounded={"full"}
                      >
                        {order.status}
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
                      {order.status === "In Progress" && (
                        <Button
                          size={"sm"}
                          colorScheme="green"
                          onClick={() => confirmOrder(order.serviceId)}
                        >
                          Confirm Completion
                        </Button>
                      )}
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
                            : order.status === "In Progress"
                            ? "orange"
                            : "red"
                        }
                        size={"sm"}
                        rounded={"full"}
                      >
                        {order.status}
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
                      {order.status === "Pending" && (
                        <Button
                          size={"sm"}
                          colorScheme="orange"
                          onClick={() => startOrder(order.serviceId)}
                        >
                          Start Order
                        </Button>
                      )}
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
