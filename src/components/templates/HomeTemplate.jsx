import { memo, use, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { useSocket } from '../../hooks/useSocket';


export const HomeTemplate = memo(() => {

  const socket = useSocket()

  useEffect(()=>{
    socket.emit("evento-servidor","Hola desde el cliente");
  },[])

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6">Welcome, Hector</h1>

      <div className="flex gap-4 mt-8 ">
        {[
          { title: 'Community Water', icon: 'ph:lightbulb' },
          { title: 'Tutorials', icon: 'ph:book-open' },
          { title: 'Submit Reports', icon: 'ph:note-pencil' },
          { title: 'Funding', icon: 'ph:money' },
          { title: 'Water Sharing', icon: 'ph:drop' }
        ].map((item) => (
          <CardItem key={item.title} title={item.title} icon={item.icon} />
        ))}
      </div>
    </div>
  );
});

const CardItem = memo(({ title, icon }) => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md w-[200px] box-border border-1 border-[#A48647] transition-shadow">
    <Icon icon={icon} width="40" height="40" className="text-[#A48647] mb-2" />
    <h3 className="text-lg font-medium text-center">{title}</h3>
  </div>
));