export function Account({account, connect}) {
  return (<>
    {!account ? (
      <button className="button__account-connect" onClick={connect}>
        Connect Metamask to submit your score
      </button>
    ):
    <span>Account: {account}</span>})
  </>)
}