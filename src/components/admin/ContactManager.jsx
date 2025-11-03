import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, Trash2, Eye, Archive } from 'lucide-react'

const ContactManager = () => {
  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('unread')
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [filter])

  const fetchContacts = async () => {
    let query = supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    
    if (filter !== 'all') {
      query = query.eq('status', filter)
    }
    
    const { data, error } = await query
    if (!error && data) setContacts(data)
    setLoading(false)
  }

  const handleStatusChange = async (id, status) => {
    await supabase.from('contact_submissions').update({ status }).eq('id', id)
    fetchContacts()
    if (selectedContact?.id === id) {
      setSelectedContact({ ...selectedContact, status })
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this message?')) {
      await supabase.from('contact_submissions').delete().eq('id', id)
      fetchContacts()
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
    }
  }

  const viewContact = async (contact) => {
    setSelectedContact(contact)
    if (contact.status === 'unread') {
      await handleStatusChange(contact.id, 'read')
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Contact Submissions</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage contact form submissions</p>
      </div>

      <div className="mb-6 flex gap-2">
        <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-lg ${filter === 'unread' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          Unread
        </button>
        <button onClick={() => setFilter('read')} className={`px-4 py-2 rounded-lg ${filter === 'read' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          Read
        </button>
        <button onClick={() => setFilter('replied')} className={`px-4 py-2 rounded-lg ${filter === 'replied' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          Replied
        </button>
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
          All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Messages ({contacts.length})</h2>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : contacts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages</p>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => viewContact(contact)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedContact?.id === contact.id 
                      ? 'bg-primary-100 dark:bg-primary-900' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold truncate ${contact.status === 'unread' ? 'text-primary-600' : ''}`}>
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{contact.subject}</p>
                      <p className="text-xs text-gray-400">{new Date(contact.created_at).toLocaleDateString()}</p>
                    </div>
                    {contact.status === 'unread' && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full flex-shrink-0 ml-2 mt-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {selectedContact ? (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedContact.subject}</h2>
                  <div className="text-sm text-gray-500">
                    <p>From: {selectedContact.name} ({selectedContact.email})</p>
                    <p>Date: {new Date(selectedContact.created_at).toLocaleString()}</p>
                    <p>Status: <span className="capitalize">{selectedContact.status}</span></p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    className="px-3 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="font-semibold mb-2">Message:</h3>
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{selectedContact.message}</p>
              </div>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Mail className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactManager
