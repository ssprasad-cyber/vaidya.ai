// src/pages/AIPredictions.jsx
import { useState } from 'react'
import axios from 'axios'

export default function AIPredictions() {
  const [formData, setFormData] = useState({
    age: '',
    bloodPressure: '',
    cholesterol: '',
    bmi: '',
  })
  const [prediction, setPrediction] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/predict', formData)
      setPrediction(response.data.prediction)
    } catch (error) {
      console.error('Prediction error:', error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Health Predictions</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Blood Pressure</label>
          <input
            type="number"
            name="bloodPressure"
            value={formData.bloodPressure}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Cholesterol</label>
          <input
            type="number"
            name="cholesterol"
            value={formData.cholesterol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Predict Health Risk
        </button>
      </form>

      {prediction && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Prediction Result</h2>
          <p className="mt-2">
            {prediction === 'high'
              ? 'High risk of hospitalization based on inputs'
              : 'Low risk of hospitalization based on inputs'}
          </p>
        </div>
      )}
    </div>
  )
}