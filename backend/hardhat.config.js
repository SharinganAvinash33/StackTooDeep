require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const SEPOLIA_URL = process.env.SEPOLIA_URL; // Your Sepolia RPC URL
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Your MetaMask private key

module.exports = {
  solidity: "0.8.28", // Or your Solidity version
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      gas: 1,
      gasPrice: 8
    }
  },
};