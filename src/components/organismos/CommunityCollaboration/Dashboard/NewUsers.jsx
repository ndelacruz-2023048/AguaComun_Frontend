import React from 'react'
import LogoAguaComun from '../../../../assets/LogoAguaComun.png'

const users = [
  {
    name: 'Joseph Carlson',
    role: 'Cardiólogo',
    time: '10:15 AM',
    avatar: LogoAguaComun,
  },
  {
    name: 'Catherine Watson',
    role: 'Cirujana',
    time: '10:30 AM',
    avatar: LogoAguaComun,
  },
  {
    name: 'Mike Pattinson',
    role: 'Médico General',
    time: '10:45 AM',
    avatar: LogoAguaComun,
  },
  {
    name: 'James Williams',
    role: 'Especialista en Cáncer',
    time: '11:00 AM',
    avatar: LogoAguaComun,
  },
]

export const NewUsers = () => {
  return (
    <div className="bg-white rounded-xl shadow-md  w-[96%] mx-auto">
      <div className='w-[95%] mx-auto'>
        <h2 className="text-2xl font-bold">Nuevos usuarios</h2>
        <ul className="divide-y divide-gray-200">
          {users.map((user, idx) => (
            <li key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">{user.name}</p>
                  <p className="text-sm text-gray-500 leading-tight">{user.role}</p>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm min-w-[70px] text-center">
                {user.time}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
