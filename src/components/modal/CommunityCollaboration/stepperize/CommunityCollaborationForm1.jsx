import React from 'react'
import { useFormContext } from 'react-hook-form'

export const CommunityCollaborationForm1 = () => {

  const {register,formState:{errors}} = useFormContext()
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-start">
          Name 
        </label>
        <input id="name" placeholder="John Doe" className="w-full focus:outline-none border-1 border-gray-300 rounded-md p-2" {...register('name',{required:"Name of the activity is required"})}/>
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="address" className="text-sm font-medium text-start">
          Description
        </label>
        <textarea
          id="address"
          placeholder="Help to the community"
          className="w-full focus:outline-none border-1 border-gray-300 rounded-md p-2"
          {...register('description',{required:"Description is required"})}
        />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
      </div>
    </div>
  )
}
