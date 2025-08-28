import { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('admin@kredo.in')
  const [password, setPassword] = useState('Admin@123')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      login(data)
      navigate('/')
    } catch (e) {
      alert(e.response?.data?.message || e.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Login</h2>
      <div className="space" />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div className="space" />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="space" />
      <button className="btn" type="submit">Login</button>
    </form>
  )
}
