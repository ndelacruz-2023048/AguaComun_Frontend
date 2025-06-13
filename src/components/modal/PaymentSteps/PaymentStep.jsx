import React from 'react'
import { defineStepper } from '@stepperize/react'

const Stepper = defineStepper()

export const PaymentStep = ({ onCancel }) => {
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
        <label className="block mb-1 text-sm font-medium">Cheque (Si elige la opción de Cheque)</label>
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