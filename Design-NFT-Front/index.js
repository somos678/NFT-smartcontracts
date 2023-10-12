import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const mintButton = document.getElementById("mintButton")
const baseuriButton = document.getElementById("baseuriButton")
const setbaseuriButton = document.getElementById("setbaseuriButton")





connectButton.onclick = connect
setbaseuriButton.onclick = setbaseuri
mintButton.onclick = mintt
baseuriButton.onclick = baseURI

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      console.log(error)
      document.getElementById("wallet-address").textContent = error
    }
    connectButton.innerHTML = "Connected"
    const accounts = await ethereum.request({ method: "eth_accounts" })
    const account = accounts[0]
    console.log(accounts)
    document.getElementById("wallet-address").textContent = "Connected  "+account.substring(0, 5) + "..." + account.substring(37, 42)
  } else {
    connectButton.innerHTML = "Please install MetaMask"
    document.getElementById("wallet-address").textContent ="Please install MetaMask"
  }
}

async function setbaseuri() {
  const baseuri = document.getElementById("setbaseuri").value
  console.log(`Sending with ${baseuri}...`)
  document.getElementById("uriset").textContent = `Base uri Set ${baseuri}...`
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.setBaseURI(
        baseuri)
      await listenForTransactionMine(transactionResponse, provider)
      console.log("Done")
      document.getElementById("uriset").textContent = `set new uri  ${uriset}    Done`
  } catch (error) {
      console.log(error)
      document.getElementById("uriset").textContent = error
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask"
    document.getElementById("uriset").textContent ="Please install MetaMask"
  }
  }
  async function mintt() {
    const sendAddress = document.getElementById("receiver").value
    const mintamount = document.getElementById("mintamount").value
    console.log(`Sending with ${mintamount}...`)
    document.getElementById("sending").textContent = `Mint amount ${mintamount}...`
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.mint(
          sendAddress , mintamount
        )
        await listenForTransactionMine(transactionResponse, provider)
        console.log("Done")
        document.getElementById("sending").textContent = `Mint amount  ${mintamount}    Done`
    } catch (error) {
        console.log(error)
        document.getElementById("sending").textContent = error
      }
    } else {
      fundButton.innerHTML = "Please install MetaMask"
      document.getElementById("sending").textContent ="Please install MetaMask"
    }
  }  

  async function baseURI() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const Address = await contract.baseURI()
        console.log(Address)
        document.getElementById("uriset").textContent = "baseURI  "+Address
      } catch (error) {
        console.log(error)
        document.getElementById("uriset").textContent = error
      }
    } else {
      balanceButton.innerHTML = "Please install MetaMask"
      document.getElementById("uriset").textContent = "Please install MetaMask"
    }
  }
  
  
function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}`)
    return new Promise((resolve, reject) => {
        try {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations. `
                )
                resolve()
            })
        } catch (error) {
            reject(error)
        }
    })
}

  



  
  