import { InputComponent, Label } from "./styled"

interface InputType {
  value: string
  id: string
  label: string
  onChange: (value: string, id: string) => void
  type?: 'text' | 'number' | 'date'
}

const Input = ({
  value,
  id,
  label,
  onChange,
  type
}: InputType) => {
  const handleChange = (event: React.ChangeEvent) => {
    const { value: inputValue } = event.target as HTMLInputElement
    if (type === 'number') {
      const regex = /^(\d)*(\.)?([0-9]{1,3})?$/gm
      if (inputValue.match(regex)) {
        return onChange(inputValue, id)
      }

      return onChange(value, id)
    }
    return onChange(inputValue, id)
  }

  const setTypeInput = (typeData?: 'text' | 'number' | 'date') => {
    if (!typeData || type === 'number') {
      return 'text'
    }

    return typeData
  }

  return(
    <Label>
      <p className="text-left">
        {label}
      </p>
      <InputComponent
        id={id}
        value={value}
        type={setTypeInput(type)}
        onChange={(event) => handleChange(event)}
      />
    </Label>
  )
}

export default Input