import { useEffect, useState } from "react"
import * as timeago from 'timeago.js'
import { getContract } from "../../utils/get-contract"
import { AddressCut } from "../../utils/address-cut"
import styles from './Table.module.css'

export function Table({ account }) {
  const [ scores, setScores ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const scores = await getLeaderboard()
      setScores(scores.map(score => ({
        address: score.addr,
        time: score.timestamp,
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
          time: timestamp,
          points: points
        }
      ])
    })
  }, [])

  const getLeaderboard = async () => getContract().getLeaderboard()

  const sortedScores = scores ? scores.sort((a, b) => (b.points.toNumber() - a.points.toNumber())) : []

  const getRow = (score) => {
    return (<div className={styles.table__row}>
      <span className={styles['table__column--points']}>{score.points.toNumber()}</span>
      <span className={styles['table__column--address']}>{AddressCut(score.address)}</span>
      <span className={styles['table__column--time']}>{timeago.format(new Date(score.time.toNumber()* 1000))}</span>
    </div>)
  }

  return (<>
    <h1>Leaderboard</h1>
    <ul className={styles.table__container}>
      {sortedScores.map(score => score && <li key={score.addr+score.points}>
          {getRow(score)}
      </li>)}
    </ul>
  </>)
}