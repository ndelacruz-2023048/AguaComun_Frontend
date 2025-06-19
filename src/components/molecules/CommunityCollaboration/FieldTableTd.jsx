import React, { useEffect, useState } from 'react'

export const FieldTableTd = ({data}) => {
    const [turnsAssigned,setTurnsAssigned] = useState(0)
    const [turnsUnassigned,setTurnsUnassigned] = useState(0)

    useEffect(()=>{
        const turnsAssigned = data.filter(t=>t.status === "occupied").length
        const turnsUnassigned = data.filter(t=>t.status === "pending").length
        setTurnsAssigned(turnsAssigned)
        setTurnsUnassigned(turnsUnassigned)
    },[data])
    
  return (
    <button className="rounded-xl w-[80%] bg-[#f4f4f4] text-[#D7AD2C] font-bold border-2 border-gray-100">{turnsAssigned}</button>
  )
}
