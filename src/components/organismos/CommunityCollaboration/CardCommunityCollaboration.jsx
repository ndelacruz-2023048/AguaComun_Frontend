import React from 'react'

export const CardCommunityCollaboration = () => {
  return (
    <div className='flex justify-center items-center border-[#A48647] border-1 rounded-2xl h-[190px] w-full'>
      <div className='flex w-[97%] h-[85%] gap-5'>
        <div className='flex flex-col gap-1 w-2/3'>
            <h3 className='text-[#A48647] font-bold text-[18px]'>Community Cleanup</h3>
            <p className='text-[#A48647] text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore unde fuga consequuntur dolorem laboriosam? Quisquam laudantium</p>
            <button className='border-[#A48647] border-1 text-[#A48647] p-[5px_15px] text-[15px] rounded-2xl w-[15%]'>View</button>
        </div>
        <div className='flex w-1/3'>
            <img className= 'w-full object-cover rounded-2xl' src="https://res.cloudinary.com/dtmwybty7/image/upload/v1748320683/yphnk4fk0yscvrtvzj6e.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
