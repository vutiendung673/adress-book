import { createContext, useCallback, useReducer } from 'react'
import PropTypes from 'prop-types'
import { contactApi } from '../api/contactApi'

export const ContactContext = createContext(null)

const initialState = {
  contacts: [],
  loading: false,
  error: null,
}

// Reducer thuần: (state, action) -> state mới. Minh họa pattern useReducer của FER202.
function contactReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, contacts: action.payload }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(c => (c.id === action.payload.id ? action.payload : c)),
      }
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) }
    default:
      return state
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState)

  // useCallback để tránh tạo lại hàm mỗi lần render (tối ưu re-render con)
  const fetchContacts = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const data = await contactApi.getAll()
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (err) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: 'Không thể kết nối tới JSON Server. Hãy chắc chắn bạn đã chạy "npm run server".',
      })
    }
  }, [])

  const addContact = useCallback(async (values) => {
    const created = await contactApi.create(values)
    dispatch({ type: 'ADD_CONTACT', payload: created })
    return created
  }, [])

  const updateContact = useCallback(async (id, values) => {
    const updated = await contactApi.update(id, { ...values, id })
    dispatch({ type: 'UPDATE_CONTACT', payload: updated })
    return updated
  }, [])

  const deleteContact = useCallback(async (id) => {
    await contactApi.remove(id)
    dispatch({ type: 'DELETE_CONTACT', payload: id })
  }, [])

  const value = {
    contacts: state.contacts,
    loading: state.loading,
    error: state.error,
    fetchContacts,
    addContact,
    updateContact,
    deleteContact,
  }

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
}

ContactProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
