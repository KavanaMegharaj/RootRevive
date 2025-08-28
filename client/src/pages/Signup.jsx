import { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      login(data)
      navigate('/')
    } catch (e) {
      alert(e.response?.data?.message || e.message)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card" style={{maxWidth:420, margin:'40px auto'}}>
      <h2>Sign Up</h2>
      <div className="space" />
      <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <div className="space" />
      <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <div className="space" />
      <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="space" />
      <button className="btn" type="submit">Create Account</button>
    </form>
  )
}
