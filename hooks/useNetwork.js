import { ethers } from "ethers"
import { useEffect, useState } from "react"

export function useNetwork() {
  const [ correctNetwork, setCorrectNetwork ] = useState(false)

  useEffect(() => {
    window.ethereum.on('chainChanged', (network) => {
      if (network === '0x4') {
        setCorrectNetwork(true)
      }
    })

    checkNetwork()
  })

  const checkNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const info = await provider.getNetwork()
    if (info.name !== "rinkeby") {
      setCorrectNetwork(false)
    } else {
      setCorrectNetwork(true)
    }
  }

  return {
    correctNetwork
  }
}