import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

interface Props {
  time: string
}

export function TimerDash({ time }: Props) {
  dayjs.locale(ptBr)
  return (
    <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-100">
      {dayjs(time).format('D[ de ]MMMM[, ]YYYY')}
    </time>
  )
}
