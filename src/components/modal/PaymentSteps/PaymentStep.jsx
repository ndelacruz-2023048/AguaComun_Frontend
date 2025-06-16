import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

export const PaymentStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const selectedMethod = watch('paymentMethod')

  // Registrar manualmente el campo de método de pago con validación
  useEffect(() => {
    register('paymentMethod', {
      required: 'El método de pago es obligatorio',
    })
  }, [register])

  const selectMethod = (method) => {
    setValue('paymentMethod', method, { shouldValidate: true })
  }

  return (
    <div className="space-y-4">
      {/* Monto de donación */}
      <div>
        <label className="block mb-1 text-sm font-medium">Donation Amount</label>
        <input
          type="number"
          placeholder="$0.00"
          className={`w-full px-3 py-2 bg-green-50 border rounded-md ${
            errors.amount ? 'border-red-500' : ''
          }`}
          {...register('amount', {
            required: 'El monto es obligatorio',
            min: {
              value: 1,
              message: 'La donación debe ser de al menos 1 Q',
            },
          })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* Método de pago */}
      <div>
        <label className="block mb-1 text-sm font-medium">Payment Method</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => selectMethod('efectivo')}
            className={`px-4 py-1 border rounded-md ${
              selectedMethod === 'efectivo' ? 'bg-green-200' : ''
            }`}
          >
            Efectivo
          </button>
          <button
            type="button"
            onClick={() => selectMethod('cheque')}
            className={`px-4 py-1 border rounded-md ${
              selectedMethod === 'cheque' ? 'bg-green-200' : ''
            }`}
          >
            Cheque
          </button>
        </div>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-1">
            {errors.paymentMethod.message}
          </p>
        )}
      </div>

      {/* Campo adicional si es cheque */}
      {selectedMethod === 'cheque' && (
        <div>
          <label className="block mb-1 text-sm font-medium">Número de cheque</label>
          <input
            type="text"
            placeholder="123456789"
            className={`w-full px-3 py-2 bg-green-50 border rounded-md ${
              errors.chequeNumber ? 'border-red-500' : ''
            }`}
            {...register('chequeNumber', {
              required: 'El número de cheque es obligatorio',
            })}
          />
          {errors.chequeNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.chequeNumber.message}
            </p>
          )}
        </div>
      )}

      {/* Donación recurrente */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="recurring" {...register('recurring')} />
        <label htmlFor="recurring" className="text-sm">
          Hacer donación recurrente
        </label>
      </div>
    </div>
  )
}
