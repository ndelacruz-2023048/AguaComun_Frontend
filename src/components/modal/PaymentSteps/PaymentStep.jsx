import React from 'react'
import { useFormContext } from 'react-hook-form'

export const PaymentStep = () => {
  const { register, setValue, watch } = useFormContext()
  const selectedMethod = watch('paymentMethod')

  const selectMethod = (method) => {
    setValue('paymentMethod', method, { shouldValidate: true })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Donation Amount</label>
        <input
          type="number"
          placeholder="$0.00"
          className="w-full px-3 py-2 bg-green-50 border rounded-md"
          {...register('amount', { required: true, min: 1 })}
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Payment Method</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => selectMethod('efectivo')}
            className={`px-4 py-1 border rounded-md ${selectedMethod === 'efectivo' ? 'bg-green-200' : ''}`}
          >
            Efectivo
          </button>
          <button
            type="button"
            onClick={() => selectMethod('cheque')}
            className={`px-4 py-1 border rounded-md ${selectedMethod === 'cheque' ? 'bg-green-200' : ''}`}
          >
            Cheque
          </button>
        </div>
      </div>

      {selectedMethod === 'cheque' && (
        <div>
          <label className="block mb-1 text-sm font-medium">Número de cheque</label>
          <input
            type="text"
            placeholder="123456789"
            className="w-full px-3 py-2 bg-green-50 border rounded-md"
            {...register('chequeNumber', { required: true })}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <input type="checkbox" id="recurring" {...register('recurring')} />
        <label htmlFor="recurring" className="text-sm">Hacer donación recurrente</label>
      </div>
    </div>
  )
}