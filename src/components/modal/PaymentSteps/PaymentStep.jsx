import React from 'react'
import { useFormContext } from 'react-hook-form'

export const PaymentStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()

  const selectedMethod = watch('paymethod')

  const selectMethod = (method) => {
    setValue('paymethod', method, { shouldValidate: true })
  }

  return (
    <div className="space-y-4">

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

      <div>
        <label className="block mb-1 text-sm font-medium">Payment Method</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => selectMethod('Efectivo')}
            className={`px-4 py-1 border rounded-md ${
              selectedMethod === 'Efectivo' ? 'bg-green-200' : ''
            }`}
          >
            Efectivo
          </button>
          <button
            type="button"
            onClick={() => selectMethod('Cheque')}
            className={`px-4 py-1 border rounded-md ${
              selectedMethod === 'Cheque' ? 'bg-green-200' : ''
            }`}
          >
            Cheque
          </button>
        </div>
        
        <input
          type="hidden"
          {...register('paymethod', {
            required: 'El método de pago es obligatorio',
          })}
        />
        {errors.paymethod && (
          <p className="text-red-500 text-sm mt-1">
            {errors.paymethod.message}
          </p>
        )}
      </div>


      {selectedMethod === 'Cheque' && (
        <div>
          <label className="block mb-1 text-sm font-medium">Número de cheque</label>
          <input
            type="number"
            placeholder="123456789"
            className={`w-full px-3 py-2 bg-green-50 border rounded-md ${
              errors.bankcheck ? 'border-red-500' : ''
            }`}
            {...register('bankcheck', {
              required: 'El número de cheque es obligatorio',
            })}
          />
          {errors.bankcheck && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bankcheck.message}
            </p>
          )}
        </div>
      )}


      <div className="flex items-center gap-2">
        <input type="checkbox" id="recurring" {...register('recurring')} />
        <label htmlFor="recurring" className="text-sm">
          Hacer donación recurrente
        </label>
      </div>
    </div>
  )
}
