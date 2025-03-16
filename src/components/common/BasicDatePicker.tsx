import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import dayjs, { Dayjs } from "dayjs"

interface BasicDatePickerProps {
  label?: string
  value: Date | null
  onChange: (date: Date | null) => void
}

function BasicDatePicker({ label, value, onChange }: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="YYYY-MM-DD"
        label={label}
        value={value ? dayjs(value) : null}
        slotProps={{ textField: { placeholder: "YYYY-MM-DD" } }}
        onChange={(newValue: Dayjs | null) =>
          onChange(newValue ? newValue.toDate() : null)
        } // Convert Dayjs back to Date
      />
    </LocalizationProvider>
  )
}

export default BasicDatePicker
