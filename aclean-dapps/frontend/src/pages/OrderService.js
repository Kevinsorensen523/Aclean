import {
  Box,
  Container,
  Heading,
  Card,
  Image,
  Stack,
  CardBody,
  Flex,
  Tag,
  Center,
  Text,
  Input,
  Textarea,
  ButtonGroup,
  Button,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FooterBar } from "../components/FooterBar";
import { NavigationBar } from "../components/NavigationBar";
import { useEffect } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";
import react, { useState } from "react";

export const OrderService = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [service, setService] = useState(null);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  let history = useNavigate();

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
      setService(services[0]); // Replace with logic to select the correct service
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  const handleOrder = async () => {
    if (!fullName || !address || !phoneNumber || !email) {
      window.alert("Please fill in all fields");
      return;
    }

    if (account === service.owner) {
      window.alert("You cannot order your own service");
      return;
    }

    try {
      await contract.methods
        .placeOrder(0) // Replace with logic to select the correct service ID
        .send({
          from: account,
          value: window.web3.utils.toWei(service.cost.toString(), "ether"),
        });

      window.alert("Order placed successfully!");
      history("/"); // Redirect to the home page or another page
    } catch (error) {
      console.error("Order placement failed", error);
      window.alert("Order placement failed");
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
          Order Service
        </Heading>

        <Stack spacing={3}>
          <Card
            width={"full"}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            bgGradient="linear(to-br, black, aclean.500)"
            textColor={"white"}
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW="150px"
              src="https://media.pricebook.co.id/article/5e5e294ab92c2e49128b456b/5e5e294ab92c2e49128b456b_1638247494.jpg"
              alt="Service"
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
                    {service?.category}
                  </Tag>
                </Flex>
                <Heading size="xl" fontStyle={"italic"}>
                  {service?.name}
                </Heading>
                <Text fontFamily={"heading"}>{service?.owner}</Text>

                <Text fontSize={"xl"} fontStyle={"italic"}>
                  {service?.cost} {service?.currency}
                </Text>
              </CardBody>
            </Stack>
          </Card>

          <Card
            width="full"
            bgGradient="linear(to-br, black, aclean.500)"
            variant="outline"
            textColor={"white"}
          >
            <CardBody>
              <Stack spacing="3">
                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Full Name
                  </Text>
                  <Input
                    type={"text"}
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Stack>

                <Stack spacing={"-3"}>
                  <Text
                    fontSize={"xl"}
                    fontFamily={"heading"}
                    fontWeight={700}
                    fontStyle={"italic"}
                  >
                    Address
                  </Text>
                  <Textarea
                    placeholder="Sesame Street Number 05, Los Angeles, USA"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
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
                  <Input
                    type={"tel"}
                    placeholder="+62 123-4678-9000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
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
                  <Input
                    type={"email"}
                    placeholder="john.doe@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </Stack>

        <Flex paddingTop={4} gap={2} justifyContent={"center"}>
          <ButtonGroup>
            <ChakraLink onClick={() => history(-1)}>
              <Button
                leftIcon={
                  <Icon viewBox="0 0 384 512" color={"red.600"}>
                    <path
                      fill="currentColor"
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    />
                  </Icon>
                }
                colorScheme={"red"}
                variant={"outline"}
                backgroundColor={"white"}
                fontWeight={500}
              >
                Cancel Order
              </Button>
            </ChakraLink>

            <Button
              leftIcon={
                <Icon viewBox="0 0 448 512" color={"white"}>
                  <path
                    fill="currentColor"
                    d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                  />
                </Icon>
              }
              colorScheme={"aclean"}
              backgroundColor={"aclean.500"}
              textColor={"white"}
              fontWeight={500}
              onClick={handleOrder}
            >
              Save Order
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>
      <FooterBar />
    </Box>
  );
};
