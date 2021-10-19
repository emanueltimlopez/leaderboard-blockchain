import { useEffect, useState } from "react";
import { runGame } from "./game";

export function Game({ onFinish }) {
  const [play, setPlay] = useState(false)

  useEffect(() => {
  }, [])

  const onPlayHandler = () => {
    setPlay(true)
    runGame(onFinish)
  }

  return (
    <>
      <canvas id="game" width="480" height="320"></canvas>
      {!play && <button onClick={onPlayHandler}>Play Game</button>}
    </>
  )
}