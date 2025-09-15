import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🏥</div>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.description}>
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className={styles.actions}>
          <Link to="/dashboard" className={styles.primaryButton}>
            Go to Dashboard
          </Link>
          <Link to="/chatbot" className={styles.secondaryButton}>
            Chat with HealthBot
          </Link>
        </div>
        
        <div className={styles.suggestions}>
          <h3 className={styles.suggestionsTitle}>You might be looking for:</h3>
          <ul className={styles.suggestionsList}>
            <li>
              <Link to="/dashboard" className={styles.suggestionLink}>
                🏠 Dashboard - Your health overview
              </Link>
            </li>
            <li>
              <Link to="/chatbot" className={styles.suggestionLink}>
                💬 ChatBot - Get health advice
              </Link>
            </li>
            <li>
              <Link to="/health-records" className={styles.suggestionLink}>
                📋 Health Records - Medical history
              </Link>
            </li>
            <li>
              <Link to="/profile" className={styles.suggestionLink}>
                👤 Profile - Personal information
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NotFound