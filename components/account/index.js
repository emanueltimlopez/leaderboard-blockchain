import { AddressCut } from '../../utils/address-cut'
import styles from './Account.module.css'

function Address({ account }) {
  return (
    <span className={styles.account__address}>
      {AddressCut(account)}
    </span>
  )
}

export function Account({account, connect}) {
  return (<div className={styles.account__container}>
    <span className={`${styles.account__status} ${account && styles["account__status--connect"]}`}></span>
    {!account ? (
      <button className={styles.account__button} onClick={connect}>
        Connect Wallet
      </button>
    ): <Address account={account}/>}
  </div>)
}