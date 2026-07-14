import { memo } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TAB_COLORS = {
  'Gia đình': 'tab-family',
  'Bạn bè': 'tab-friend',
  'Công việc': 'tab-work',
}

// React.memo: chỉ re-render lại thẻ này khi props (contact) thực sự thay đổi
function ContactCard({ contact, onDelete }) {
  const tabClass = TAB_COLORS[contact.group] || 'tab-other'
  const initial = contact.fullName?.trim()?.[0]?.toUpperCase() || '?'

  return (
    <div className="index-card">
      <div className={`card-tab ${tabClass}`}>{contact.group || 'Khác'}</div>
      <div className="card-body">
        <div className="card-avatar">{initial}</div>
        <div className="card-info">
          <Link to={`/contacts/${contact.id}`} className="card-name">
            {contact.fullName}
          </Link>
          <div className="card-line mono">☎ {contact.phone}</div>
          <div className="card-line">✉ {contact.email}</div>
          <div className="card-line muted">{contact.address}</div>
        </div>
      </div>
      <div className="card-actions">
        <Link to={`/contacts/${contact.id}`} className="btn btn-ghost">Xem</Link>
        <Link to={`/edit/${contact.id}`} className="btn btn-ghost">Sửa</Link>
        <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>Xóa</button>
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    group: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default memo(ContactCard)
