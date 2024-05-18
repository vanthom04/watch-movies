export const detectDeviceType = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop'
}

export const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
