import React from 'react'
import { NavLink } from 'react-router'
import { useCommunityCollaboration } from '../../../stores/communityCollaborationStore';

export const CardCommunityCollaboration = ({title, description, image, buttonText,id}) => {
  console.log(id);

  const {idCommunityCollaboration,setIdCommunityCollaboration} = useCommunityCollaboration()

  const handleClickViewCommunityCollaboration = ()=>{
    setIdCommunityCollaboration(id)
  }

  return (
    <div className='flex justify-center items-center border-[#A48647] border-1 rounded-2xl h-[190px] w-full'>
      <div className='flex w-[97%] h-[85%] gap-5'>
        <div className='flex flex-col gap-1 w-2/3'>
            <h3 className='text-[#A48647] font-bold text-[18px]'>{title}</h3>
            <p className='text-[#A48647] text-[15px]'>{description}</p>
            <NavLink to={`/community-collaboration/assign-turn`}>
              <button onClick={handleClickViewCommunityCollaboration} className='border-[#A48647] border-1 text-[#A48647] p-[5px_15px] text-[15px] rounded-2xl w-[15%]'>View</button>
            </NavLink>
        </div>
        <div className='flex w-1/3'>
            <img className= 'w-full object-cover rounded-2xl' src="https://res.cloudinary.com/dtmwybty7/image/upload/v1748320683/yphnk4fk0yscvrtvzj6e.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
