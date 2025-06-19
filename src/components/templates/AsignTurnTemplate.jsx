import React from 'react'
import { CardAssignTurn } from '../organismos/CommunityCollaboration/CardAssignTurn'
import { useCommunityCollaboration } from '../../stores/communityCollaborationStore'
import { ResumeTurnAssigned } from '../organismos/CommunityCollaboration/ResumeTurnAssigned'

export const AsignTurnTemplate = () => {
  const {turnByActivityCollaboration} = useCommunityCollaboration()
  console.log(turnByActivityCollaboration);
  
  return (
    <div className='flex justify-center  w-full'>
        <div className='flex flex-col gap-5 w-[80%]'>
            <h2 className='text-[#338826] font-bold text-4xl'>Asign Turn</h2>
            <p className='text-[#000000] text-xl font-bold'>Available turns</p>
            {
              turnByActivityCollaboration?.length > 0 && (
                <div className={`flex flex-col gap-5 w-full  ${turnByActivityCollaboration?.length === 0 ? "h-[400px]" :""} overflow-y-scroll`}>
                  {
                    turnByActivityCollaboration?.map((element)=>{
                      if(element?.status === "pending"){
                        return(
                          <CardAssignTurn activityName={element?.activityId} dateAssigned={element?.dateAssigned} endTime={element?.endTime} startTime={element?.startTime} id={element?._id}/>
                        )
                      }
                    })
                  }
                </div>
              )
            }
            <div className='flex justify-center items-center'>
              <ResumeTurnAssigned/>
            </div>
        </div>
    </div>
  )
}
