import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './ChatBot.module.css'

const ChatBot = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello ${user?.name || 'there'}! I'm HealthBot, your personal health assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text)
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('symptom') || message.includes('pain') || message.includes('hurt')) {
      return "I understand you're experiencing some symptoms. While I can provide general information, it's important to consult with a healthcare professional for proper diagnosis and treatment. Can you tell me more about what you're experiencing?"
    }
    
    if (message.includes('medication') || message.includes('medicine') || message.includes('drug')) {
      return "For medication-related questions, I recommend speaking with your doctor or pharmacist. They can provide specific guidance based on your medical history. Is there general information about medications I can help you with?"
    }
    
    if (message.includes('appointment') || message.includes('doctor') || message.includes('visit')) {
      return "Scheduling appointments with healthcare providers is important for maintaining your health. You can typically call your doctor's office directly or use their online portal. Would you like me to help you prepare questions for your appointment?"
    }
    
    if (message.includes('diet') || message.includes('nutrition') || message.includes('food')) {
      return "Nutrition plays a crucial role in health! A balanced diet with plenty of fruits, vegetables, whole grains, and lean proteins is generally recommended. Do you have specific dietary questions or concerns?"
    }
    
    if (message.includes('exercise') || message.includes('workout') || message.includes('fitness')) {
      return "Regular exercise is great for your health! The general recommendation is at least 150 minutes of moderate aerobic activity per week. Always consult with your doctor before starting a new exercise program. What type of activities interest you?"
    }
    
    if (message.includes('stress') || message.includes('anxiety') || message.includes('mental health')) {
      return "Mental health is just as important as physical health. If you're dealing with stress or anxiety, consider speaking with a mental health professional. In the meantime, practices like deep breathing, meditation, and regular exercise can help. Are you looking for specific stress management techniques?"
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! I'm here to help with any health-related questions you might have. Remember, while I can provide general information, always consult healthcare professionals for specific medical advice."
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! How are you feeling today? I'm here to help with any health questions or concerns you might have."
    }
    
    // Default response
    return "That's an interesting question! While I can provide general health information, I always recommend consulting with qualified healthcare professionals for specific medical advice. Is there a particular aspect of health you'd like to know more about?"
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const quickSuggestions = [
    "Tell me about healthy eating habits",
    "How much exercise should I do?",
    "What are good stress management techniques?",
    "When should I see a doctor?"
  ]

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.icon}>💬</span>
          HealthBot Chat
        </h1>
        <p className={styles.subtitle}>
          Get instant health advice and answers to your questions
        </p>
      </div>

      <div className={styles.chatContainer}>
        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.sender]}`}
            >
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.text}</div>
                <div className={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={styles.messageContent}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className={styles.suggestionsContainer}>
            <p className={styles.suggestionsTitle}>Try asking:</p>
            <div className={styles.suggestions}>
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={styles.suggestionButton}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your health question here..."
              className={styles.messageInput}
              disabled={isTyping}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!inputValue.trim() || isTyping}
            >
              <span className={styles.sendIcon}>➤</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatBot