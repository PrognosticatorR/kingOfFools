import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { injected } from "./wallet/connectors"

const style = {
  wrapper: `w-screen flex justify-between items-center text-white bg-[#20242A]`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex  items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeNavItem: `bg-[#20242A]`,
  buttonsContainer: `flex w-1/4 justify-end items-center`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
}

export const Header = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
      localStorage.setItem("isWalletConnected", true)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
      localStorage.setItem("isWalletConnected", false)
    } catch (ex) {
      console.log(ex)
    }
  }
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected)
          localStorage.setItem("isWalletConnected", true)
        } catch (ex) {
          console.log(ex)
        }
      }
    }
    connectWalletOnPageLoad()
  }, [activate])

  return (
    <div className={style.wrapper}>
      <div className={style.nav}>
        <div className={style.navItemsContainer}>
          <div className={`${style.navItem} ${style.activeNavItem}`}>King Of Fools</div>
        </div>
      </div>
      <div className={style.buttonsContainer}>
        <div className={`${style.button} ${style.buttonPadding}`}>
          <p>Ethereum</p>
          <div className={style.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {active ? (
          <>
            <div className={`${style.button} ${style.buttonPadding}`}>
              <div className={style.buttonTextContainer}>{account}</div>
            </div>
            <div onClick={disconnect} className={`${style.button} ${style.buttonPadding}`}>
              <div className={`${style.buttonAccent} ${style.buttonPadding}`}>Logout</div>
            </div>
          </>
        ) : (
          <div onClick={connect} className={`${style.button} ${style.buttonPadding}`}>
            <div className={`${style.buttonAccent} ${style.buttonPadding}`}>Connect Wallet</div>
          </div>
        )}
      </div>
    </div>
  )
}
