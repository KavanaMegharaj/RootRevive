import { useEffect, useState } from 'react'
import api, { setAuth } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const { token } = useAuth()

  const load = async () => {
    setAuth(token)
    const { data } = await api.get('/orders/my')
    setOrders(data)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div>
      <h2>My Orders</h2>
      <table className="table">
        <thead><tr><th>ID</th><th>Date</th><th>Status</th><th>Total</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{o.status}</td>
              <td>₹{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
