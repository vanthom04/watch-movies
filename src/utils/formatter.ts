// formatter
export const formatTime = (time: number): string => {
  const min = Math.floor(time / 60)
  const sec = Math.floor(time % 60)
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
