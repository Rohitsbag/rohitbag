import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Check, X, Trash2 } from 'lucide-react'

const AdviceManager = () => {
  const [advice, setAdvice] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAdvice()
  }, [filter])

  const fetchAdvice = async () => {
    let query = supabase.from('advice_museum').select('*').order('submission_date', { ascending: false })
    
    if (filter === 'pending') {
      query = query.eq('is_approved', false)
    } else if (filter === 'approved') {
      query = query.eq('is_approved', true)
    }
    
    const { data, error } = await query
    if (!error && data) setAdvice(data)
    setLoading(false)
  }

  const handleApprove = async (id) => {
    await supabase.from('advice_museum').update({ 
      is_approved: true, 
      approved_date: new Date().toISOString() 
    }).eq('id', id)
    fetchAdvice()
  }

  const handleReject = async (id) => {
    await supabase.from('advice_museum').update({ is_approved: false }).eq('id', id)
    fetchAdvice()
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this advice?')) {
      await supabase.from('advice_museum').delete().eq('id', id)
      fetchAdvice()
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Advice Museum Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and approve advice submissions</p>
      </div>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg ${filter === 'approved' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          All
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {filter === 'pending' ? 'Pending' : filter === 'approved' ? 'Approved' : 'All'} Advice ({advice.length})
        </h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : advice.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No advice found</p>
        ) : (
          <div className="space-y-4">
            {advice.map((item) => (
              <div key={item.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-lg italic mb-2">"{item.advice}"</p>
                    <div className="text-sm text-gray-500">
                      <p>By: {item.author_name || 'Anonymous'}</p>
                      <p>Email: {item.author_email || 'Not provided'}</p>
                      <p>Submitted: {new Date(item.submission_date).toLocaleString()}</p>
                      {item.is_approved && item.approved_date && (
                        <p>Approved: {new Date(item.approved_date).toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!item.is_approved && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded"
                        title="Approve"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    {item.is_approved && (
                      <button
                        onClick={() => handleReject(item.id)}
                        className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900 rounded"
                        title="Unapprove"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdviceManager
