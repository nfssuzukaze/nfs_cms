import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const formatUTC = (
  utcTime: string,
  formatStr = 'YYYY-MM-DD HH:mm:ss'
): string => {
  const ans = dayjs.utc(utcTime).utcOffset(8).format(formatStr)
  return ans
}
