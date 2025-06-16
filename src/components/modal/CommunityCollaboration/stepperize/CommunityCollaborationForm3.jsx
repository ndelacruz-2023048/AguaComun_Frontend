import { Select, TimePicker } from 'antd'
import React, { use, useState } from 'react'
import { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSocket } from '../../../../hooks/useSocket'

export const CommunityCollaborationForm3 = () => {

  const {register,formState:{errors},control} = useFormContext()
  const [listCommunity,setListCommunity] = useState([])
  const socket = useSocket()


  useEffect(()=>{
    socket.emit("get-list-communities")
    socket.on("list-communities",(data)=>{
      setListCommunity(data)
    })
  },[])

  const listCommunityOptions = listCommunity.map((community)=>({
    value:community._id,
    label:community.name
  }))
  
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <p className='text-sm font-medium text-start'>Direction</p>
        <textarea type="text" placeholder='Direction'  className='w-full focus:outline-none border-1 border-gray-300 rounded-md p-2' {...register('direction',{required:"Direction is required"})}/>
        {errors.direction && <p className='text-red-500'>{errors.direction.message}</p>}
      </div>
      <div>
        <p className='text-sm font-medium text-start'>Durantion Turn</p>
        <Controller
            name="durationTurn"
            control={control}
            rules={{required:"Duration Turn is required"}}
            render={({field, fieldState:{error}})=>(
              <div>
                <TimePicker value={field.value} onChange={(date)=>field.onChange(date)}/>
                {error && <p className='text-red-500'>{error.message}</p>}
              </div>
            )}
          />
      </div>
      <div>
        <Controller
            name="communityId"
            control={control}
            rules={{required:"Community is required"}}
            render={({field})=>(
            <Select
              style={{ width: '100%' }}
              placeholder="Select a community"
              options={listCommunityOptions}
                /*
                listCommunity
                */
              value={field.value}
              onChange={(value)=>field.onChange(value)}
            />
          )}
        />
      </div>
    </div>
  )
}
