import PropTypes from 'prop-types'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        className="btn btn-ghost"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ← Trước
      </button>
      <span className="pagination-info mono">Trang {page} / {totalPages}</span>
      <button
        className="btn btn-ghost"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Sau →
      </button>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}
