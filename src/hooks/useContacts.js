import { useContext } from 'react'
import { ContactContext } from '../context/ContactContext'

// Custom Hook: giúp component chỉ cần gọi useContacts() thay vì useContext(ContactContext)
export function useContacts() {
  const ctx = useContext(ContactContext)
  if (!ctx) throw new Error('useContacts phải được dùng bên trong <ContactProvider>')
  return ctx
}
