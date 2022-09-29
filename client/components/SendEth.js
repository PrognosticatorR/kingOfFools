import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useState } from "react"
import { injected } from "./wallet/connectors"

export const SendEth = ({ contractInstance, minAmountRequired }) => {
  console.log(contractInstance)
  const { account, library, activate, connector, chainId } = useWeb3React()
  const [amount, setAmount] = useState(0)
  function handleChange(e) {
    setAmount(e.target.value)
  }
  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem("isWalletConnected", true)
    } catch (ex) {
      console.log(ex)
    }
  }
  async function handleClick(e) {
    e.preventDefault()
    if (!connector) {
      return connect()
    }
    const amountInWei = ethers.utils.parseUnits(amount, "ether")
    const transactionObj = {
      from: account,
      to: contractInstance.address,
      value: amountInWei._hex,
    }
    await window.ethereum.request({ method: "eth_sendTransaction", params: [transactionObj] })
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="w-60">
        {connector && (
          <>
            <label htmlFor="visitors" className="align-center block mb-2 text-sm font-medium  dark:text-gray-300">
              Min amount in Eth: {minAmountRequired}
            </label>
            <input
              onChange={handleChange}
              type="number"
              id="Amount"
              className="bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Please input Amount(ETH)"
              value={amount}
              required
            />
          </>
        )}
        <button
          onClick={handleClick}
          className="bg-gray-200 border border-[#163256] hover:border-[#234169] hover:bg-gray-300 p-2  my-2 rounded-xl flex items-center justify-center text-[#101011] cursor-pointer"
        >
          {connector ? "Send Eth" : "Connect Wallet"}
        </button>
      </div>
    </div>
  )
}
