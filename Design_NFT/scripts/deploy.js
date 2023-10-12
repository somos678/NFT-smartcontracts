const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");
//const { verify } = require("../utils/verify")

task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
	const account = getAccount();
	console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the Design_NFT.sol contract").setAction(async function (taskArguments, hre) {
	console.log("----------------------------------------------------")
    console.log("Deploying nft and waiting for confirmations...")
	const nftContractFactory = await hre.ethers.getContractFactory("Design_NFT", getAccount());
	const nft = await nftContractFactory.deploy("Design_NFT","Door-Collection","ipfs://QmbRbNi5iBb3CPUFen9BZxcMmgLtniZ2W3eeHBtEqhsWSe/");
	console.log(`Contract deployed to address: ${nft.address}`);
});
