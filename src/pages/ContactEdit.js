import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { contactApi } from '../api/contactApi'
import { useContacts } from '../hooks/useContacts'
import ContactForm from '../components/ContactForm'

export default function ContactEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateContact } = useContacts()
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    contactApi.getById(id).then(data => {
      setContact(data)
      setLoading(false)
    })
  }, [id])

  const handleSubmit = async (values) => {
    try {
      await updateContact(id, values)
      toast.success('Đã cập nhật liên hệ.')
      navigate(`/contacts/${id}`)
    } catch {
      toast.error('Cập nhật thất bại.')
    }
  }

  if (loading) return <div className="page state-box">Đang tải...</div>
  if (!contact) return <div className="page state-box">Không tìm thấy liên hệ. <Link to="/">Về danh bạ</Link></div>

  return (
    <div className="page">
      <div className="page-head">
        <h1>Chỉnh sửa liên hệ</h1>
        <p className="page-sub">Cập nhật thông tin của {contact.fullName}</p>
      </div>
      <div className="form-card">
        <ContactForm initialValue={contact} onSubmit={handleSubmit} submitLabel="Cập nhật" />
      </div>
    </div>
  )
}
