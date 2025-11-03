import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, Github, Sparkles, TrendingUp, Code } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })

    if (!error && data) {
      setProjects(data)
    } else {
      setProjects(defaultProjects)
    }
    setLoading(false)
  }

  const defaultProjects = [
    {
      id: 1,
      name: 'Cooper',
      description: 'AI-powered platform that helps entrepreneurs validate startup ideas and build complete businesses automatically',
      long_description: 'Cooper is the culmination of my vision to democratize entrepreneurship. It uses AI to help people validate startup ideas, generate websites, automate marketing, and create complete business solutions. This solves the problem I identified: giving people sustainable opportunities rather than temporary philanthropy. Built with cutting-edge AI agents, n8n automation, and cloud infrastructure.',
      status: 'active',
      category: 'startup',
      year_started: 2024,
      tags: ['AI', 'SaaS', 'Automation', 'Entrepreneurship', 'Web3'],
      website_url: 'https://cooper.app',
      featured: true,
    },
    {
      id: 2,
      name: 'Reach Resolve',
      description: 'Video editing agency serving international clients with high-quality content production',
      long_description: 'Founded with my co-founder Dynamic in 2024, Reach Resolve started as a video editing agency and has grown to serve international clients across multiple industries. We\'ve generated $1,500+ in revenue while working 14-16 hours daily. This venture taught me invaluable lessons about client service, scaling operations, team management, and building sustainable business models. We handle everything from YouTube content to corporate videos.',
      status: 'active',
      category: 'agency',
      year_started: 2024,
      tags: ['Video Editing', 'Content Creation', 'Agency', 'B2B'],
      website_url: 'https://reachresolve.com',
      featured: true,
    },
    {
      id: 3,
      name: 'Resolvia',
      description: 'AI automation agency helping local businesses scale through intelligent automation',
      long_description: 'Resolvia focuses on bringing AI automation to local businesses, helping them streamline operations and scale efficiently. We build custom automation solutions using tools like n8n, AI agents, and cloud infrastructure. Our solutions help businesses reduce operational costs, improve efficiency, and focus on growth. From automating customer support to building intelligent workflows, we make AI accessible to businesses of all sizes.',
      status: 'active',
      category: 'agency',
      year_started: 2024,
      tags: ['AI', 'Automation', 'B2B', 'Agency', 'n8n'],
      website_url: 'https://resolvia.com',
      featured: true,
    },
    {
      id: 4,
      name: 'Hyperloop Enhanced Technology',
      description: 'Revolutionary travel technology capable of 3,200 km/h with AI-powered automation',
      long_description: 'At 14 years old, I designed an enhanced hyperloop technology inspired by a simple bottle cap. Working with my co-founder, we calculated that our system could travel at 3,200 km/h with 1/10th the maintenance cost and 1/100th the operational cost of existing hyperloop concepts. Everything was automated with AI, sensors, and strong algorithms. We pitched to our school principal and received initial funding for a prototype. Though the project was abandoned due to circumstances, it taught me about innovation, technical feasibility, and the importance of funding.',
      status: 'archived',
      category: 'experiment',
      year_started: 2020,
      tags: ['Transportation', 'AI', 'Innovation', 'Physics'],
      featured: false,
    },
    {
      id: 5,
      name: 'Plastic to Petrol Technology',
      description: 'Converting waste plastic into usable petrol - my first entrepreneurial venture',
      long_description: 'At 13 years old, I read a research paper on converting waste plastic into petrol and thought, "Why not commercialize this?" With my first co-founder and support from my tuition teacher, we built a prototype that converted 100ml of petrol from 5kg of waste plastic. We received ₹5,000 in funding and were pursuing a patent. Though we eventually abandoned the project due to legal compliance requirements and lack of support, it was my first taste of entrepreneurship and taught me about innovation, prototyping, and the gap between invention and commercialization.',
      status: 'archived',
      category: 'experiment',
      year_started: 2019,
      tags: ['Environment', 'Innovation', 'Chemistry', 'Sustainability'],
      featured: false,
    },
    {
      id: 6,
      name: 'Creator Force',
      description: 'Content creator collective inspired by PayPal Mafia',
      long_description: 'A group of 6 content creators coming together to share dark ambitions and build businesses together. Though the group eventually disbanded due to varying commitment levels, it was an important stepping stone in finding my true co-founder Dynamic and learning about team dynamics, shared vision, and the importance of work ethic alignment.',
      status: 'archived',
      category: 'experiment',
      year_started: 2024,
      tags: ['Content Creation', 'Community', 'Collaboration'],
      featured: false,
    },
  ]

  const activeProjects = projects.filter(p => p.status === 'active')
  const archivedProjects = projects.filter(p => p.status !== 'active')

  const ProjectCard = ({ project, index }) => {
    const [ref, isVisible] = useScrollReveal()

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">{project.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags && project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {project.featured && (
              <Sparkles className="w-6 h-6 text-yellow-500 flex-shrink-0" />
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>

          {project.long_description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-3">
              {project.long_description}
            </p>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              {project.year_started && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Est. {project.year_started}
                </span>
              )}
              <span className={`text-sm px-2 py-1 rounded-full ${
                project.status === 'active'
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="flex space-x-2">
              {project.website_url && (
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Visit website"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
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
              <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From revolutionary transportation technology at 14 to AI-powered startups at 19. 
              Each project is a step toward making Earth a Type 1 civilization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Active Projects */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h2 className="text-3xl font-display font-bold">Active Projects</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activeProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Archived Projects */}
      {archivedProjects.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Code className="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
              <h2 className="text-3xl font-display font-bold">Past Experiments</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {archivedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Want to Collaborate?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              I'm always open to working on innovative projects that create real impact. 
              Whether it's AI automation, startup ideas, or something completely new—let's build the future together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Get in Touch
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects
