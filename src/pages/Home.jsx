import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, Brain, Heart, Target, Lightbulb, Users } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import RohitLogo from '../TigerRohitLOGO.svg'

const Home = () => {
  const [heroRef, heroVisible] = useScrollReveal()
  const [missionRef, missionVisible] = useScrollReveal()
  const [valuesRef, valuesVisible] = useScrollReveal()

  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Pushing boundaries with AI and automation to solve real-world problems',
    },
    {
      icon: Heart,
      title: 'Impact',
      description: 'Creating sustainable opportunities, not temporary solutions',
    },
    {
      icon: Users,
      title: 'Empowerment',
      description: 'Democratizing entrepreneurship and making success accessible to all',
    },
    {
      icon: Target,
      title: 'Vision',
      description: 'Building towards a Type 1 civilization, one breakthrough at a time',
    },
  ]

  const journey = [
    {
      year: '2013',
      title: 'The Spark',
      description: 'A mysterious night ride in an Audi R8 opened my eyes to possibilities beyond my reality',
    },
    {
      year: '2019',
      title: 'First Innovation',
      description: 'Developed technology to convert waste plastic into petrol at age 14',
    },
    {
      year: '2020',
      title: 'Hyperloop Vision',
      description: 'Created revolutionary travel technology capable of 3200 km/h with AI automation',
    },
    {
      year: '2023',
      title: 'Content Creator',
      description: 'Grew YouTube channel from 78 to 1024 subscribers in 11 days, inspired by MrBeast',
    },
    {
      year: '2024',
      title: 'Entrepreneur',
      description: 'Founded Reach Resolve video agency, generated $1,500+ revenue working 14-16 hours daily',
    },
    {
      year: '2024',
      title: 'AI Pioneer',
      description: 'Launched Resolvia AI automation agency and started building Cooper',
    },
    {
      year: '2025',
      title: 'Mission Forward',
      description: 'Building Cooper to democratize entrepreneurship and create self-sufficient opportunities',
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 p-1">
              <img src={RohitLogo} alt="Rohit Bag Logo" className="w-full h-full rounded-full" />
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Rohit Bag</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
              Entrepreneur, AI Innovator & Founder
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Building the future with AI automation | Co-founder of Cooper & Reach Resolve | 
              On a mission to make Earth a Type 1 civilization
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/story"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Read My Story
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-semibold"
              >
                View Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0 }}
            animate={missionVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100 dark:bg-primary-900">
              <Rocket className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              My Mission
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                From a curious kid exploring science with borrowed Wi-Fi to an entrepreneur working 
                14-16 hours daily, my journey has been anything but ordinary. At 19, I've already 
                built multiple ventures, created revolutionary technologies, and learned that true 
                success isn't just about making money—it's about creating lasting impact.
              </p>
              
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                "Even if I feed someone for one day, they'll still be hungry tomorrow. But if I give 
                them the tools to build their own business, they'll never be helpless again."
              </p>
              
              <p>
                This realization led me to Cooper—an AI platform that doesn't just validate startup 
                ideas but builds complete, automated businesses. It's not philanthropy for the sake 
                of it; it's about making people self-sufficient and giving them the opportunity to 
                come out of their situation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0 }}
            animate={valuesVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={valuesVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 mb-4 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            The Journey
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {journey.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-12 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < journey.length - 1 && (
                    <div className="w-0.5 flex-grow bg-primary-200 dark:bg-primary-800 mt-2" />
                  )}
                </div>
                
                <div className="pb-12">
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/story"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Read the Full Story
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Lightbulb className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Let's Build the Future Together
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Whether you're looking for AI automation, video editing services, or want to collaborate 
            on innovative projects, I'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
