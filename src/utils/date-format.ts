import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 从0时区变为东八区
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
