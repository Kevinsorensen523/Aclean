import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Button,
  Icon,
  Stack,
  Card,
  CardBody,
  Input,
  Text,
  Textarea,
  Flex,
  ButtonGroup,
  Link as ChakraLink,
  Select,
} from "@chakra-ui/react";
import { NavigationBar } from "../components/NavigationBar";
import { FooterBar } from "../components/FooterBar";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import ServiceContract from "./../contracts/ServiceContract.json";

export const NewService = () => {
  let history = useNavigate();
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("");

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
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  const addService = async () => {
    if (!contract) {
      console.error("Smart contract not loaded.");
      return;
    }

    await contract.methods
      .addService(
        logo,
        name,
        category,
        addressDetail,
        phoneNumber,
        email,
        cost,
        currency
      )
      .send({ from: account });
    alert("Service added successfully!");
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
                  Logo
                </Text>
                <Input
                  type={"file"}
                  placeholder="John Doe"
                  onChange={(e) => setLogo(e.target.value)}
                />
              </Stack>

              <Stack spacing={"-3"}>
                <Text
                  fontSize={"xl"}
                  fontFamily={"heading"}
                  fontWeight={700}
                  fontStyle={"italic"}
                >
                  Service Name
                </Text>
                <Input
                  type={"text"}
                  placeholder="John Doe Service"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Stack>

              <Stack spacing={"-3"}>
                <Text
                  fontSize={"xl"}
                  fontFamily={"heading"}
                  fontWeight={700}
                  fontStyle={"italic"}
                >
                  Service Category
                </Text>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option style={{ backgroundColor: "#00A991" }}>
                    Select Category...
                  </option>
                  <option
                    value="Cuci AC"
                    style={{ backgroundColor: "#00A991" }}
                  >
                    Cuci AC
                  </option>
                  <option
                    value="Tambah Freon"
                    style={{ backgroundColor: "#00A991" }}
                  >
                    Tambah Freon
                  </option>
                  <option
                    value="Pasang AC"
                    style={{ backgroundColor: "#00A991" }}
                  >
                    Pasang AC
                  </option>
                </Select>
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
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
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

              <Stack spacing={"-3"}>
                <Text
                  fontSize={"xl"}
                  fontFamily={"heading"}
                  fontWeight={700}
                  fontStyle={"italic"}
                >
                  Cost Service
                </Text>
                <Flex direction={"row"} gap={2}>
                  <Input
                    type={"number"}
                    placeholder="10"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                  <Select
                    width={"max-content"}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option style={{ backgroundColor: "#00A991" }}>
                      Select Currency...
                    </option>
                    <option value="USD" style={{ backgroundColor: "#00A991" }}>
                      USD
                    </option>
                    <option value="ETH" style={{ backgroundColor: "#00A991" }}>
                      ETH
                    </option>
                    <option value="EUR" style={{ backgroundColor: "#00A991" }}>
                      EUR
                    </option>
                  </Select>
                </Flex>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        <Flex paddingTop={4} gap={2} justifyContent={"center"}>
          <ButtonGroup>
            <ChakraLink
              onClick={() => {
                history(-1);
              }}
            >
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
                Cancel Service
              </Button>
            </ChakraLink>

            <Button
              onClick={addService}
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
            >
              Save Service
            </Button>
          </ButtonGroup>
        </Flex>
      </Container>

      <FooterBar />
    </Box>
  );
};
