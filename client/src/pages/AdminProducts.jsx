import { useEffect, useState } from 'react'
import api, { setAuth } from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name:'', description:'', price:'', stock:'', image:'', category:'' })
  const { token } = useAuth()

  const load = async () => {
    const { data } = await api.get('/products')
    setProducts(data.items)
  }
  useEffect(()=>{ load() }, [])

  const save = async () => {
    setAuth(token)
    if (form._id) {
      await api.put('/products/' + form._id, { ...form, price: Number(form.price), stock: Number(form.stock) })
    } else {
      await api.post('/products', { ...form, price: Number(form.price), stock: Number(form.stock) })
    }
    setForm({ name:'', description:'', price:'', stock:'', image:'', category:'' })
    await load()
  }

  const edit = (p) => setForm(p)
  const del = async (id) => { setAuth(token); await api.delete('/products/' + id); await load() }

  return (
    <div>
      <h2>Admin: Products</h2>
      <div className="card">
        <div className="row" style={{flexWrap:'wrap', gap:12}}>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <input className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} style={{width:300}} />
          <input className="input" placeholder="Price" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} style={{width:110}} />
          <input className="input" placeholder="Stock" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} style={{width:110}} />
          <input className="input" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} style={{width:220}} />
          <input className="input" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} style={{width:160}} />
          <button className="btn" onClick={save}>{form._id ? 'Update' : 'Add'}</button>
        </div>
      </div>

      <div className="space" />
      <div style={{maxHeight:'60vh', overflowY:'auto', borderRadius:'8px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <table className="table">
          <thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th /></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>
                <td>{p.category}</td>
                <td>
                  <button className="btn" onClick={()=>edit(p)}>Edit</button>{' '}
                  <button className="btn" onClick={()=>del(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
