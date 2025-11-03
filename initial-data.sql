-- =====================================================
-- INITIAL DATA FOR ROHIT'S WEBSITE
-- =====================================================
-- Run this AFTER running supabase-schema.sql
-- This will populate the site with Rohit's actual content
-- =====================================================

-- Clear existing data (optional - remove if you want to keep existing data)
-- TRUNCATE life_story, projects CASCADE;

-- =====================================================
-- ROHIT'S LIFE STORY
-- =====================================================

INSERT INTO life_story (title, content, year, milestone_type, order_index, is_featured) VALUES
('The Night That Changed Everything', 
'When I was in 4th standard, I used to play in my building until midnight. One night, I was alone when I noticed a luxurious car parked in front—an Audi R8, though I didn''t know it then. The watchman was mysteriously absent. A stranger emerged from the car and started talking to me. What followed was a 4-5 hour night tour of Mumbai that I still can''t fully recall. Was it real? Was it a dream? I don''t know. But that conversation opened my eyes to reality in a way I can''t explain. From that night, I decided I had to do something with my life.',
2013, 'childhood', 1, true),

('Discovery of Science',
'My neighbor Satish had the first Wi-Fi and laptop in our building. I would go to his house and explore the internet, watching YouTube videos. That''s when I discovered this "magical thing" called science. I know it sounds silly for a 4th standard kid, but I got completely addicted to science and scientific terms. I spent my summer vacations imagining and creating hypothetical sci-fi stories in my mind. My imagination was incredibly strong—I could visualize anything. That year, I scored 92%, my highest percentage ever.',
2013, 'education', 2, false),

('The Breaking Point',
'Two days before returning from my village, I broke my left elbow. I had to stay home for more than 3 months with a bandage. During this time, I stopped talking to anyone and became introverted. When I finally went outside, I got bullied constantly—by kids my age and older, in my tuition, school, and building. This bullying gave me another powerful drive: I wanted to do something big, become famous, and gain respect. The incidents piled up—losing a friend to someone "cooler," being teased everywhere—and each one fueled my ambition.',
2014, 'childhood', 3, false),

('First Innovation: Plastic to Petrol',
'In 7th standard, I started making YouTube videos. In August 2019, I found my first best friend who understood me and listened to my stories. After Diwali, I uploaded a video about ordering a mop from Amazon. It spread through my society, and I got bullied so badly that I didn''t leave my house for 3 days.

After Diwali vacation, I read a research paper on converting waste plastic into petrol. I thought, "Why not commercialize this?" My friend agreed to be my co-founder. My tuition teacher was amazed and suggested we patent it. He even gave us ₹5,000. We made a prototype and converted 100ml of petrol from 5kg of waste plastic. But to scale it as a real business, we needed legal compliance. My dad discouraged us, saying we were from a small family and couldn''t do such things. We abandoned the idea.',
2019, 'entrepreneurship', 4, true),

('The Hyperloop Dream',
'Inspired by a bottle cap, I designed an enhanced hyperloop technology. My co-founder and I worked on it for 1.5 months. I handled 90% of the ideation, while he did the technical calculations. We figured out our technology could travel at 3,200 km/h with 1/10th the maintenance cost and 1/100th the operational cost of Elon Musk''s hyperloop. Everything was automated with AI and sensors. We just needed funding and a team.

We showed it to our science teacher, who was shocked. She arranged a meeting with our principal. I pitched to 15 people. The principal gave us ₹500 to build a cardboard prototype, which we completed in a week. He called a friend from the Maharashtra science department. Then lockdown happened.',
2020, 'entrepreneurship', 5, true),

('Betrayal and Depression',
'When lockdown ended, I joined my co-founder''s tuition to spend more time working on our project. I was learning about AI (before ChatGPT existed) and hacking. I discovered a telecom loophole that gave unlimited internet at 100x bandwidth. On my 4th day at the tuition, I told my co-founder about this hack. He misunderstood and told his dad it was something illegal that could hack bank accounts.

His dad cursed my mom. We were supposed to receive ₹80,000 in funding the next day, but I didn''t go to school. On Saturday evening, my principal called and screamed at me. A rumor had spread that I used the ₹5,000 for personal expenses and scammed him. On Monday, I was called to the auditorium and publicly humiliated in front of the whole school via mic.

My reputation was destroyed. I stopped working on the project. I fell into deep depression with suicidal thoughts. But my brother was born around this time, which helped me recover. Still, the pain never fully left—it just got hidden behind new memories.',
2021, 'childhood', 6, true),

('From Scientist to Entrepreneur',
'This betrayal taught me a crucial lesson: without money, you have no power, respect, or anything. Even revolutionary technology is worthless without the capital to make it real. My hyperloop could have changed transportation, but I couldn''t build it because I had no money.

This shifted my mindset from scientist to entrepreneur. I realized that even if I discovered the cure for cancer in one tablet, it would be worthless unless I could build a company to distribute and sell it. I was still interested in science, but no longer addicted. I started learning about philosophy, different religions, and the meaning of life.

I discovered the concept of "types of civilization" and how insignificant we are in the universe. I set a new mission: to make Earth a Type 1 civilization before I die. This mission gave me hope and a reason to stay alive during tough times.',
2022, 'philosophy', 7, true),

('Content Creator Phase',
'I got distracted and started watching YouTube a lot. My life goals shifted—I wanted to become a content creator. I convinced myself that if I became successful at content creation, I could complete my mission more easily. I focused 100% on creating YouTube videos and got addicted to Minecraft.

My academic performance dropped. I got 55% in 11th standard and almost failed Math. But I consider 2023 my prime because I made massive personal growth in terms of mindset. I was inspired by MrBeast—his work ethic, mindset, and especially his philanthropy, which I always wanted to do.

I grew from 78 to 1,024 subscribers in 11 days. I decided to focus on quality over quantity and learned video editing. But video editing took too much time, so I decided to hire an editor.',
2023, 'entrepreneurship', 8, false),

('Finding My Co-Founder Dynamic',
'I hired editors through a poster on Canva. I got 22 submissions and chose 3 people. One thought I was offering 50% of my channel (which wasn''t the case), and we had a fight. Another editor, Dynamic, helped me through it.

After the fight, I stopped uploading for 3-4 months. Our financial situation was tough—a relative scammed ₹1 lakh from my dad. My marks were dropping, I had teenage tantrums, and I had suicidal thoughts again. I shared everything with Dynamic. He scolded me first, then we talked. I shared my vision and ambition. He connected with it—he wanted something similar.

We decided to partner up. We formed a group called "Creator Force" with 6 members, inspired by the PayPal Mafia. We started our first business, but one member wasn''t hardworking enough. We dropped the group and formed a new one with just Dynamic and me.',
2024, 'entrepreneurship', 9, true),

('Building Reach Resolve',
'We tried building a website using affiliate links from Amazon and Flipkart to offer 5% more discounts, but it wasn''t legal and we lacked technical knowledge. We abandoned it and started freelancing together—Dynamic made videos.

On June 5, 2024, we signed our first international client for our agency, Reach Resolve. By December, we had made around $1,500 in revenue. I was working 14-16 hours a day on average. In March, I decided to drop out of college because my agency was doing well and college wasn''t adding value—I''d already learned everything from YouTube, AI, and online courses.

We were also exploring SMMA on the side to scale faster. But after 2 months, we realized it was too saturated and we didn''t have proper skills in running paid ads.',
2024, 'entrepreneurship', 10, true),

('The Philosophy Shift',
'In early 2024, while studying philosophy, I came across a thought that haunted me: even if I do philanthropy like MrBeast, people will still be poor and helpless. If I feed someone for one day, they''ll still be hungry tomorrow. How can this problem be permanently solved? Someone needs to pay for philanthropy, and that someone won''t be alive forever.

I was watching a creator called Fukra Insaan who made a video where he built a business in 24 hours and gave it away to a subscriber. This gave me an idea: what if I made businesses and gave them to people who really want the opportunity to grow and become self-sufficient? Not philanthropy for the sake of it, but to make people truly independent and give them a chance to escape their situation.',
2024, 'philosophy', 11, true),

('The Birth of Cooper',
'In June 2025, we started learning AI automation and launched Resolvia, our AI automation agency. We learned n8n, cloud infrastructure, AI agents, and algorithms. In August, we started reaching out to clients but didn''t get any because we focused too much on learning and not enough on outreach.

In September, I realized: if this continues, our lives won''t change—they might get worse. I told Dynamic we should start a startup on the side. We spent 3 weeks brainstorming. Then, while washing dishes, I had an "aha moment": what if we build something that helps people find startup ideas? I kept building on this idea: what if it also generates the website? What if it has a marketing agent? What if it integrates automation for local businesses?

When I told Dynamic, he polished the idea, and we decided to work on it.',
2024, 'entrepreneurship', 12, true),

('Cooper: The Vision Realized',
'Cooper is the culmination of everything. It''s an AI-powered platform that helps entrepreneurs validate startup ideas and build complete businesses automatically—with websites, marketing, and automation integrated.

This connects directly to that philosophy problem I struggled with years ago. I''m not just doing philanthropy—I''m making people self-sufficient. I''m giving them the opportunity to come out of their situation and never be helpless again. Just like Fukra Insaan, but scaled to millions of people thanks to AI.

This is how I''ll make Earth a Type 1 civilization. This is how I''ll fulfill the mission that kept me alive through depression, betrayal, and suicidal thoughts. This is why I work 14-16 hours a day. This is why I dropped out of college. This is why every failure, every bully, every setback was worth it.

I''m 19 years old, and I''m just getting started.',
2025, 'entrepreneurship', 13, true);

-- =====================================================
-- Success message
-- =====================================================
-- Data inserted successfully!
-- Your life story is now in the database.
-- =====================================================
