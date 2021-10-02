require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
//const privateKey = Buffer.from(process.env.MNEMONIC, 'hex');
const menmonic = fs.readFileSync('.secret').toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          menmonic,
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        );
      },
      network_id: "42",
      gas: 5500000,
      confirmations: 2,
      skipDryRun: true
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          menmonic, // Array of account private keys
          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      network_id: 3,
      from: "0x0000000000000000000000000000000000000001",
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}