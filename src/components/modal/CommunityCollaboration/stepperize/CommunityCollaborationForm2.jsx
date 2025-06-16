import React from 'react'
import { DatePicker, TimePicker } from 'antd'
import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
const {RangePicker} = DatePicker

export const CommunityCollaborationForm2 = () => {

  const {control} = useFormContext()

  const startTime = dayjs('12:08:23', 'HH:mm:ss');
  const endTime = dayjs('12:08:23', 'HH:mm:ss');


  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="card-number" className="text-sm font-medium text-start">
          Range Date Collaboration
        </label>
        <Controller
          name="rangeDateCollaboration"
          control={control}
          rules={{required:"Range Date Collaboration is required"}}
          render={({field, fieldState:{error}})=>(
            <div>
              <RangePicker value={field.value} onChange={(date)=>field.onChange(date)}/>
              {error && <p className='text-red-500'>{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label
            htmlFor="expiry-date"
            className="text-sm font-medium text-start"
          >
            Range Hour Collaboration
          </label>

          <Controller
            name="rangeHourCollaboration"
            control={control}
            rules={{required:"Range Hour Collaboration is required"}}
            render={({field, fieldState:{error}})=>(
              <div>
                <TimePicker.RangePicker value={field.value} onChange={(date)=>field.onChange(date)}/>
                {error && <p className='text-red-500'>{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
