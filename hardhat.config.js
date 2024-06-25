require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL || "", // Alchemy URL
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};

