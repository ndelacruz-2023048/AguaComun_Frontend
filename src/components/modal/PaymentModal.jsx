import React, { useState } from 'react'
import { defineStepper } from '@stepperize/react'
import { PaymentStep } from './PaymentSteps/PaymentStep.jsx'
import { AddressStep } from './PaymentSteps/AddressStep.jsx'

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

        <Stepper.Scoped>
          <Stepper.Scoped.Step id="payment">
            <PaymentStep onCancel={() => setOpen(false)} />
          </Stepper.Scoped.Step>
          <Stepper.Scoped.Step id="address">
            <AddressStep />
          </Stepper.Scoped.Step>
        </Stepper.Scoped>
      </div>
    </div>
  )
}

