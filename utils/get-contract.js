import { ethers } from 'ethers'
import abi from './Leaderboard.json'

const contractAddress = "0x25c0E39A645792643F7a5A389Bf12c5a63243D5B"
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