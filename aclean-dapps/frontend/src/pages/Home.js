import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Stack,
  Card,
  CardBody,
  Text,
  Flex,
  Tag,
  Link as ChakraLink,
  Image,
  Button,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { NavigationBar } from "../components/NavigationBar";
import { FooterBar } from "../components/FooterBar";
import { Link as ReactRouterLink } from "react-router-dom";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";

export const Home = () => {
  const [services, setServices] = useState([]);
  const [account, setAccount] = useState(null);
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

      try {
        const services = await contractInstance.methods.getAllServices().call();
        setServices(services);
      } catch (error) {
        console.error("Error fetching services", error);
        toast({
          title: "Error",
          description: "Failed to load services",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      window.alert("Smart contract not deployed to detected network.");
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
          Available Services
        </Heading>
        <Stack direction={"column"} spacing={6}>
          {services.map((service, index) => (
            <Card
              key={`card-${index}`}
              direction={"row"}
              bgGradient="linear(to-br, black, aclean.500)"
              textColor={"white"}
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src={service.logo}
                alt="Service Image"
              />
              <CardBody>
                <Flex
                  direction={"row"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                  alignItems={"center"}
                >
                  <Stack direction={"column"}>
                    <Flex
                      gap={1}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      width={"full"}
                    >
                      <Tag
                        width={"fit-content"}
                        variant={"subtle"}
                        colorScheme={"aclean"}
                        size={"sm"}
                        rounded={"full"}
                      >
                        {service.category}
                      </Tag>
                    </Flex>
                    <Box>
                      <Heading as={"h2"} fontStyle={"italic"}>
                        {service.name}
                      </Heading>
                    </Box>
                  </Stack>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/order-service/${index}`}
                  >
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      size={"sm"}
                      textColor={"aclean.500"}
                      fontWeight={500}
                      backgroundColor={"white"}
                    >
                      Order Service
                    </Button>
                  </ChakraLink>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Container>
      <FooterBar />
    </Box>
  );
};
