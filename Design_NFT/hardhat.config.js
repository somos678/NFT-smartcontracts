/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
require("./scripts/mint.js");
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
//require("hardhat-deploy")
require("solidity-coverage")
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.g.alchemy.com/v2/2yt4Y29v01_zGNxX6Lr1TAKX4lXk2ZvH"
const PRIVATE_KEY =
    process.env.ACCOUNT_PRIVATE_KEY ||
    "0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""  
module.exports = {
   solidity: "0.8.19",
   etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable
},
   defaultNetwork: "sepolia",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        ethereum: {
          url: SEPOLIA_RPC_URL,
          accounts: [PRIVATE_KEY],
          chainId: 1,
          blockConfirmations: 6,
      },
        localhost: {
            url: "http://127.0.0.1:8545/",
            //accounts: [PRIVATE_KEY],
            chainId: 31337,
        },
        
    },
}