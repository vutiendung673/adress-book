import axios from 'axios'

// JSON Server chạy tại cổng 3001 (xem lệnh "npm run server")
const BASE_URL = 'http://localhost:3001'

const client = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const contactApi = {
  // GET /contacts  (hỗ trợ tìm kiếm qua query "q" mà json-server cung cấp sẵn)
  getAll: (query = '') =>
    client.get(`/contacts${query ? `?q=${encodeURIComponent(query)}` : ''}`).then(r => r.data),

  // GET /contacts/:id
  getById: (id) => client.get(`/contacts/${id}`).then(r => r.data),

  // POST /contacts
  create: (contact) => client.post('/contacts', contact).then(r => r.data),

  // PUT /contacts/:id
  update: (id, contact) => client.put(`/contacts/${id}`, contact).then(r => r.data),

  // DELETE /contacts/:id
  remove: (id) => client.delete(`/contacts/${id}`),
}
