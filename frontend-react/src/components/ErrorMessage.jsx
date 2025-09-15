import React from 'react'
import styles from './ErrorMessage.module.css'

const ErrorMessage = ({ 
  message, 
  type = 'error', 
  onClose,
  className = '' 
}) => {
  if (!message) return null

  return (
    <div className={`${styles.container} ${styles[type]} ${className}`}>
      <div className={styles.content}>
        <span className={styles.icon}>
          {type === 'error' && '⚠️'}
          {type === 'warning' && '⚡'}
          {type === 'success' && '✅'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className={styles.message}>{message}</span>
      </div>
      {onClose && (
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close message"
        >
          ×
        </button>
      )}
    </div>
  )
}

export default ErrorMessage