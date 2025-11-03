import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Edit, Trash2, Save, X } from 'lucide-react'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    long_description: '',
    status: 'active',
    category: 'startup',
    year_started: new Date().getFullYear(),
    tags: '',
    website_url: '',
    github_url: '',
    featured: false,
    order_index: 0,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('order_index')
    if (!error && data) setProjects(data)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    const payload = { ...formData, tags }
    
    if (editing) {
      await supabase.from('projects').update(payload).eq('id', editing)
    } else {
      await supabase.from('projects').insert([payload])
    }
    
    fetchProjects()
    resetForm()
  }

  const handleEdit = (project) => {
    setEditing(project.id)
    setFormData({
      ...project,
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (confirm('Delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      fetchProjects()
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      name: '',
      description: '',
      long_description: '',
      status: 'active',
      category: 'startup',
      year_started: new Date().getFullYear(),
      tags: '',
      website_url: '',
      github_url: '',
      featured: false,
      order_index: 0,
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Projects Manager</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit' : 'Add'} Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              placeholder="Project Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="number"
              placeholder="Year Started"
              value={formData.year_started}
              onChange={(e) => setFormData({...formData, year_started: parseInt(e.target.value)})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="startup">Startup</option>
              <option value="agency">Agency</option>
              <option value="experiment">Experiment</option>
              <option value="open-source">Open Source</option>
            </select>
          </div>
          
          <textarea
            required
            rows="2"
            placeholder="Short Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />
          
          <textarea
            rows="4"
            placeholder="Long Description"
            value={formData.long_description}
            onChange={(e) => setFormData({...formData, long_description: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />

          <input
            placeholder="Tags (comma-separated)"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Website URL"
              value={formData.website_url}
              onChange={(e) => setFormData({...formData, website_url: e.target.value})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              placeholder="GitHub URL"
              value={formData.github_url}
              onChange={(e) => setFormData({...formData, github_url: e.target.value})}
              className="px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="mr-2"
              />
              Featured
            </label>
            <input
              type="number"
              placeholder="Order"
              value={formData.order_index}
              onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
              className="w-24 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2">
              <Save className="w-4 h-4" />
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2">
                <X className="w-4 h-4" />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">All Projects ({projects.length})</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.category} • {project.status}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded">
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

export default ProjectsManager
