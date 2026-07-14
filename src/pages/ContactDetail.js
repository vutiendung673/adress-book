import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { contactApi } from '../api/contactApi'
import { useContacts } from '../hooks/useContacts'

export default function ContactDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deleteContact } = useContacts()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contactApi.getById(id).then(data => {
      setContact(data)
      setLoading(false)
    })
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Xóa liên hệ này khỏi sổ địa chỉ?')) return
    try {
      await deleteContact(id)
      toast.success('Đã xóa liên hệ.')
      navigate('/')
    } catch {
      toast.error('Xóa liên hệ thất bại.')
    }
  }

  if (loading) return <div className="page state-box">Đang tải...</div>
  if (!contact) return <div className="page state-box">Không tìm thấy liên hệ. <Link to="/">Về danh bạ</Link></div>

  const initial = contact.fullName?.trim()?.[0]?.toUpperCase() || '?'

  return (
    <div className="page">
      <Link to="/" className="back-link">← Về danh bạ</Link>
      <div className="detail-card">
        <div className="detail-head">
          <div className="detail-avatar">{initial}</div>
          <div>
            <h1>{contact.fullName}</h1>
            <span className="pill">{contact.group || 'Khác'}</span>
          </div>
        </div>

        <dl className="detail-list">
          <div className="detail-row">
            <dt>Số điện thoại</dt>
            <dd className="mono">{contact.phone}</dd>
          </div>
          <div className="detail-row">
            <dt>Email</dt>
            <dd>{contact.email || '—'}</dd>
          </div>
          <div className="detail-row">
            <dt>Địa chỉ</dt>
            <dd>{contact.address || '—'}</dd>
          </div>
          <div className="detail-row">
            <dt>Ghi chú</dt>
            <dd>{contact.notes || '—'}</dd>
          </div>
        </dl>

        <div className="detail-actions">
          <Link to={`/edit/${contact.id}`} className="btn btn-primary">Chỉnh sửa</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Xóa liên hệ</button>
        </div>
      </div>
    </div>
  )
}
