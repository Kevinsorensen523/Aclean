import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PaymentContract from "./PaymentContract.json"; // Adjust the path if necessary

function App() {
  const [accounts, setAccounts] = useState([]);
  const [accountBalances, setAccountBalances] = useState({});
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    loadWeb3();
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      loadBlockchainData();
    }
  }, [selectedAccount]);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      console.log("Web3 instance initialized with MetaMask");
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("Web3 instance initialized with web3 provider");
    } else {
      window.alert("Non-Ethereum browser detected. Consider trying MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts:", accounts);
    setAccounts(accounts);

    // Fetch and set balance for each account
    const balances = {};
    for (let account of accounts) {
      const balance = await web3.eth.getBalance(account);
      balances[account] = web3.utils.fromWei(balance, "ether");
    }
    setAccountBalances(balances);

    const networkId = await web3.eth.net.getId();
    console.log("Network ID:", networkId);
    const networkData = PaymentContract.networks[networkId];
    if (networkData) {
      const paymentContract = new web3.eth.Contract(
        PaymentContract.abi,
        networkData.address
      );
      setContract(paymentContract);
      console.log("Contract instance:", paymentContract);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setSelectedAccount(accounts[0]);
        console.log("MetaMask account connected:", accounts[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      window.alert("Please install MetaMask!");
    }
  };

  const disconnectMetaMask = () => {
    setAccounts([]);
    setAccountBalances({});
    setSelectedAccount(null);
    setContract(null);
    setBalance("");
    setAmount("");
    console.log("MetaMask disconnected");
  };

  const getBalance = async () => {
    try {
      const bal = await contract.methods.getBalance().call();
      setBalance(bal);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const depositEther = async () => {
    try {
      await contract.methods
        .deposit()
        .send({
          from: selectedAccount,
          value: Web3.utils.toWei(amount, "ether"),
        });
      alert("Deposit successful!");
    } catch (error) {
      console.error("Error depositing ether:", error);
    }
  };

  return (
    <div>
      <h1>Payment Contract</h1>
      {selectedAccount ? (
        <div>
          <p>Connected Account: {selectedAccount}</p>
          <button onClick={getBalance}>Check Contract Balance</button>
          <p>Contract Balance: {balance}</p>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
          />
          <button onClick={depositEther}>Deposit Ether</button>
          <button onClick={disconnectMetaMask}>Disconnect MetaMask</button>
        </div>
      ) : (
        <button onClick={connectMetaMask}>Connect MetaMask</button>
      )}
      <h2>All Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account}>
            {account} - {accountBalances[account]} ETH
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
