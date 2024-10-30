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

export const padStart = (value: string | number, length: number): string => {
  return String(value).padStart(length, '0')
}

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  if (hours > 0) {
    return `${padStart(hours, 2)}:${padStart(minutes, 2)}:${padStart(seconds, 2)}`
  } else {
    return `${padStart(minutes, 2)}:${padStart(seconds, 2)}`
  }
}
