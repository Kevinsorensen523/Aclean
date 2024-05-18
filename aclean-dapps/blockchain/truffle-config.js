module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 7545, // Standard Ganache port
      network_id: "*", // Match any network ID
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0", // Ensure compatibility with your contract's pragma
    },
  },
};
