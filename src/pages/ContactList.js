import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useContacts } from '../hooks/useContacts'
import { useDebounce } from '../hooks/useDebounce'
import ContactCard from '../components/ContactCard'
import Pagination from '../components/Pagination'

const PAGE_SIZE = 6

export default function ContactList() {
  const { contacts, loading, error, fetchContacts, deleteContact } = useContacts()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300) // Custom Hook: trì hoãn tìm kiếm
  const [groupFilter, setGroupFilter] = useState('Tất cả')
  const [sortBy, setSortBy] = useState('name-asc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa liên hệ này khỏi sổ địa chỉ?')) return
    try {
      await deleteContact(id)
      toast.success('Đã xóa liên hệ.')
    } catch {
      toast.error('Xóa liên hệ thất bại.')
    }
  }

  const groups = useMemo(() => {
    const set = new Set(contacts.map(c => c.group).filter(Boolean))
    return ['Tất cả', ...set]
  }, [contacts])

  // useMemo: chỉ tính lại danh sách đã lọc + sắp xếp khi các dependency thay đổi
  const filteredSorted = useMemo(() => {
    const filtered = contacts.filter(c => {
      const s = debouncedSearch.toLowerCase()
      const matchesSearch =
        c.fullName?.toLowerCase().includes(s) ||
        c.phone?.includes(debouncedSearch) ||
        c.email?.toLowerCase().includes(s)
      const matchesGroup = groupFilter === 'Tất cả' || c.group === groupFilter
      return matchesSearch && matchesGroup
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name-asc') return a.fullName.localeCompare(b.fullName)
      if (sortBy === 'name-desc') return b.fullName.localeCompare(a.fullName)
      if (sortBy === 'group') return (a.group || '').localeCompare(b.group || '')
      return 0
    })
    return sorted
  }, [contacts, debouncedSearch, groupFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE))
  const pageItems = filteredSorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => { setPage(1) }, [debouncedSearch, groupFilter, sortBy])

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Danh bạ của bạn</h1>
          <p className="page-sub">{contacts.length} liên hệ được lưu trữ</p>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="Tìm theo tên, số điện thoại hoặc email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="select-input" value={groupFilter} onChange={e => setGroupFilter(e.target.value)}>
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select className="select-input" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
          <option value="group">Theo nhóm</option>
        </select>
      </div>

      {loading && <div className="state-box">Đang tải dữ liệu...</div>}

      {error && (
        <div className="state-box error">
          {error}
          <div className="hint mono">json-server --watch db.json --port 3001</div>
        </div>
      )}

      {!loading && !error && filteredSorted.length === 0 && (
        <div className="state-box">Không tìm thấy liên hệ nào phù hợp.</div>
      )}

      <div className="card-grid">
        {pageItems.map(c => (
          <ContactCard key={c.id} contact={c} onDelete={handleDelete} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  )
}
