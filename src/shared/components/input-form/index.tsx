import { Dispatch, SetStateAction, useState } from "react"
import Input from "../input"
import MultiSelect from "../multi-select"
import { mockMedications, mockTreatments } from "../../mocks"
import { SubmitButton } from "./styled"

type OptionType = {
  value: string
  label: string
}

type FormValueType = {
  name: string
  id: string
  date: string
  cost: string
  treatments: {
    value: string
    label: string
  }[]
  medications: {
    value: string
    label: string
  }[]
}

interface InputFormProps {
  onResetForm: Dispatch<SetStateAction<boolean>>
}

const InputForm = ({
  onResetForm
}: InputFormProps) => {
  const [value, setValue] = useState<FormValueType>({
    name: '',
    id: '',
    date: '',
    treatments: [],
    medications: [],
    cost: '',
  })

  const handleChange = (val: string | OptionType, id: string) => {
    const fieldId = id.split('-')[1]

    if (fieldId) {
      if (fieldId === 'medications' && typeof val === 'object') {
        const existing = value.medications.find(data => data.value === val.value)
        if (existing) {
          return setValue((prevData) => ({
            ...prevData,
            medications: [...prevData.medications.filter(({ value }) => value !== val.value)]
          }))
        }

        return setValue((prevData) => ({
          ...prevData,
          medications: [
            ...prevData.medications,
            {...val}
          ]
        }))
      }

      if (fieldId === 'treatments' && typeof val === 'object') {
        const existing = value.treatments.find(data => data.value === val.value)
        if (existing) {
          return setValue((prevData) => ({
            ...prevData,
            treatments: [...prevData.treatments.filter(({ value }) => value !== val.value)]
          }))
        }
        return setValue((prevData) => ({
          ...prevData,
          treatments: [
            ...prevData.treatments,
            {...val}
          ]
        }))
      }

      if (fieldId === 'id' && typeof val === 'string') {
        const regex = /[a-zA-Z0-9]+$/
        if (val && !val.match(regex)) return
      }
      
      return setValue((prevData) => (
        {
          ...prevData,
          [fieldId]: val
        }
      ))
    }
  }

  const handleClick = async () => {
    const {
      id: patientId,
      date: treatmentDate,
      ...restData
    } = value

    const reqBody = {
      patientId,
      treatmentDate,
      ...restData,
      cost: Number(restData.cost)
    }

    try {
      await fetch('http://localhost:9000/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      })
      onResetForm(false)
    } catch (error) {
      alert('Something went wrong')
    }
  }

  return(
    <>
      <h1>Patient Form</h1>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="patient-name"
            label="Patient name"
            onChange={handleChange}
            value={value.name}
          />
          <Input
            id="patient-id"
            label="Patient ID"
            onChange={handleChange}
            value={value.id}
          />
        </div>
        <Input
          id="treatment-date"
          label="Patient name"
          onChange={handleChange}
          value={value.date}
          type="date"
        />
        <MultiSelect
          id="patient-treatments"
          label="Treatment description"
          onChange={handleChange}
          options={mockTreatments}
          placeholder="Please select the treatment"
          values={value.treatments}
        />
        <MultiSelect
          id="patient-medications"
          label="Medications prescribed"
          onChange={handleChange}
          options={mockMedications}
          placeholder="Please select the medication"
          values={value.medications}
        />
        <Input
          id="treatment-cost"
          label="Treatment cost"
          onChange={handleChange}
          value={value.cost}
          type="number"
        />
        <SubmitButton
          onClick={handleClick}
          disabled={!value.cost || !value.date || !value.id || !value.name || value.medications.length === 0 || value.treatments.length === 0}
        >
          Submit
        </SubmitButton>
      </div>
    </>
  )
}

export default InputForm