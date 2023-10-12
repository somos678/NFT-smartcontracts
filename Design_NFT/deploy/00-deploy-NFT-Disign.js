const { network } = require("hardhat")
//const { getAccount } = require("../../helpers");
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("----------------------------------------------------")
    log("Deploying nft and waiting for confirmations...")
    const nft = await deploy("Design_NFT", {
        from: deployer,
        args: ["Design_NFT",
        "Door-Collection",
        "ipfs://QmbRbNi5iBb3CPUFen9BZxcMmgLtniZ2W3eeHBtEqhsWSe/"],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Design_NFT deployed at ${nft.address}`)

    if (
       process.env.ETHERSCAN_API_KEY) {
        await verify(nft.address, ["Design_NFT",
        "Door-Collection",
        "ipfs://QmbRbNi5iBb3CPUFen9BZxcMmgLtniZ2W3eeHBtEqhsWSe/"])
    }
}

module.exports.tags = ["all", "Design_NFT"]