/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "b083b945bb576267638ac9a251fd783417cfd501a9c6f793dc9ca6a190461d00"
      ]
    }
  },
};
