import { memo, use, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { useSocket } from '../../hooks/useSocket';
import { jwtDecode } from 'jwt-decode'
import { UserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router';

export const HomeTemplate = memo(() => {

  const { user } = UserAuth();
  const socket = useSocket()
  const navigate = useNavigate()

  let name, surname = ''
  if(user) {
    try {
      const decodedToken = jwtDecode(user);
      name = decodedToken?.name || '';
      surname = decodedToken?.surname || '';
    } catch (e) {
      console.error(e);
      
    }
  }

  useEffect(()=>{
    socket.emit("evento-servidor","Hola desde el cliente");
  },[])

   const handleCardClick = (title) => {
    if (title === 'Community Water') {
      navigate('/community')
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold mb-6">Welcome, {`${name} ${surname}`}</h1>

      <div className="flex gap-4 mt-8 ">
        {[
          { title: 'Community Water', icon: 'ph:lightbulb' },
          { title: 'Tutorials', icon: 'ph:book-open' },
          { title: 'Submit Reports', icon: 'ph:note-pencil' },
          { title: 'Funding', icon: 'ph:money' },
          { title: 'Water Sharing', icon: 'ph:drop' }
        ].map((item) => (
          <CardItem key={item.title} title={item.title} icon={item.icon} 
            onClick={() => handleCardClick(item.title)}
          />
        ))}
      </div>
    </div>
  );
});

const CardItem = memo(({ title, icon, onClick  }) => (
  <div onClick={onClick} className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md w-[200px] box-border border-1 border-[#A48647] transition-shadow">
    <Icon icon={icon} width="40" height="40" className="text-[#A48647] mb-2" />
    <h3 className="text-lg font-medium text-center">{title}</h3>
  </div>
));