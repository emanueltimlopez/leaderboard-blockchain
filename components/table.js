import { useEffect, useState } from "react"
import { getContract } from "../utils/getContract"

export function Table({ account }) {
  const [ scores, setScores ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const scores = await getLeaderboard()
      setScores(scores.map(score => ({
        address: score.addr,
        time: new Date(score.timestamp * 1000),
        points: score.points
      })))
    }

    getData()
  }, [account])

  useEffect(() => {
    getContract().on('NewScore', (points, from, timestamp) => {
      console.log(points, from, timestamp)
      setScores(prevState => [
        ...prevState,
        {
          address: from,
          time: new Date(timestamp * 1000),
          points: points
        }
      ])
    })
  }, [])

  const getLeaderboard = async () => getContract().getLeaderboard()

  const sortedScores = scores ? scores.sort((a, b) => (b.points.toNumber() - a.points.toNumber())) : []

  const getRow = (score) => {
    return `${score.points.toNumber()} - ${score.address} - ${score.time.getFullYear()}/${score.time.getMonth()}/${score.time.getDate()} `
  }

  return (
    <ul>
      {sortedScores.map(score => score && <li key={score.addr+score.points}>
          {getRow(score)}
      </li>)}
    </ul>
  )
}