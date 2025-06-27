import React from 'react'
import { useFormContext } from 'react-hook-form'

export const CommunityCollaborationForm1 = () => {

  const {register,formState:{errors}} = useFormContext()
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-start">
          Nombre de la actividad
        </label>
        <input id="name" placeholder="Nombre de la actividad" className="w-full focus:outline-none border-1 border-gray-300 rounded-md p-2" {...register('name',{required:"El nombre de la actividad es requerido"})}/>
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="address" className="text-sm font-medium text-start">
          Descripción
        </label>
        <textarea
          id="address"
          placeholder="Ayuda a la comunidad"
          className="w-full focus:outline-none border-1 border-gray-300 rounded-md p-2"
          {...register('description',{required:"La descripción es requerida"})}
        />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>
    </div>
  )
}
