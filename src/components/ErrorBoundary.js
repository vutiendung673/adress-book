import { Component } from 'react'
import PropTypes from 'prop-types'

// Class Component + lifecycle method (getDerivedStateFromError, componentDidCatch)
// Đây là phần kiến thức "Error Boundaries" trong React, chỉ có thể viết bằng class component.
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary bắt lỗi:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="state-box error">
            Đã có lỗi xảy ra khi hiển thị giao diện: {this.state.message}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}
