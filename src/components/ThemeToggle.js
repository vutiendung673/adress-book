import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Chuyển chế độ sáng/tối">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
