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
        <label className="block mb-1 text-sm font-medium">Street Address</label>
        <input
          {...register('street', { required: 'La dirección es obligatoria' })}
          type="text"
          placeholder="123 Main St"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.street ? 'border-red-500' : ''
          }`}
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">City</label>
        <input
          {...register('city', { required: 'La ciudad es obligatoria' })}
          type="text"
          placeholder="City"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.city ? 'border-red-500' : ''
          }`}
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Zip Code</label>
        <input
          {...register('zip', {
            required: 'El código postal es obligatorio',
            pattern: {
              value: /^\d{5}$/,
              message: 'Debe tener 5 dígitos'
            }
          })}
          type="text"
          placeholder="00000"
          className={`w-full px-3 py-2 border rounded-md ${
            errors.zip ? 'border-red-500' : ''
          }`}
        />
        {errors.zip && (
          <p className="text-red-500 text-sm mt-1">{errors.zip.message}</p>
        )}
      </div>
    </div>
  )
}
