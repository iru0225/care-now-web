import { Label, Option, Select } from "./styled"

type OptionValueType = {
  value: string
  label: string
}

interface MultiSelectProps {
  id: string
  label: string
  values: OptionValueType[]
  options: OptionValueType[]
  placeholder: string
  onChange: ({ value, label}: OptionValueType, id: string) => void
}

const MultiSelect = ({
  id,
  label,
  values,
  options,
  placeholder,
  onChange
}: MultiSelectProps) => {

  const handleChange = (event: React.ChangeEvent) => {
    event.preventDefault()
    const { value } = event.target as HTMLOptionElement
    const selectedData = options.find(({ value: optionValue }) => optionValue === value)
    selectedData && onChange(selectedData, id)
  }

  return(
    <Label>
      <p className="text-left">{label}</p>
      <div className={`flex flex-wrap gap-4 ${values.length > 0 ? 'my-4' : ''}`}>
        {
          values.map((item) => (
            <button
              key={`${item.value}-${item.label}`}
              className="w-fit px-4 py-2 rounded border-0 bg-[#0c83c7] text-white"
              onMouseDown={() => onChange({...item}, id)}
            >
              {item.label}
            </button>
          ))
        }
      </div>
      <Select
        onChange={(e: React.ChangeEvent) => handleChange(e)}
        value=''
        id={id}
      >
        <Option>{placeholder}</Option>
        {
          options.map((item) => (
            <Option
              key={item.value}
              value={item.value}
              {
                ...(values.find(({value}) => value === item.value) ? { selected: true } : null)
              }
            >
              {item.label}
            </Option>
          ))
        }
      </Select>
    </Label>
  )
}

export default MultiSelect