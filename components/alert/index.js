import { useEffect } from 'react'
import styles from './Alert.module.css'

export function AlertNetwork() {
  const changeNetworkHandler = () => {
    window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: '0x4' }]
    })
  }

  return (
    <div className={styles.alert__network}>
    <svg x="0px" y="0px" viewBox="0 0 488.419 488.419">
    <path id="XMLID_517_" d="M480.778,366.78L277.816,70.219c-7.265-10.615-19.281-16.978-32.153-17.01
      c-12.864-0.047-24.925,6.238-32.256,16.822L7.788,366.559c-9.264,13.373-10.346,30.791-2.806,45.197
      c7.548,14.422,22.473,23.453,38.746,23.453h400.959c16.227,0,31.111-8.982,38.683-23.328
      C490.935,397.536,489.94,380.167,480.778,366.78z M244.214,400.876c-17.073,0-30.916-13.826-30.916-30.912
      c0-17.09,13.843-30.916,30.916-30.916c17.071,0,30.913,13.826,30.913,30.916C275.127,387.05,261.285,400.876,244.214,400.876z
      M216.707,143.745c7.078-7.697,17.049-12.072,27.506-12.072c10.455,0,20.426,4.375,27.504,12.072
      c7.079,7.696,10.614,17.996,9.736,28.422l-11.749,140.275c-7.816-3.48-16.406-5.501-25.491-5.501
      c-9.087,0-17.676,2.021-25.491,5.501l-11.751-140.275C206.095,161.741,209.63,151.441,216.707,143.745z"/>
    </svg>
      <p>To use the app, you need to <button role='button' onClick={changeNetworkHandler}>switch to the Rinkeby testnet</button></p>
    </div>
  )
}