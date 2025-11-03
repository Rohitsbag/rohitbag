import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  const [accessibilityMode, setAccessibilityMode] = useState(() => {
    const saved = localStorage.getItem('accessibilityMode')
    return saved === 'true'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const body = document.body
    if (accessibilityMode) {
      body.classList.add('accessibility-mode')
    } else {
      body.classList.remove('accessibility-mode')
    }
    localStorage.setItem('accessibilityMode', accessibilityMode.toString())
  }, [accessibilityMode])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const toggleAccessibility = () => {
    setAccessibilityMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      accessibilityMode, 
      toggleAccessibility 
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
