export const isIOS = () => {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

export const isSafari = () => {
  if (typeof navigator === 'undefined') return false
  // eslint-disable-next-line no-useless-escape
  return !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
}

export const isMobileSafari = () => {
  if (typeof navigator === 'undefined') return false
  return isIOS() && isSafari()
}
