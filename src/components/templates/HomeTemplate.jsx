import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

export const HomeTemplate = () => {
    const { user, loading } = UserAuth();
    const [descodeUserState, setdescodeUserState] = useState()
    useEffect(() => {
      const decodeUser = jwtDecode(user)
      setdescodeUserState(decodeUser)
    }, [])
    console.log(descodeUserState);
  

  return (
    <div className='w-6/7'>HomeTemplate</div>
  )
}