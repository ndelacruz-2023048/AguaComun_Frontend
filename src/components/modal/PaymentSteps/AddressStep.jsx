import React from 'react'
import { useFormContext } from 'react-hook-form'

export const AddressStep = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Dirección</label>
        <input
          {...register('address', { required: 'La dirección es obligatoria' })}
          type="text"
          placeholder="Ej. Calle 123, Ciudad"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.address ? 'border-red-500' : ''
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Fecha</label>
        <input
          {...register('date', { required: 'La fecha es obligatoria' })}
          type="date"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.date ? 'border-red-500' : ''
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>
    </div>
  )
}
