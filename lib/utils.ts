import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function get_time_diff(time: string) {
  const current = Date.now()
  const date = new Date(time)
  if (date.getTime() < current + 259200000) {
    return moment(time).fromNow()
  } else {
    return moment(time).format('L')
  }
}
