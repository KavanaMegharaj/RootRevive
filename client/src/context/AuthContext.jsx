import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(()=> {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(()=> localStorage.getItem('token'))

  const login = (payload) => {
    setUser(payload.user)
    setToken(payload.token)
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('token', payload.token)
  }

  const logout = () => {
    setUser(null); setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
