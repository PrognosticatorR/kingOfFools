import { TransactionRequest } from "@ethersproject/providers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { assert, expect } from "chai"
import { ethers } from "hardhat"
import { KingOfFools } from "./../typechain-types/contracts/KingOfFools"

describe("KingOfFools", () => {
  let kingOfFools: KingOfFools
  let accounts: SignerWithAddress[]

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    const KingOfFools = await ethers.getContractFactory("KingOfFools")
    kingOfFools = await KingOfFools.deploy()
    kingOfFools.deployed()
  })

  describe("Transfer Functionality", () => {
    it("Should instentiate the contract", () => {
      expect(kingOfFools.owner()).to.exist
    })
    it("should revert when transaction amount is less then 1.5x", async () => {
      try {
        const tx1: TransactionRequest = {
          to: kingOfFools.address,
          value: ethers.utils.parseEther("2"),
          gasLimit: 150000,
        }
        const tx2: TransactionRequest = {
          to: kingOfFools.address,
          value: ethers.utils.parseEther("2"),
          gasLimit: 150000,
        }
        const transaction1 = await accounts[0].sendTransaction(tx1)
        await transaction1.wait(1)
        const transaction2 = await accounts[1].sendTransaction(tx2)
        await transaction2.wait()
      } catch (error) {
        assert(
          error ==
            "Error: VM Exception while processing transaction: reverted with reason string 'KingOfFools: insuffcient value!'"
        )
      }
    })
    it("should transfer amount to previous sender", async () => {
      const tx1: TransactionRequest = {
        to: kingOfFools.address,
        value: ethers.utils.parseEther("2"),
        gasLimit: 150000,
      }
      const tx2: TransactionRequest = {
        to: kingOfFools.address,
        value: ethers.utils.parseEther("3"),
        gasLimit: 150000,
      }
      const transaction1 = await accounts[0].sendTransaction(tx1)
      await transaction1.wait(1)
      const balanceBefore = await accounts[0].getBalance()
      const transaction2 = await accounts[1].sendTransaction(tx2)
      await transaction2.wait(1)
      const balanceAfter = await accounts[0].getBalance()
      const latestBalance = balanceAfter.sub(ethers.BigNumber.from(transaction2.value))
      expect(latestBalance).to.be.equal(balanceBefore)
    })
  })
})
