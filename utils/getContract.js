import { ethers } from 'ethers'
import abi from './Leaderboard.json'

const contractAddress = "0xe3ad4E9f8e8ee10A11C10731223D5632227c5C6B"
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