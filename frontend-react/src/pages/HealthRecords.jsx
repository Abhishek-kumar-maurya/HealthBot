import React, { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import styles from './HealthRecords.module.css'

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState('visits')
  const [message, setMessage] = useState({ text: '', type: '' })

  // Mock data for demonstration
  const medicalVisits = [
    {
      id: 1,
      date: '2024-01-15',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Family Medicine',
      reason: 'Annual Physical Exam',
      diagnosis: 'Healthy - Routine checkup',
      notes: 'Patient in good health. Recommended annual follow-up.',
      status: 'completed'
    },
    {
      id: 2,
      date: '2023-12-10',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      reason: 'Heart palpitations consultation',
      diagnosis: 'Benign palpitations - anxiety related',
      notes: 'Recommended stress management and follow-up in 6 months.',
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-11-22',
      doctor: 'Dr. Emily Rodriguez',
      specialty: 'Dermatology',
      reason: 'Skin lesion examination',
      diagnosis: 'Benign mole - no treatment needed',
      notes: 'Annual skin check recommended.',
      status: 'completed'
    }
  ]

  const medications = [
    {
      id: 1,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      endDate: null,
      status: 'active',
      notes: 'Take with food. Monitor blood pressure.'
    },
    {
      id: 2,
      name: 'Vitamin D3',
      dosage: '2000 IU',
      frequency: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      startDate: '2024-01-15',
      endDate: null,
      status: 'active',
      notes: 'Take with breakfast for better absorption.'
    },
    {
      id: 3,
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      prescribedBy: 'Dr. Michael Chen',
      startDate: '2023-12-10',
      endDate: '2024-01-10',
      status: 'completed',
      notes: 'For headache relief. Do not exceed 3 times per day.'
    }
  ]

  const labResults = [
    {
      id: 1,
      date: '2024-01-15',
      testName: 'Complete Blood Count (CBC)',
      orderedBy: 'Dr. Sarah Johnson',
      status: 'completed',
      results: [
        { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12.0-15.5', status: 'normal' },
        { parameter: 'White Blood Cells', value: '6.8', unit: '10³/μL', range: '4.5-11.0', status: 'normal' },
        { parameter: 'Platelets', value: '285', unit: '10³/μL', range: '150-450', status: 'normal' }
      ]
    },
    {
      id: 2,
      date: '2024-01-15',
      testName: 'Basic Metabolic Panel',
      orderedBy: 'Dr. Sarah Johnson',
      status: 'completed',
      results: [
        { parameter: 'Glucose', value: '92', unit: 'mg/dL', range: '70-100', status: 'normal' },
        { parameter: 'Creatinine', value: '0.9', unit: 'mg/dL', range: '0.6-1.2', status: 'normal' },
        { parameter: 'Sodium', value: '140', unit: 'mEq/L', range: '136-145', status: 'normal' }
      ]
    },
    {
      id: 3,
      date: '2023-12-10',
      testName: 'Lipid Panel',
      orderedBy: 'Dr. Michael Chen',
      status: 'completed',
      results: [
        { parameter: 'Total Cholesterol', value: '195', unit: 'mg/dL', range: '<200', status: 'normal' },
        { parameter: 'LDL Cholesterol', value: '115', unit: 'mg/dL', range: '<100', status: 'high' },
        { parameter: 'HDL Cholesterol', value: '58', unit: 'mg/dL', range: '>40', status: 'normal' }
      ]
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      completed: { text: 'Completed', class: 'success' },
      active: { text: 'Active', class: 'primary' },
      pending: { text: 'Pending', class: 'warning' },
      high: { text: 'High', class: 'error' },
      normal: { text: 'Normal', class: 'success' },
      low: { text: 'Low', class: 'warning' }
    }
    
    const badge = statusMap[status] || { text: status, class: 'secondary' }
    return (
      <span className={`${styles.badge} ${styles[badge.class]}`}>
        {badge.text}
      </span>
    )
  }

  const tabs = [
    { id: 'visits', label: 'Medical Visits', icon: '🏥' },
    { id: 'medications', label: 'Medications', icon: '💊' },
    { id: 'labs', label: 'Lab Results', icon: '🧪' }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>📋</span>
          Health Records
        </h1>
        <p className={styles.subtitle}>
          View and manage your medical history and records
        </p>
      </div>

      {message.text && (
        <ErrorMessage 
          message={message.text} 
          type={message.type}
          onClose={() => setMessage({ text: '', type: '' })}
        />
      )}

      <div className={styles.content}>
        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'visits' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Medical Visits</h2>
                <button className={styles.addButton}>Add Visit</button>
              </div>
              
              <div className={styles.recordsList}>
                {medicalVisits.map((visit) => (
                  <div key={visit.id} className={styles.recordCard}>
                    <div className={styles.recordHeader}>
                      <div className={styles.recordDate}>{formatDate(visit.date)}</div>
                      {getStatusBadge(visit.status)}
                    </div>
                    <div className={styles.recordContent}>
                      <h3 className={styles.recordTitle}>{visit.reason}</h3>
                      <div className={styles.recordDetails}>
                        <p><strong>Doctor:</strong> {visit.doctor} ({visit.specialty})</p>
                        <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                        <p><strong>Notes:</strong> {visit.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Current & Past Medications</h2>
                <button className={styles.addButton}>Add Medication</button>
              </div>
              
              <div className={styles.recordsList}>
                {medications.map((medication) => (
                  <div key={medication.id} className={styles.recordCard}>
                    <div className={styles.recordHeader}>
                      <div className={styles.recordDate}>
                        Started: {formatDate(medication.startDate)}
                      </div>
                      {getStatusBadge(medication.status)}
                    </div>
                    <div className={styles.recordContent}>
                      <h3 className={styles.recordTitle}>
                        {medication.name} - {medication.dosage}
                      </h3>
                      <div className={styles.recordDetails}>
                        <p><strong>Frequency:</strong> {medication.frequency}</p>
                        <p><strong>Prescribed by:</strong> {medication.prescribedBy}</p>
                        {medication.endDate && (
                          <p><strong>End Date:</strong> {formatDate(medication.endDate)}</p>
                        )}
                        <p><strong>Notes:</strong> {medication.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'labs' && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Laboratory Results</h2>
                <button className={styles.addButton}>Add Results</button>
              </div>
              
              <div className={styles.recordsList}>
                {labResults.map((lab) => (
                  <div key={lab.id} className={styles.recordCard}>
                    <div className={styles.recordHeader}>
                      <div className={styles.recordDate}>{formatDate(lab.date)}</div>
                      {getStatusBadge(lab.status)}
                    </div>
                    <div className={styles.recordContent}>
                      <h3 className={styles.recordTitle}>{lab.testName}</h3>
                      <p className={styles.orderedBy}>Ordered by: {lab.orderedBy}</p>
                      
                      <div className={styles.labResults}>
                        {lab.results.map((result, index) => (
                          <div key={index} className={styles.labResult}>
                            <div className={styles.labParameter}>
                              <span className={styles.parameterName}>{result.parameter}</span>
                              {getStatusBadge(result.status)}
                            </div>
                            <div className={styles.labValue}>
                              <span className={styles.value}>{result.value} {result.unit}</span>
                              <span className={styles.range}>Range: {result.range}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HealthRecords