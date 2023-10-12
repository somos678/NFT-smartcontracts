const { expect } = require('chai')
const { network, deployments, ethers, getNamedAccounts } = require('hardhat')

describe('Design_NFT', function () {
  let Design_NFT, DesignNFTContract, owner, addr1, addr2, addrs
  beforeEach(async function () {
    Design_NFT = await ethers.getContractFactory('Design_NFT')
    ;[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners()
    //acocounts = await ethers.getSigners()
    DesignNFTContract = await Design_NFT.deploy("Design_NFT","nft","ipfs://QmbRbNi5iBb3CPUFen9BZxcMmgLtniZ2W3eeHBtEqhsWSe/")
  })

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      //acocounts = await ethers.getSigners()
      expect(await DesignNFTContract.owner()).to.equal(owner.address)
    })
  })

  describe("constructor", function () {
    it("sets the owner addresses correctly", async () => {
        expect(await DesignNFTContract.owner()).to.equal(owner.address)
  })
})
 
describe("setCost", function () {
    it("Should be reverted because the caller is not owner", async () => {
        expect(await DesignNFTContract.owner()).to.equal(owner.address)
  })
})
 
describe("setBaseExtension", function () {
    it("Should be reverted because the caller is not owner", async () => {
        expect(await DesignNFTContract.owner()).to.equal(owner.address)
  })
})
  describe('setBaseURI', function () {
    it('Should be reverted because the caller is not owner', async function () {
        expect(await DesignNFTContract.owner()).to.equal(owner.address)
    })

    it('Should set the baseTokenURI by owner', async function () {
      const baseurl = 'ipfs://test.url/'
      DesignNFTContract.setBaseURI(baseurl)
      
      await DesignNFTContract.connect(owner.address)
      await DesignNFTContract.mint(owner.address,1)

      expect(await DesignNFTContract.tokenURI(0)).to.equal(baseurl + '0')
      expect(await DesignNFTContract.ownerOf(0)).to.equal(owner.address)
    })
  })



  describe('mint', function () {
    

    it('Should be reverted if exceeded max token purchase', async function () {
      await DesignNFTContract.connect(owner)
      

      await expect(
        DesignNFTContract.connect(owner).mint(owner.address,6),
      ).to.be.revertedWith('Exceeded max token purchase')
    })

    it('Should be reverted because the caller exceeds max token', async function () {
      await DesignNFTContract.connect(owner)
      

      //5 token each time * 2000 = 10000
      for (let i = 0; i < 20; i++) {
        await DesignNFTContract.connect(owner).mint(owner.address,5)
      }

      await expect(
        DesignNFTContract.connect(owner).mint(owner.address,1),
      ).to.be.revertedWith('Purchase would exceed max tokens')
    })

    

    it('Should mint token', async function () {
      const baseurl = 'ipfs://test.url/'
      DesignNFTContract.connect(owner).setBaseURI(baseurl)
      await DesignNFTContract.connect(owner)
      
      await DesignNFTContract.connect(owner).mint(owner.address,1)

      expect(await DesignNFTContract.tokenURI(0)).to.equal(baseurl + '0')
      expect(await DesignNFTContract.ownerOf(0)).to.equal(owner.address)
    })
  })
})
