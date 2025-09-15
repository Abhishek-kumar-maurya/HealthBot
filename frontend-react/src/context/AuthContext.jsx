import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing authentication on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('healthbot-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('healthbot-user')
      }
    }
    setLoading(false)
  }, [])

  // Dummy login function for testing
  const login = async (email, password) => {
    setLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Dummy validation - accept any email/password for testing
    if (email && password) {
      const userData = {
        id: '1',
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        avatar: null,
        role: 'user'
      }
      
      setUser(userData)
      localStorage.setItem('healthbot-user', JSON.stringify(userData))
      setLoading(false)
      return { success: true }
    } else {
      setLoading(false)
      return { success: false, error: 'Please provide email and password' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('healthbot-user')
  }

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('healthbot-user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}