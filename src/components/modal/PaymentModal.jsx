import React, { useEffect } from 'react'
import { defineStepper } from '@stepperize/react'
import { useForm, FormProvider } from 'react-hook-form'
import { PaymentStep } from './PaymentSteps/PaymentStep'
import { AddressStep } from './PaymentSteps/AddressStep'
import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

const { useStepper } = defineStepper(
  { id: 'payment', title: 'Payment' },
  { id: 'address', title: 'Address' }
)

export const PaymentModal = ({ campaignId, onClose }) => {
  const stepper = useStepper()
  const methods = useForm({ mode: 'onChange' })
  const { handleSubmit, reset } = methods

  useEffect(() => {
    stepper.reset()
    reset()
  }, [])

  const onSubmit = async (data) => {
    if (stepper.isLast) {
      const payload = {
        ...data,
        campaign: campaignId
      }

      try {
        const res = await axios.post(
          `${API_URL}/v1/aguacomun/payment/payment`,
          payload,
          { withCredentials: true } 
        )

        console.log('Pago guardado:', res.data)
        alert('¡Donación registrada con éxito!')
        onClose()
      } catch (err) {
        console.error('Error al guardar el pago:', err)
        alert('Error al enviar el pago.')
      }
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
                className="bg-[#d7ad2c] text-white px-4 py-2 rounded-[20px] hover:bg-[#bb9525]"
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