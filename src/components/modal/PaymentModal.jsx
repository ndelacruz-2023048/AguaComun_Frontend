import React, { useEffect } from 'react'
import { defineStepper } from '@stepperize/react'
import { useForm, FormProvider } from 'react-hook-form'
import { PaymentStep } from './PaymentSteps/PaymentStep'
import { AddressStep } from './PaymentSteps/AddressStep'

const { useStepper } = defineStepper(
  { id: 'payment', title: 'Payment' },
  { id: 'address', title: 'Address' }
)

export const PaymentModal = ({ onClose }) => {
  const stepper = useStepper()
  const methods = useForm({ mode: 'onChange' })
  const { handleSubmit, reset } = methods

  // Resetear stepper y formulario al abrir el modal
  useEffect(() => {
    stepper.reset()   // Vuelve al primer paso
    reset()           // Limpia el formulario
  }, [])

  const onSubmit = (data) => {
    if (stepper.isLast) {
      console.log('Datos enviados:', data)
      onClose()
    } else {
      stepper.next()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Donation - {stepper.current.title}</h2>
          <button onClick={onClose} className="text-gray-600 text-xl">&times;</button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {stepper.switch({
              payment: () => <PaymentStep />,
              address: () => <AddressStep />,
            })}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
                className="bg-[#d7ad2c] text-white px-4 py-2 rounded-[20px] hover:bg-[#bb9525] "
              >
                Atrás
              </button>
              <button
                type="submit"
                className="bg-[#75bf3b] text-white px-4 py-2 rounded-[20px] hover:bg-[#61a82b]"
              >
                {stepper.isLast ? 'Confirmar' : 'Siguiente'}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}