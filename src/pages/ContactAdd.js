import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useContacts } from '../hooks/useContacts'
import ContactForm from '../components/ContactForm'

export default function ContactAdd() {
  const navigate = useNavigate()
  const { addContact } = useContacts()

  const handleSubmit = async (values) => {
    try {
      await addContact(values)
      toast.success('Đã thêm liên hệ mới.')
      navigate('/')
    } catch {
      toast.error('Thêm liên hệ thất bại.')
    }
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Thêm liên hệ mới</h1>
        <p className="page-sub">Điền thông tin để lưu vào sổ địa chỉ</p>
      </div>
      <div className="form-card">
        <ContactForm onSubmit={handleSubmit} submitLabel="Lưu liên hệ" />
      </div>
    </div>
  )
}
