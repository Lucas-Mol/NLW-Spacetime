import Datepicker from 'react-tailwindcss-datepicker'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'

interface Props {
  selectedDate: {
    startDate: Date | string
    endDate: Date | string
  }
  setSelectedDate: Function
}

export function MemoryDatePicker({ selectedDate, setSelectedDate }: Props) {
  const handleValueChange = (value: DateValueType) => {
    setSelectedDate(value)
  }
  return (
    <Datepicker
      useRange={false}
      asSingle
      primaryColor={'rose'}
      value={selectedDate}
      onChange={handleValueChange}
      showShortcuts={true}
      displayFormat={'DD/MM/YYYY'}
      containerClassName="relative w-46"
    />
  )
}
