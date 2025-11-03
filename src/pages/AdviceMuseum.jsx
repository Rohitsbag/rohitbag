import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Send, Quote, CheckCircle, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

const AdviceMuseum = () => {
  const [adviceList, setAdviceList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    advice: '',
    author_name: '',
    author_email: '',
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    fetchAdvice()
  }, [])

  const fetchAdvice = async () => {
    const { data, error } = await supabase
      .from('advice_museum')
      .select('*')
      .eq('is_approved', true)
      .order('submission_date', { ascending: false })

    if (!error && data) {
      setAdviceList(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      const { error } = await supabase
        .from('advice_museum')
        .insert([
          {
            advice: formData.advice,
            author_name: formData.author_name || 'Anonymous',
            author_email: formData.author_email || null,
          },
        ])

      if (error) throw error

      setSubmitStatus('success')
      setFormData({ advice: '', author_name: '', author_email: '' })
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Error submitting advice:', error)
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const AdviceCard = ({ advice, index }) => {
    const [ref, isVisible] = useScrollReveal()

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-gradient-to-br from-white to-primary-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-primary-100 dark:border-gray-600"
      >
        <Quote className="w-8 h-8 text-primary-400 dark:text-primary-500 mb-3" />
        <p className="text-gray-700 dark:text-gray-200 mb-4 italic text-lg">
          "{advice.advice}"
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            — {advice.author_name || 'Anonymous'}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {new Date(advice.submission_date).toLocaleDateString()}
          </span>
        </div>
      </motion.div>
    )
  }

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
              <Lightbulb className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              The <span className="gradient-text">Advice Museum</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              A collective wall of wisdom. Share a piece of life advice that changed your perspective, 
              taught you something valuable, or simply resonates with you. Your words might be exactly 
              what someone else needs to hear today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Submission Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-display font-bold mb-6 text-center">
              Share Your Advice
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="advice" 
                  className="block text-sm font-semibold mb-2"
                >
                  Your Life Advice <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="advice"
                  name="advice"
                  value={formData.advice}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Share a piece of wisdom that has shaped your journey..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="author_name" 
                    className="block text-sm font-semibold mb-2"
                  >
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="author_name"
                    name="author_name"
                    value={formData.author_name}
                    onChange={handleChange}
                    placeholder="Anonymous"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="author_email" 
                    className="block text-sm font-semibold mb-2"
                  >
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="author_email"
                    name="author_email"
                    value={formData.author_email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.advice.trim()}
                className="w-full flex items-center justify-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 w-5 h-5" />
                    Submit Advice
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Your advice will be reviewed before appearing on the wall. This helps maintain quality and prevent spam.
              </p>
            </form>

            {/* Submit Status Messages */}
            <AnimatePresence>
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-lg flex items-center ${
                    submitStatus === 'success'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                  }`}
                >
                  {submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Thank you! Your advice has been submitted and is awaiting approval.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                      <span>Oops! Something went wrong. Please try again.</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Advice Wall */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            The Wisdom Wall
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : adviceList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {adviceList.map((advice, index) => (
                <AdviceCard key={advice.id} advice={advice} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Lightbulb className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Be the first to share your wisdom! Your advice could inspire someone today.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-display font-bold mb-4">
              Why the Advice Museum?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Throughout my journey, countless pieces of advice from strangers, mentors, books, and 
              experiences have shaped who I am today. This museum is a space to collect and share 
              those transformative insights.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Your advice doesn't need to be profound or perfect. Sometimes the simplest truths 
              have the biggest impact. Share what you wish someone had told you earlier.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AdviceMuseum
