import { useEffect, useState } from 'react';
import './App.css';
import InputForm from './shared/components/input-form';
import { useAsync } from 'react-async';
import { DateTime } from 'luxon'
import axios from 'axios'

interface DataType {
  cost: number
  patientId: string
  name: string
  medications: {
    label: string
    value: string
  }[]
  treatments: {
    label: string
    value: string
  }[]
  treatmentDate: string
}

function App() {
  const [showForm, setShowForm] = useState(false)
  const [patientData, setPatientData] = useState<DataType[]>([])

  const fetchData = async () => {
    try {
      const response: {[_key: string]: any} = await axios('http://localhost:9000/patient', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      setPatientData(() => response.data.data)
    } catch (error) {
      setPatientData(() => [])
    }
  }

  useEffect(() => {
    fetchData()
  }, [showForm])

  const generateDate = (date: string) => {
    return DateTime.fromISO(new Date(date).toISOString()).toLocaleString(DateTime.DATE_FULL)
  }
  return (
    <div className="App w-[67%] mx-auto">
      <button
        onClick={() => setShowForm((prevState) => !prevState)}
        className={`block border-0 rounded px-2 py-2 ${showForm ? 'bg-[#DD0612]' : 'bg-[#42b983]'} text-white mt-6`}
      >
        {
          showForm ? 'Back' : 'Add Patient'
        }
      </button>
      {
        showForm ? (
          <InputForm onResetForm={setShowForm}/>
        ) : (
          <table className='w-full mt-[54px]'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Treatment Date</th>
                <th>Treatments</th>
                <th>Medications</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {
                patientData?.map((item, idx) => (
                  <tr key={`${item.patientId}-${idx}`}>
                    <td>{item.patientId}</td>
                    <td>{item.name}</td>
                    <td>{generateDate(item.treatmentDate)}</td>
                    <td>
                      {
                        item.treatments.map((treatment, idx) => (
                          <div
                            key={`${item.patientId}-${treatment.value}`}
                          >
                            {treatment.label}
                          </div>
                        ))
                      }
                    </td>
                    <td>
                      {
                        item.medications.map((medication, idx) => (
                          <div
                            key={`${item.patientId}-${medication.value}`}
                          >
                            {medication.label}
                          </div>
                        ))
                      }
                    </td>
                    <td>{item.cost}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
