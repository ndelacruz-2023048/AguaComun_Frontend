import React, { useEffect, useState } from 'react'
import { useSocket } from '../../../../hooks/useSocket'
import { getRecentUsersRequest } from '../../../../routers/services/Api.jsx'
import { GenerateInitialsAvatar } from '../../../../utils/Avatar.jsx'

export const NewUsers = () => {
  const socket = useSocket()
  const [users, setUsers] = useState([])

  // Fetch inicial usando Axios
  useEffect(() => {
    const fetchRecentUsers = async () => {
      const res = await getRecentUsersRequest()
      if (!res.error) {
        setUsers(res.data)
      } else {
        console.error('Error al obtener usuarios recientes', res.e)
      }
    }

    fetchRecentUsers()
  }, [])

  // Socket listener
  useEffect(() => {
    socket.on('new-users', (data) => {
      setUsers(data)
    })

    return () => {
      socket.off('new-users')
    }
  }, [socket])

  return (
    <div className="bg-white rounded-xl shadow-md w-[96%] mx-auto">
      <div className='w-[95%] mx-auto'>
        <h2 className="text-2xl font-bold">Nuevos usuarios</h2>
        <ul className="divide-y divide-gray-200">
          {users.map((user, idx) => (
            <li key={idx} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12">
                  {user.profilePicture && user.profilePicture.trim() !== '' ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <GenerateInitialsAvatar name={user.name} surname="" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 leading-tight">{user.name}</p>
                  <p className="text-sm text-gray-500 leading-tight">{user.rol}</p>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm min-w-[70px] text-center">
                {new Date(user.createdAt).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}