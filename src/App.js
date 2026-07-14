import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ContactProvider } from './context/ContactContext'
import { ThemeProvider } from './context/ThemeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import ContactList from './pages/ContactList'
import ContactAdd from './pages/ContactAdd'
import ContactEdit from './pages/ContactEdit'
import ContactDetail from './pages/ContactDetail'

export default function App() {
  return (
    <ThemeProvider>
      <ContactProvider>
        <ErrorBoundary>
          <div className="app-shell">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<ContactList />} />
                <Route path="/add" element={<ContactAdd />} />
                <Route path="/edit/:id" element={<ContactEdit />} />
                <Route path="/contacts/:id" element={<ContactDetail />} />
              </Routes>
            </main>
            <footer className="app-footer">Sổ Địa Chỉ — Đồ án môn FER202 · React + JSON Server</footer>
          </div>
          <ToastContainer position="bottom-right" autoClose={2200} theme="colored" />
        </ErrorBoundary>
      </ContactProvider>
    </ThemeProvider>
  )
}
