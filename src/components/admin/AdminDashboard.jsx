import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, FileText, Briefcase, Lightbulb, Mail, TrendingUp, Eye } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStories: 0,
    totalProjects: 0,
    pendingAdvice: 0,
    unreadContacts: 0,
    totalAdvice: 0,
    totalContacts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [stories, projects, advicePending, adviceTotal, contactsUnread, contactsTotal] = await Promise.all([
        supabase.from('life_story').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('advice_museum').select('id', { count: 'exact', head: true }).eq('is_approved', false),
        supabase.from('advice_museum').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('status', 'unread'),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        totalStories: stories.count || 0,
        totalProjects: projects.count || 0,
        pendingAdvice: advicePending.count || 0,
        totalAdvice: adviceTotal.count || 0,
        unreadContacts: contactsUnread.count || 0,
        totalContacts: contactsTotal.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      icon: FileText,
      label: 'Life Story Entries',
      value: stats.totalStories,
      color: 'bg-blue-500',
      link: '/admin/story',
    },
    {
      icon: Briefcase,
      label: 'Projects',
      value: stats.totalProjects,
      color: 'bg-purple-500',
      link: '/admin/projects',
    },
    {
      icon: Lightbulb,
      label: 'Pending Advice',
      value: stats.pendingAdvice,
      color: 'bg-yellow-500',
      link: '/admin/advice',
      badge: stats.pendingAdvice > 0,
    },
    {
      icon: Mail,
      label: 'Unread Messages',
      value: stats.unreadContacts,
      color: 'bg-red-500',
      link: '/admin/contacts',
      badge: stats.unreadContacts > 0,
    },
    {
      icon: Lightbulb,
      label: 'Total Advice',
      value: stats.totalAdvice,
      color: 'bg-green-500',
      link: '/admin/advice',
    },
    {
      icon: Mail,
      label: 'Total Contacts',
      value: stats.totalContacts,
      color: 'bg-indigo-500',
      link: '/admin/contacts',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's an overview of your website.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.a
                key={stat.label}
                href={stat.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                {stat.badge && (
                  <div className="absolute top-3 right-3">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  </div>
                )}
                <div className="mt-4 text-sm text-primary-600 dark:text-primary-400 group-hover:underline">
                  View Details →
                </div>
              </motion.a>
            )
          })}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-display font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/story"
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all text-center"
          >
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="font-semibold">Add Story Entry</p>
          </a>
          <a
            href="/admin/projects"
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all text-center"
          >
            <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="font-semibold">Add Project</p>
          </a>
          <a
            href="/admin/advice"
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all text-center"
          >
            <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-semibold">Review Advice</p>
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition-all text-center"
          >
            <Eye className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="font-semibold">View Website</p>
          </a>
        </div>
      </div>

      {/* Recent Activity - Placeholder for future enhancement */}
      <div className="mt-8">
        <h2 className="text-2xl font-display font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            Activity tracking coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
