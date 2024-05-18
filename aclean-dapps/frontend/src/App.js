import Web3 from "web3";
import { useState, useEffect } from "react";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [amount, setAmount] = useState(""); // untuk menyimpan jumlah ETH yang akan ditransfer
  const [recipient, setRecipient] = useState(""); // untuk menyimpan alamat tujuan

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
    } else {
      console.log("Please install MetaMask to use this app.");
    }
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        getBalance(accounts[0], web3);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const getBalance = async (account, web3) => {
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    setBalance(balanceEth);
  };

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      alert("Please enter amount and recipient address!");
      return;
    }

    const web3 = new Web3(window.ethereum);

    try {
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const gasPrice = await web3.eth.getGasPrice();

      // Get the latest block to find the base fee
      const latestBlock = await web3.eth.getBlock("latest");
      const baseFee = latestBlock.baseFeePerGas;
      const maxPriorityFeePerGas = web3.utils.toWei("2", "gwei"); // Set this higher in a high congestion period

      // Calculate maxFeePerGas
      const maxFeePerGas = web3.utils
        .toBN(baseFee)
        .add(web3.utils.toBN(maxPriorityFeePerGas));

      const transactionParameters = {
        from: accounts[0],
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
        gas: 21000, // Standard gas limit for ETH transfer
        maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
        maxFeePerGas: maxFeePerGas.toString(),
      };

      await web3.eth.sendTransaction(transactionParameters);
      alert("Transfer successful!");
      getBalance(accounts[0], web3); // Update balance after transfer
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
      console.log(Web3.version);
    }
  };

  return (
    <div className="App">
      <button onClick={connectMetaMask}>Connect to MetaMask</button>
      {account && (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>
          <input
            type="text"
            placeholder="Amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <button onClick={handleTransfer}>Transfer ETH</button>
        </div>
      )}
    </div>
  );
}

export default App;
