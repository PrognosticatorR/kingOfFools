import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import { HardhatUserConfig } from "hardhat/config"
import secretDevelopment from "./secret.development.json"
import secretTestnet from "./secret.testnet.json"

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: { mnemonic: secretDevelopment.mnemonic },
    },
    development: {
      accounts: { mnemonic: secretDevelopment.mnemonic },
      url: "http://localhost:7545",
    },
    "testnet-eth": {
      accounts: { mnemonic: secretTestnet.mnemonic },
      url: "https://goerli.infura.io/v3/<Your_Api_key>",
      chainId: 5,
    },
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  namedAccounts: {
    deployer: {
      default: 3, // here this will by default take the first account as deployer
      testnet: 3,
    },
    signer: {
      default: 4, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      testnet: 4,
    },
  },
}

export default config
