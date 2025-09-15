import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Dashboard.module.css'

const Dashboard = () => {
  const { user } = useAuth()

  const quickActions = [
    {
      title: 'Chat with HealthBot',
      description: 'Get instant health advice and answers to your questions',
      icon: '💬',
      link: '/chatbot',
      color: 'primary'
    },
    {
      title: 'View Health Records',
      description: 'Access and manage your medical history and records',
      icon: '📋',
      link: '/health-records',
      color: 'secondary'
    },
    {
      title: 'Update Profile',
      description: 'Manage your personal information and preferences',
      icon: '👤',
      link: '/profile',
      color: 'success'
    }
  ]

  const healthStats = [
    {
      label: 'Last Checkup',
      value: '2 weeks ago',
      icon: '🩺',
      status: 'good'
    },
    {
      label: 'Active Medications',
      value: '3',
      icon: '💊',
      status: 'warning'
    },
    {
      label: 'Upcoming Appointments',
      value: '1',
      icon: '📅',
      status: 'info'
    },
    {
      label: 'Health Score',
      value: '8.5/10',
      icon: '⭐',
      status: 'good'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className={styles.subtitle}>
          Here's your health overview for today
        </p>
      </div>

      {/* Quick Actions */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${styles.actionCard} ${styles[action.color]}`}
            >
              <div className={styles.actionIcon}>{action.icon}</div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDescription}>{action.description}</p>
              </div>
              <div className={styles.actionArrow}>→</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Health Stats */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Health Overview</h2>
        <div className={styles.statsGrid}>
          {healthStats.map((stat, index) => (
            <div key={index} className={`${styles.statCard} ${styles[stat.status]}`}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityCard}>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>💬</div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>Chatbot Conversation</div>
                <div className={styles.activityTime}>2 hours ago</div>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>📋</div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>Health Record Updated</div>
                <div className={styles.activityTime}>1 day ago</div>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>👤</div>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>Profile Information Updated</div>
                <div className={styles.activityTime}>3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard