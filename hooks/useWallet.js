import { useEffect, useState } from "react"

export function useWallet(){
  const [currentAccount, setCurrentAccount] = useState(null)

  useEffect(() => {
    const retrieveWallet = async () => {
      if (walletAvailable()) {
        const account = await getWallet()
        setCurrentAccount(account)
      }
    }

    retrieveWallet()
  }, [])

  const walletAvailable = () => {
    const { ethereum } = window

    if (!ethereum) {
      return false;
    }
    return true
  }

  async function getWallet() {
    try {
      const { ethereum } = window

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        return accounts[0]
      }
      return null
    } catch (error) {
      console.log(error)
    }
  }

  async function connectWallet() {
    try {
      if (!walletAvailable()) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  return {
    account: currentAccount,
    connect: connectWallet
  }
}