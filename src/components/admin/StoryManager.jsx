import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

const StoryManager = () => {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    year: new Date().getFullYear(),
    milestone_type: 'childhood',
    order_index: 0,
    is_featured: false,
  })

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('life_story')
      .select('*')
      .order('order_index')
    
    if (!error && data) setStories(data)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (editing) {
      const { error } = await supabase
        .from('life_story')
        .update(formData)
        .eq('id', editing)
      
      if (!error) {
        fetchStories()
        resetForm()
      }
    } else {
      const { error } = await supabase
        .from('life_story')
        .insert([formData])
      
      if (!error) {
        fetchStories()
        resetForm()
      }
    }
  }

  const handleEdit = (story) => {
    setEditing(story.id)
    setFormData(story)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await supabase.from('life_story').delete().eq('id', id)
      fetchStories()
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      title: '',
      content: '',
      year: new Date().getFullYear(),
      milestone_type: 'childhood',
      order_index: 0,
      is_featured: false,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Life Story Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add and manage your life story milestones
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editing ? 'Edit Entry' : 'Add New Entry'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <select
                value={formData.milestone_type}
                onChange={(e) => setFormData({...formData, milestone_type: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="childhood">Childhood</option>
                <option value="education">Education</option>
                <option value="entrepreneurship">Entrepreneurship</option>
                <option value="philosophy">Philosophy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Order Index</label>
              <input
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Content *</label>
            <textarea
              required
              rows="6"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="featured">Featured</label>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Entries ({stories.length})</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : stories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No entries yet</p>
        ) : (
          <div className="space-y-4">
            {stories.map((story) => (
              <div key={story.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{story.title}</h3>
                    <p className="text-sm text-gray-500">{story.year} • {story.milestone_type}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">{story.content}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(story)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default StoryManager
