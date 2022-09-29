import { useWeb3React } from "@web3-react/core"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { SendEth } from "../components/SendEth"
import KingOfFools from "../src/artifacts/contracts/KingOfFools.sol/KingOfFools.json"

export default function Home() {
  const [king, setKing] = useState(null)
  const [contract, setContract] = useState({})
  const [minAmount, setMinAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { library } = useWeb3React()

  useEffect(async () => {
    setLoading(true)
    const instance = new ethers.Contract("0x8EfFd0Ff84e6CA81C393883A58Fe974DE18e4762", KingOfFools.abi, library)
    if (instance && library) {
      const king = await instance.kingOfFools()
      const amountToParticipate = await instance.getMinAmountToParticipate()
      setKing(king)
      setMinAmount(ethers.utils.formatEther(amountToParticipate.toString()).toString())
      setContract(instance)
    }
    setLoading(false)
  }, [library])

  return !loading ? (
    <div className="justify-center">
      <Header />
      {king && (
        <p className="flex justify-center p-4">
          Current King Is:&nbsp; <b>{king}</b>{" "}
        </p>
      )}
      <SendEth contractInstance={contract} minAmountRequired={minAmount} />
    </div>
  ) : (
    <h3 className="justify-center">Loading ....</h3>
  )
}
