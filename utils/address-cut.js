export function AddressCut(addr) {
  return `${addr.substring(0, 6)}... ${addr.substring(addr.length - 6)}`
}