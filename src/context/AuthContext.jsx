import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthContextProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>

  )
}

export const UserAuth = ()=>{
  return useContext(AuthContext)
}