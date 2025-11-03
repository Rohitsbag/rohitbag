import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/rohitbagh', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/rohitbagh', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/rohitbagh', label: 'Twitter' },
    { icon: Mail, href: 'mailto:rohit@example.com', label: 'Email' },
  ]

  const footerLinks = [
    { path: '/', label: 'Home' },
    { path: '/story', label: 'My Story' },
    { path: '/projects', label: 'Projects' },
    { path: '/advice-museum', label: 'Advice Museum' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-display font-bold mb-4 gradient-text">
              Rohit Bagh
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Entrepreneur, AI Innovator, and Founder building the future with AI automation. 
              On a mission to make Earth a Type 1 civilization.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Ventures</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a 
                  href="https://cooper.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Cooper - AI Startup Builder
                </a>
              </li>
              <li>
                <a 
                  href="https://reachresolve.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Reach Resolve - Video Agency
                </a>
              </li>
              <li>
                <a 
                  href="https://resolvia.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Resolvia - AI Automation
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> by Rohit Bagh
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} Rohit Bagh. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
