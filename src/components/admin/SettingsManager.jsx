import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { Save, RefreshCw } from 'lucide-react'

const SettingsManager = () => {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    const { data, error } = await supabase.from('site_settings').select('*')
    if (!error && data) {
      const settingsObj = {}
      data.forEach(setting => {
        settingsObj[setting.key] = setting.value
      })
      setSettings(settingsObj)
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString()
    }))

    for (const update of updates) {
      await supabase
        .from('site_settings')
        .upsert(update, { onConflict: 'key' })
    }

    setSaving(false)
    alert('Settings saved successfully!')
  }

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  if (loading) {
    return <div className="text-center py-12">Loading settings...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Site Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure global website settings</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Site Title</label>
            <input
              type="text"
              value={settings.site_title || ''}
              onChange={(e) => handleChange('site_title', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Site Tagline</label>
            <input
              type="text"
              value={settings.site_tagline || ''}
              onChange={(e) => handleChange('site_tagline', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
            <textarea
              rows="2"
              value={settings.hero_subtitle || ''}
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Contact Email</label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Twitter URL</label>
              <input
                type="url"
                value={settings.twitter_url || ''}
                onChange={(e) => handleChange('twitter_url', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">GitHub URL</label>
              <input
                type="url"
                value={settings.github_url || ''}
                onChange={(e) => handleChange('github_url', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="pt-6 border-t dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Feature Toggles</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enable_dark_mode === 'true'}
                  onChange={(e) => handleChange('enable_dark_mode', e.target.checked ? 'true' : 'false')}
                  className="mr-2"
                />
                Enable Dark Mode
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enable_accessibility_mode === 'true'}
                  onChange={(e) => handleChange('enable_accessibility_mode', e.target.checked ? 'true' : 'false')}
                  className="mr-2"
                />
                Enable Accessibility Mode
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enable_advice_museum === 'true'}
                  onChange={(e) => handleChange('enable_advice_museum', e.target.checked ? 'true' : 'false')}
                  className="mr-2"
                />
                Enable Advice Museum
              </label>
            </div>
          </div>

          <div className="pt-6 border-t dark:border-gray-700">
            <div>
              <label className="block text-sm font-semibold mb-2">Max Advice Submissions Per Day (per IP)</label>
              <input
                type="number"
                value={settings.max_advice_per_day || '5'}
                onChange={(e) => handleChange('max_advice_per_day', e.target.value)}
                className="w-32 px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-400 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>
              )}
            </button>
            <button
              onClick={fetchSettings}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsManager
