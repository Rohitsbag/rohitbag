import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Story from './pages/Story'
import Projects from './pages/Projects'
import AdviceMuseum from './pages/AdviceMuseum'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import NotFound from './pages/NotFound'

function App() {
  return (
    <ThemeProvider>
      <Router basename="/rohit-site">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="story" element={<Story />} />
            <Route path="projects" element={<Projects />} />
            <Route path="advice-museum" element={<AdviceMuseum />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
