const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [
        "Design_NFT",
        "Door-Collection",
        "ipfs://QmbRbNi5iBb3CPUFen9BZxcMmgLtniZ2W3eeHBtEqhsWSe/",
      ],
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

module.exports = { verify }