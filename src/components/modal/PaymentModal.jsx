import React, { useState } from 'react'
import { defineStepper } from '@stepperize/react'

// Definimos los pasos del stepper
const Stepper = defineStepper(
  { id: 'payment', title: 'Payment' },
  { id: 'address', title: 'Address' }
)

export const PaymentModal = () => {
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Donation</h2>
          <button onClick={() => setOpen(false)} className="text-gray-600 text-xl">&times;</button>
        </div>

        <Stepper.Provider>
          <Stepper.Step id="payment">
            <PaymentStep onCancel={() => setOpen(false)} />
          </Stepper.Step>
          <Stepper.Step id="address">
            <AddressStep />
          </Stepper.Step>
        </Stepper.Provider>
      </div>
    </div>
  )
}

const PaymentStep = ({ onCancel }) => {
  const { next } = Stepper.useStepper()

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Donation Amount</label>
        <input
          type="number"
          placeholder="$0.00"
          className="w-full px-3 py-2 bg-green-50 border rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Payment Method</label>
        <div className="flex gap-2">
          <button className="px-4 py-1 border rounded-md">Efectivo</button>
          <button className="px-4 py-1 border rounded-md">Cheque</button>
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">
          Cheque (Si elige la opción de Cheque)
        </label>
        <input
          type="text"
          placeholder="123456789"
          className="w-full px-3 py-2 bg-green-50 border rounded-md"
        />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="recurring" />
        <label htmlFor="recurring" className="text-sm">Make this a recurring donation</label>
      </div>

      <div className="flex justify-between">
        <button onClick={onCancel} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Cancel</button>
        <button onClick={next} className="bg-green-600 text-white px-4 py-2 rounded-md">Next</button>
      </div>
    </div>
  )
}

const AddressStep = () => {
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
