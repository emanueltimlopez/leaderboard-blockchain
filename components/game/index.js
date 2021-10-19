import { useEffect, useState } from "react";
import { runGame } from "./game";
import styles from './Game.module.css'

export function Game({ onFinish }) {
  const [play, setPlay] = useState(false)

  useEffect(() => {
  }, [])

  const onPlayHandler = () => {
    setPlay(true)
    runGame(onFinish)
  }

  return (
    <div className={styles.game__container}>
      <canvas id="game" width="480" height="320"></canvas>
      {!play && <button onClick={onPlayHandler}>Play Game</button>}
    </div>
  )
}