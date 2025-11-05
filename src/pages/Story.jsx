import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, Heart, Lightbulb, TrendingUp, Code, Sparkles } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Story = () => {
  const [storyContent, setStoryContent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStory()
  }, [])

  const fetchStory = async () => {
    const { data, error } = await supabase
      .from('life_story')
      .select('*')
      .order('order_index', { ascending: true })

    if (!error && data) {
      setStoryContent(data)
    }
    setLoading(false)
  }

  const defaultStory = [
    {
      title: "The Night That Changed Everything",
      year: 2013,
      milestone_type: "childhood",
      content: `When I was in 4th standard, I used to play in my building until midnight. One night, I was alone when I noticed a luxurious car parked in front—an Audi R8, though I didn't know it then. The watchman was mysteriously absent. A stranger emerged from the car and started talking to me. What followed was a 4-5 hour night tour of Mumbai that I still can't fully recall. Was it real? Was it a dream? I don't know. But that conversation opened my eyes to reality in a way I can't explain. From that night, I decided I had to do something with my life.`,
    },
    {
      title: "Discovery of Science",
      year: 2013,
      milestone_type: "education",
      content: `My neighbor Satish had the first Wi-Fi and laptop in our building. I would go to his house and explore the internet, watching YouTube videos. That's when I discovered this "magical thing" called science. I know it sounds silly for a 4th standard kid, but I got completely addicted to science and scientific terms. I spent my summer vacations imagining and creating hypothetical sci-fi stories in my mind. My imagination was incredibly strong—I could visualize anything. That year, I scored 92%, my highest percentage ever.`,
    },
    {
      title: "The Breaking Point",
      year: 2014,
      milestone_type: "childhood",
      content: `Two days before returning from my village, I broke my left elbow. I had to stay home for more than 3 months with a bandage. During this time, I stopped talking to anyone and became introverted. When I finally went outside, I got bullied constantly—by kids my age and older, in my tuition, school, and building. This bullying gave me another powerful drive: I wanted to do something big, become famous, and gain respect. The incidents piled up—losing a friend to someone "cooler," being teased everywhere—and each one fueled my ambition.`,
    },
    {
      title: "First Innovation: Plastic to Petrol",
      year: 2019,
      milestone_type: "entrepreneurship",
      content: `In 7th standard, I started making YouTube videos (not seriously—just 3-4 random uploads in 6 months). In August 2019, I found my first best friend who understood me and listened to my stories. I taught him everything I learned and motivated him to improve. After Diwali, I uploaded a video about ordering a mop from Amazon. It spread through my society, and I got bullied so badly—not just by kids, but by aunties and uncles too—that I didn't leave my house for 3 days.

After Diwali vacation, I read a research paper on converting waste plastic into petrol. I thought, "Why not commercialize this?" My friend agreed to be my co-founder. My tuition teacher was amazed and suggested we patent it. He even gave us ₹5,000. We made a prototype and converted 100ml of petrol from 5kg of waste plastic. But to scale it as a real business, we needed legal compliance. My dad discouraged us, saying we were from a small family and couldn't do such things. We abandoned the idea.`,
    },
    {
      title: "The Hyperloop Dream",
      year: 2020,
      milestone_type: "entrepreneurship",
      content: `Inspired by a bottle cap, I designed an enhanced hyperloop technology. My co-founder and I worked on it for 1.5 months. I handled 90% of the ideation, while he did the technical calculations. We figured out our technology could travel at 3,200 km/h with 1/10th the maintenance cost and 1/100th the operational cost of Elon Musk's hyperloop. Everything was automated with AI and sensors. We just needed funding and a team.

We showed it to our science teacher, who was shocked: "Oh f*ck, what you guys have built!" She arranged a meeting with our principal. I pitched to 15 people. The principal gave us ₹500 to build a cardboard prototype, which we completed in a week. He called a friend from the Maharashtra science department. We added a third partner for fun (though he did no work). Then lockdown happened.`,
    },
    {
      title: "Betrayal and Depression",
      year: 2021,
      milestone_type: "childhood",
      content: `When lockdown ended, I joined my co-founder's tuition to spend more time working on our project. I was learning about AI (before ChatGPT existed) and hacking. I discovered a telecom loophole that gave unlimited internet at 100x bandwidth. On my 4th day at the tuition, I told my co-founder about this hack. He misunderstood and told his dad it was something illegal that could hack bank accounts.

His dad cursed my mom. We were supposed to receive ₹80,000 in funding the next day (Saturday), but I didn't go to school. On Saturday evening, my principal called and screamed at me. A rumor had spread that I used the ₹5,000 for personal expenses and scammed him. On Monday, I was called to the auditorium and publicly humiliated in front of the whole school via mic. I refunded the money (which we hadn't even spent—we sourced parts through jugaad).

My reputation was destroyed. I stopped working on the project. I fell into deep depression with suicidal thoughts. But my brother was born around this time, which helped me recover. Still, the pain never fully left—it just got hidden behind new memories.`,
    },
    {
      title: "From Scientist to Entrepreneur",
      year: 2022,
      milestone_type: "philosophy",
      content: `This betrayal taught me a crucial lesson: without money, you have no power, respect, or anything. Even revolutionary technology is worthless without the capital to make it real. My hyperloop could have changed transportation, but I couldn't build it because I had no money.

This shifted my mindset from scientist to entrepreneur. I realized that even if I discovered the cure for cancer in one tablet, it would be worthless unless I could build a company to distribute and sell it. I was still interested in science, but no longer addicted. I started learning about philosophy, different religions, and the meaning of life.

I discovered the concept of "types of civilization" and how insignificant we are in the universe. I set a new mission: to make Earth a Type 1 civilization before I die. This mission gave me hope and a reason to stay alive during tough times.`,
    },
    {
      title: "Content Creator Phase",
      year: 2023,
      milestone_type: "entrepreneurship",
      content: `I got distracted and started watching YouTube a lot. My life goals shifted—I wanted to become a content creator. I convinced myself that if I became successful at content creation, I could complete my mission more easily. I focused 100% on creating YouTube videos and got addicted to Minecraft.

My academic performance dropped. I got 55% in 11th standard and almost failed Math. But I consider 2023 my prime because I made massive personal growth in terms of mindset. I was inspired by MrBeast—his work ethic, mindset, and especially his philanthropy, which I always wanted to do.

I grew from 78 to 1,024 subscribers in 11 days. I decided to focus on quality over quantity and learned video editing. But video editing took too much time, so I decided to hire an editor. I offered freelancing at ridiculous prices (₹5 for 1 minute, ₹20 for 10 minutes) but got no clients. Fortunately—it would have been slavery.`,
    },
    {
      title: "Finding My Co-Founder Dynamic",
      year: 2024,
      milestone_type: "entrepreneurship",
      content: `I hired editors through a poster on Canva. I got 22 submissions and chose 3 people. One thought I was offering 50% of my channel (which wasn't the case), and we had a fight. Another editor, Dynamic, helped me through it.

After the fight, I stopped uploading for 3-4 months. Our financial situation was tough—a relative scammed ₹1 lakh from my dad. My marks were dropping, I had teenage tantrums, and I had suicidal thoughts again. I shared everything with Dynamic. He scolded me first, then we talked. I shared my vision and ambition. He connected with it—he wanted something similar.

We decided to partner up. We formed a group called "Creator Force" with 6 members, inspired by the PayPal Mafia. We started our first business (something with influencers/content creators), but one member wasn't hardworking enough. We dropped the group and formed a new one with just Dynamic and me.`,
    },
    {
      title: "Building Reach Resolve",
      year: 2024,
      milestone_type: "entrepreneurship",
      content: `We tried building a website using affiliate links from Amazon and Flipkart to offer 5% more discounts, but it wasn't legal and we lacked technical knowledge. We abandoned it and started freelancing together—Dynamic made videos.

On June 5, 2024, we signed our first international client for our agency, Reach Resolve. By December, we had made around $1,500 in revenue. I was working 14-16 hours a day on average. In March, I decided to drop out of college because my agency was doing well and college wasn't adding value—I'd already learned everything from YouTube, AI, and online courses.

We were also exploring SMMA (social media marketing agency) on the side to scale faster. But after 2 months, we realized it was too saturated and we didn't have proper skills in running paid ads. We abandoned SMMA.`,
    },
    {
      title: "The Philosophy Shift",
      year: 2024,
      milestone_type: "philosophy",
      content: `In early 2024, while studying philosophy, I came across a thought that haunted me: even if I do philanthropy like MrBeast, people will still be poor and helpless. If I feed someone for one day, they'll still be hungry tomorrow. How can this problem be permanently solved? Someone needs to pay for philanthropy, and that someone won't be alive forever.

I was watching a creator called Fukra Insaan who made a video where he built a business in 24 hours and gave it away to a subscriber. Then he made another in one week and gave it away. This gave me an idea: what if I made businesses and gave them to people who really want the opportunity to grow and become self-sufficient? Not philanthropy for the sake of it, but to make people truly independent and give them a chance to escape their situation.

But at that time, I didn't have a way to execute this vision. I put it aside.`,
    },
    {
      title: "The Birth of Cooper",
      year: 2024,
      milestone_type: "entrepreneurship",
      content: `In June 2025, we started learning AI automation and launched Resolvia, our AI automation agency. We learned n8n, cloud infrastructure, AI agents, and algorithms. In August, we started reaching out to clients but didn't get any because we focused too much on learning and not enough on outreach.

In September, I realized: if this continues, our lives won't change—they might get worse. I told Dynamic we should start a startup on the side. He said to give it 15 more days for client acquisition. We didn't get clients, so we started validating our 5-10 startup ideas. None of them had real demand or were good to build right now.

We spent 3 weeks brainstorming. Then, while washing dishes, I had an "aha moment": what if we build something that helps people find startup ideas? I kept building on this idea: what if it also generates the website? What if it has a marketing agent? What if it integrates automation for local businesses?

When I told Dynamic, he polished the idea, and we decided to work on it. It came from a real problem. As Michael Seibel from Y Combinator said, ideas that come from "aha moments" are the best ones.`,
    },
    {
      title: "Cooper: The Vision Realized",
      year: 2025,
      milestone_type: "entrepreneurship",
      content: `Cooper is the culmination of everything. It's an AI-powered platform that helps entrepreneurs validate startup ideas and build complete businesses automatically—with websites, marketing, and automation integrated.

This connects directly to that philosophy problem I struggled with years ago. I'm not just doing philanthropy—I'm making people self-sufficient. I'm giving them the opportunity to come out of their situation and never be helpless again. Just like Fukra Insaan, but scaled to millions of people thanks to AI.

This is how I'll make Earth a Type 1 civilization. This is how I'll fulfill the mission that kept me alive through depression, betrayal, and suicidal thoughts. This is why I work 14-16 hours a day. This is why I dropped out of college. This is why every failure, every bully, every setback was worth it.

I'm 19 years old, and I'm just getting started.`,
    },
  ]

  const milestones = storyContent.length > 0 ? storyContent : defaultStory

  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'childhood':
        return Heart
      case 'education':
        return Book
      case 'entrepreneurship':
        return TrendingUp
      case 'philosophy':
        return Lightbulb
      default:
        return Sparkles
    }
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
              <Book className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              My <span className="gradient-text">Story</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From a curious kid with borrowed Wi-Fi to an entrepreneur building the future with AI. 
              This is the unfiltered journey of ambition, failure, and relentless pursuit of a vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => {
              const Icon = getMilestoneIcon(milestone.milestone_type)
              const [ref, isVisible] = useScrollReveal()
              
              return (
                <motion.div
                  key={milestone.id || index}
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="mb-16 last:mb-0"
                >
                  <div className="flex gap-6">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center pt-2">
                      <div className="w-12 h-12 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 flex-grow bg-gradient-to-b from-primary-600 to-primary-200 dark:from-primary-500 dark:to-primary-800 mt-4 min-h-[100px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow pb-12">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        {milestone.year && (
                          <div className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-3">
                            {milestone.year}
                          </div>
                        )}
                        <h2 className="text-2xl font-display font-bold mb-4">
                          {milestone.title}
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                            {milestone.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              The Journey Continues
            </h2>
            <p className="text-xl mb-8 opacity-90">
              This is just the beginning. Every day is a step closer to making Earth a Type 1 civilization. 
              Every project is an opportunity to empower someone. Every failure is a lesson in resilience.
            </p>
            <p className="text-2xl font-semibold">
              I'm 19 years old, and I'm just getting started.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Story
