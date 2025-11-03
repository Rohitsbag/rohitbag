import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MessageCircle, Linkedin, Github, Twitter, CheckCircle, XCircle, Phone } from 'lucide-react'
import { supabase } from '../lib/supabase'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'rohit@example.com',
      href: 'mailto:rohit@example.com',
      description: 'Best for detailed inquiries',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: '@rohitbagh',
      href: 'https://linkedin.com/in/rohitbagh',
      description: 'Professional networking',
    },
    {
      icon: Twitter,
      title: 'Twitter',
      value: '@rohitbagh',
      href: 'https://twitter.com/rohitbagh',
      description: 'Quick updates and thoughts',
    },
    {
      icon: Github,
      title: 'GitHub',
      value: '@rohitbagh',
      href: 'https://github.com/rohitbagh',
      description: 'Check out my code',
    },
  ]

  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 dark:bg-primary-900">
              <MessageCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have a project idea? Want to collaborate? Looking for AI automation or video editing services? 
              Or just want to chat about building the future? I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <motion.a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold mb-1">{method.title}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">{method.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                Send Me a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-semibold mb-2"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-semibold mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-semibold mb-2"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-semibold mb-2"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell me about your project, idea, or what you'd like to discuss..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 flex items-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Thank you! Your message has been sent. I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 flex items-center"
                >
                  <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Oops! Something went wrong. Please try again or email me directly.</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-center mb-8">
              What I Can Help With
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">AI Automation (Resolvia)</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Custom AI automation solutions</li>
                  <li>• Workflow optimization with n8n</li>
                  <li>• AI agents and chatbots</li>
                  <li>• Cloud infrastructure setup</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Video Editing (Reach Resolve)</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• YouTube content editing</li>
                  <li>• Corporate videos</li>
                  <li>• Social media content</li>
                  <li>• High-quality post-production</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Startup Consulting</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Idea validation and feedback</li>
                  <li>• AI integration strategies</li>
                  <li>• Product development guidance</li>
                  <li>• Growth and scaling advice</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Joint venture opportunities</li>
                  <li>• Technical co-founding</li>
                  <li>• Innovation partnerships</li>
                  <li>• Speaking and mentoring</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact
