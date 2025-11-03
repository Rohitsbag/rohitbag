import React from 'react'
import { Phone, MessageCircle, Mail, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

const MobileShortcuts = () => {
  const shortcuts = [
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:rohit@example.com',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: Phone,
      label: 'Call',
      href: 'tel:+1234567890',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
      icon: Bell,
      label: 'Subscribe',
      onClick: () => {
        const email = prompt('Enter your email to subscribe to updates:')
        if (email) {
          alert('Thank you for subscribing! (This is a demo)')
        }
      },
      color: 'bg-orange-500 hover:bg-orange-600',
    },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-40 no-print"
    >
      <div className="flex justify-around items-center py-2">
        {shortcuts.map((shortcut) => {
          const Icon = shortcut.icon
          const Component = shortcut.href ? 'a' : 'button'
          
          return (
            <Component
              key={shortcut.label}
              href={shortcut.href}
              onClick={shortcut.onClick}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-transform active:scale-95 ${
                !shortcut.href ? 'cursor-pointer' : ''
              }`}
              aria-label={shortcut.label}
            >
              <div className={`p-2 rounded-full ${shortcut.color} text-white mb-1`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {shortcut.label}
              </span>
            </Component>
          )
        })}
      </div>
    </motion.div>
  )
}

export default MobileShortcuts
