import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileShortcuts from './MobileShortcuts'
import ScrollToTop from './ScrollToTop'

const Layout = () => {
  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <MobileShortcuts />
      </div>
    </>
  )
}

export default Layout
