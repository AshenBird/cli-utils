import chalk from 'chalk'

const getTimeText = () => {
  const { green } = chalk
  const date = new Date()
  const timeString = date.toLocaleTimeString()
  const time = ` ${green(timeString)} `
  return time
}

export const log = (info: string) => {
  const { white } = chalk
  console.log(getTimeText(), white(info))
}
export const info = (info: string) => {
  const { gray } = chalk
  console.log(getTimeText(), gray(info))
}
