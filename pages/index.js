import Head from 'next/head'
import Image from 'next/image'
import { ethers } from 'ethers'
import { useState } from 'react'
import { useWallet } from '../hooks/useWallet'
import styles from '../styles/Home.module.css'
import { Game } from '../components/game'
import { Account } from '../components/account'
import { Table } from '../components/table'
import { getContract } from '../utils/getContract'

export default function Home() {
  const { account, connect } = useWallet()
  const [ mining, setMining ] = useState(false)

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
        <Game onFinish={onFinishHandler} />
        {mining && <p>Mining...</p>}
        <Table account={account}/>
      </main>
    </div>
  )
}
