import { ethers } from 'ethers'
import abi from './Leaderboard.json'

const contractAddress = "0x420AFC9Bc788bA6c147E4fD9f72DDc46995fa0AF"
const contractABI = abi.abi

export function getContract() {
  try {
    const { ethereum } = window
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      return new ethers.Contract(contractAddress, contractABI, signer)
    }
  } catch (error) {
    console.log(error)
  }
}