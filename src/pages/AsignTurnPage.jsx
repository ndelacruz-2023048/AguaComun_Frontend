import React, { useEffect } from 'react'
import { AsignTurnTemplate } from '../components/templates/AsignTurnTemplate'
import { useQuery } from '@tanstack/react-query'
import { useCommunityCollaboration } from '../stores/communityCollaborationStore'
import { useSocket } from '../hooks/useSocket'

export const AsignTurnPage = () => {

  const socket = useSocket()

  const {getTurnByActivityCollaboration,turnByActivityCollaboration,idCommunityCollaboration,setTurnByActivityCollaboration} = useCommunityCollaboration()

  useEffect(()=>{
    if (!idCommunityCollaboration) return
    socket.emit("get-turns-by-activity",idCommunityCollaboration)
    
    socket.on("list-turns",(data)=>{
      console.log(data);
      
      setTurnByActivityCollaboration(data)
    })
    return ()=>{
      socket.off("list-turns")
    }
  },[idCommunityCollaboration])
  return (
    <AsignTurnTemplate/>
  )
}
