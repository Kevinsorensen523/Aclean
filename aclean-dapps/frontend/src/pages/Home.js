import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { FooterBar } from "../components/FooterBar";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";

export const Home = () => {
  const [services, setServices] = useState([]);

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
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = ServiceContract.networks[networkId];
    if (deployedNetwork) {
      const contractInstance = new web3.eth.Contract(
        ServiceContract.abi,
        deployedNetwork.address
      );

      const allServices = await contractInstance.methods
        .getAllServices()
        .call();
      setServices(allServices);
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
        <Box>
          <Center>
            <Heading as={"h1"} textAlign={"center"} lineHeight={1.5}>
              <Text fontFamily={"body"}>Your Air Conditioner</Text>
              <Text fontSize={"sm"} fontWeight={"normal"} fontFamily={"body"}>
                is
              </Text>
              <Text fontSize={"6xl"} lineHeight={0.75}>
                Our Priority
              </Text>
            </Heading>
          </Center>
        </Box>
        <Box paddingY={10} textColor={"black"}>
          <Flex gap={4} direction={"row"}>
            <Select width={"max-content"} backgroundColor={"white"}>
              <option value="all">All Category</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
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
        <Flex
          flexDirection={"row"}
          flexFlow={"wrap"}
          justifyContent={"center"}
          gap={4}
        >
          {services.map((service, index) => (
            <Card
              key={`card-${index}`}
              maxW="sm"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              bgGradient="linear(to-br, black, aclean.500)"
              textColor={"white"}
              variant="outline"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "150px" }}
                src={service.logo}
                alt={service.name}
              />
              <Stack>
                <CardBody>
                  <Flex flexWrap={"wrap"} gap={1} mb={2}>
                    <Tag
                      variant={"subtle"}
                      colorScheme="aclean"
                      size={"sm"}
                      rounded={"full"}
                    >
                      {service.category}
                    </Tag>
                  </Flex>
                  <Heading size="xl" fontStyle={"italic"}>
                    {service.name}
                  </Heading>
                  <Text fontFamily={"heading"}>Owner</Text>
                  <Flex flexWrap={"wrap"} justifyContent={"space-between"}>
                    <Center>
                      <Text fontSize={"xl"} fontStyle={"italic"}>
                        {service.cost} {service.currency}
                      </Text>
                    </Center>
                    <Center>
                      <Text fontSize={"xs"}>10 Finished Orders</Text>
                    </Center>
                  </Flex>
                </CardBody>
                <CardFooter>
                  <ChakraLink
                    as={ReactRouterLink}
                    to={`/detail-service/${index}`}
                  >
                    <Button
                      width={"full"}
                      size={"sm"}
                      variant="solid"
                      textColor={"aclean.500"}
                    >
                      More <ArrowForwardIcon ml={2} />
                    </Button>
                  </ChakraLink>
                </CardFooter>
              </Stack>
            </Card>
          ))}
        </Flex>
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
