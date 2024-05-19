import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Card,
  CardBody,
  Center,
  Stack,
  Image,
  Text,
  CardFooter,
  Divider,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FooterBar } from "../components/FooterBar";
import { NavigationBar } from "../components/NavigationBar";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";

export const DetailMyService = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
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

      const services = await contractInstance.methods
        .getServices(accounts[0])
        .call();
      if (services[id]) {
        setService(services[id]);
      } else {
        toast({
          title: "Error",
          description: "Service not found",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        navigate("/my-service");
      }
      setLoading(false);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  const deleteService = async () => {
    try {
      await contract.methods.deleteService(id).send({ from: account });
      toast({
        title: "Service deleted.",
        description: "Service has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/my-service");
    } catch (error) {
      toast({
        title: "Error deleting service.",
        description:
          "There was an error deleting the service. Please try again.",
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
        {loading ? (
          <Heading as={"h2"}>Loading...</Heading>
        ) : (
          service && (
            <>
              <Flex
                flexDirection={"row"}
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={2}
                marginBottom={4}
              >
                <Heading as={"h1"}>Detail My Service {id}</Heading>
                <Button
                  leftIcon={<DeleteIcon />}
                  size={"sm"}
                  colorScheme="red"
                  onClick={deleteService}
                >
                  Delete Service
                </Button>
              </Flex>

              <Card
                bgGradient="linear(to-br, black, aclean.500)"
                variant="outline"
                textColor={"white"}
              >
                <CardBody>
                  <Stack spacing="3">
                    <Heading
                      as={"h2"}
                      textAlign={"center"}
                      fontStyle={"italic"}
                    >
                      {service.name}
                    </Heading>

                    <Center>
                      <Image
                        objectFit="cover"
                        src="https://media.pricebook.co.id/article/5e5e294ab92c2e49128b456b/5e5e294ab92c2e49128b456b_1638247494.jpg"
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
                    <Text fontSize={"4xl"}>{service.cost}</Text>
                    <Text fontSize={"4xl"}>{service.currency}</Text>
                  </Stack>
                </CardFooter>
              </Card>
            </>
          )
        )}
      </Container>

      <FooterBar />
    </Box>
  );
};
