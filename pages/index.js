import Head from 'next/head'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import { Game } from '../components/game'
import { Account } from '../components/account'
import { Table } from '../components/table'
import { getContract } from '../utils/get-contract'
import styles from '../styles/Home.module.css'
import { AlertNetwork } from '../components/alert'
import { useNetwork } from '../hooks/useNetwork'

export default function Home() {
  const { account, connect } = useWallet()
  const [ mining, setMining ] = useState(false)
  const { correctNetwork } = useNetwork()

  const onFinishHandler = async (score) => {
    const saveTxn = await getContract().saveScore(score, { gasLimit: 300000 })
    setMining(true)
    await saveTxn.wait()
    setMining(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Blockchain Leaderboard</title>
        <meta name="description" content="Blockchain Leaderboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Account account={account} connect={connect} />
      </header>

      <main className={styles.main}>
        {!correctNetwork && <AlertNetwork />}
        <h2>Play a game and save your score on the blockchain</h2>
        <h4 className={styles.subtitle}>50% chance of earning ETH if you upload the score</h4>
        <Game onFinish={onFinishHandler} />
        {mining && <p>Mining...</p>}
        <Table account={account} load={correctNetwork}/>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤ from Buenos Aires</p>
        <p><a href='https://app.buildspace.so'>Buildspace</a> Project</p>
        <p>Game from <a href='https://github.com/end3r/Gamedev-Canvas-workshop'>Github</a></p>
        <p>I&apos;m <a href='https://twitter.com/timbislopez'>@timbislopez</a> on Twitter</p>
      </footer>
    </div>
  )
}
