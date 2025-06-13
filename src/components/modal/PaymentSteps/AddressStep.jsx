import React from 'react'
import { defineStepper } from '@stepperize/react'

const Stepper = defineStepper()

export const AddressStep = () => {
  const { previous } = Stepper.useStepper()

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Street Address</label>
        <input
          type="text"
          placeholder="123 Main St"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">City</label>
        <input
          type="text"
          placeholder="City"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Zip Code</label>
        <input
          type="text"
          placeholder="00000"
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="flex justify-between">
        <button onClick={previous} className="bg-gray-300 px-4 py-2 rounded-md">Back</button>
        <button onClick={() => alert('Enviado')} className="bg-purple-600 text-white px-4 py-2 rounded-md">Enviar</button>
      </div>
    </div>
  )
}