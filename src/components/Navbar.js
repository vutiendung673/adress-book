import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="topbar">
      <Link to="/" className="brand">
        <span className="brand-mark">§</span>
        <span className="brand-text">
          <span className="brand-title">Sổ Địa Chỉ</span>
          <span className="brand-sub">FER202 · Contact Ledger</span>
        </span>
      </Link>
      <nav className="topnav">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Danh bạ</NavLink>
        <NavLink to="/add" className={({isActive}) => isActive ? 'active' : ''}>+ Thêm liên hệ</NavLink>
        <ThemeToggle />
      </nav>
    </header>
  )
}
