import { useEffect, useState } from 'react'
import api, { setAuth } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const { token } = useAuth()

  const load = async () => {
    setAuth(token)
    const { data } = await api.get('/orders')
    setOrders(data)
  }
  useEffect(()=>{ load() }, [])

  const update = async (id, status) => {
    setAuth(token)
    await api.patch('/orders/' + id + '/status', { status })
    await load()
  }

  return (
    <div>
      <h2>Admin: Orders</h2>
      <table className="table">
        <thead><tr><th>ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.name} ({o.user?.email})</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
              <td>
                <select className="input" value={o.status} onChange={(e)=>update(o._id, e.target.value)}>
                  <option>Pending</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
