-- =====================================================
-- SUPABASE DATABASE SCHEMA FOR ROHIT'S PERSONAL WEBSITE
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to create all tables
-- Project ID: icjahaocvwrvrsilpqwy
-- =====================================================

-- Enable Row Level Security (RLS) on all tables
-- This ensures data security and access control

-- =====================================================
-- 1. LIFE STORY TABLE
-- Stores Rohit's life story content with milestones
-- =====================================================
CREATE TABLE IF NOT EXISTS life_story (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    year INTEGER,
    milestone_type VARCHAR(50), -- 'childhood', 'education', 'entrepreneurship', 'philosophy'
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 2. ADVICE MUSEUM TABLE
-- Stores life advice submissions from visitors
-- =====================================================
CREATE TABLE IF NOT EXISTS advice_museum (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    advice TEXT NOT NULL,
    author_name VARCHAR(255),
    author_email VARCHAR(255),
    is_approved BOOLEAN DEFAULT false,
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    approved_date TIMESTAMP WITH TIME ZONE,
    ip_address VARCHAR(45), -- For spam prevention
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 3. PROJECTS TABLE
-- Stores information about Rohit's ventures and projects
-- =====================================================
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'archived'
    category VARCHAR(100), -- 'startup', 'agency', 'experiment', 'open-source'
    year_started INTEGER,
    year_ended INTEGER,
    tags TEXT[], -- Array of tags like ['AI', 'Automation', 'SaaS']
    website_url TEXT,
    github_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 4. TESTIMONIALS TABLE
-- Stores testimonials and feedback from clients/partners
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    company VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 5. CONTACT SUBMISSIONS TABLE
-- Stores contact form submissions
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- 'unread', 'read', 'replied', 'archived'
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 6. ADMIN USERS TABLE
-- Stores admin user credentials for the admin panel
-- =====================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'editor', 'viewer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- 7. SITE SETTINGS TABLE
-- Stores global site configuration and settings
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'text', -- 'text', 'number', 'boolean', 'json'
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- 8. PAGE ANALYTICS TABLE
-- Stores basic page view analytics
-- =====================================================
CREATE TABLE IF NOT EXISTS page_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path VARCHAR(500) NOT NULL,
    visitor_id VARCHAR(255), -- Can be a session ID or fingerprint
    referrer TEXT,
    user_agent TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- =====================================================
-- CREATE INDEXES FOR BETTER QUERY PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_life_story_order ON life_story(order_index);
CREATE INDEX IF NOT EXISTS idx_life_story_featured ON life_story(is_featured);
CREATE INDEX IF NOT EXISTS idx_advice_museum_approved ON advice_museum(is_approved);
CREATE INDEX IF NOT EXISTS idx_advice_museum_date ON advice_museum(submission_date DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_page_analytics_path ON page_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_page_analytics_date ON page_analytics(visited_at DESC);

-- =====================================================
-- CREATE UPDATED_AT TRIGGER FUNCTION
-- Automatically updates the updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all relevant tables
CREATE TRIGGER update_life_story_updated_at BEFORE UPDATE ON life_story
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE life_story ENABLE ROW LEVEL SECURITY;
ALTER TABLE advice_museum ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Public read access for approved content
CREATE POLICY "Public can view approved life story" ON life_story FOR SELECT USING (true);
CREATE POLICY "Public can view approved advice" ON advice_museum FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Public can insert into certain tables
CREATE POLICY "Public can submit advice" ON advice_museum FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can log analytics" ON page_analytics FOR INSERT WITH CHECK (true);

-- Admin full access (you'll need to set up Supabase Auth for proper admin access)
-- For now, we'll use the service role key in the admin panel

-- =====================================================
-- INSERT INITIAL DATA
-- =====================================================

-- Insert Rohit's admin user (replace with your actual admin email)
INSERT INTO admin_users (email, role) VALUES ('rohit@example.com', 'admin');

-- Insert initial site settings
INSERT INTO site_settings (key, value, type, description) VALUES
('site_title', 'Rohit Bagh', 'text', 'Website title'),
('site_tagline', 'Entrepreneur & AI Innovator', 'text', 'Website tagline'),
('hero_subtitle', 'Building the future with AI automation | Co-founder of Cooper & Reach Resolve', 'text', 'Hero section subtitle'),
('contact_email', 'rohit@example.com', 'text', 'Contact email'),
('linkedin_url', 'https://linkedin.com/in/rohitbagh', 'text', 'LinkedIn profile'),
('twitter_url', 'https://twitter.com/rohitbagh', 'text', 'Twitter profile'),
('github_url', 'https://github.com/rohitbagh', 'text', 'GitHub profile'),
('enable_dark_mode', 'true', 'boolean', 'Enable dark mode toggle'),
('enable_accessibility_mode', 'true', 'boolean', 'Enable accessibility mode'),
('enable_advice_museum', 'true', 'boolean', 'Enable advice museum feature'),
('max_advice_per_day', '5', 'number', 'Maximum advice submissions per IP per day');

-- Insert initial projects
INSERT INTO projects (name, description, long_description, status, category, year_started, tags, featured, order_index) VALUES
('Cooper', 
 'AI-powered platform that helps entrepreneurs validate startup ideas and build complete businesses automatically',
 'Cooper is the culmination of my vision to democratize entrepreneurship. It uses AI to help people validate startup ideas, generate websites, automate marketing, and create complete business solutions. This solves the problem I identified: giving people sustainable opportunities rather than temporary philanthropy.',
 'active', 
 'startup', 
 2024, 
 ARRAY['AI', 'SaaS', 'Automation', 'Entrepreneurship'],
 true,
 1),
('Reach Resolve', 
 'Video editing agency serving international clients with high-quality content production',
 'Founded with my co-founder Dynamic, Reach Resolve started as a video editing agency and has grown to serve international clients. We''ve generated $1,500+ in revenue and built a reputation for quality work. This taught me valuable lessons about client service, scaling operations, and building sustainable business models.',
 'active', 
 'agency', 
 2024, 
 ARRAY['Video Editing', 'Content Creation', 'Agency'],
 true,
 2),
('Resolvia', 
 'AI automation agency helping local businesses scale through intelligent automation',
 'Resolvia focuses on bringing AI automation to local businesses, helping them streamline operations and scale efficiently. We build custom automation solutions using tools like n8n, AI agents, and cloud infrastructure.',
 'active', 
 'agency', 
 2024, 
 ARRAY['AI', 'Automation', 'B2B', 'Agency'],
 true,
 3);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
-- Schema created successfully!
-- Next steps:
-- 1. Go to your Supabase project: https://icjahaocvwrvrsilpqwy.supabase.co
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire file
-- 4. Click "Run" to execute
-- 5. Your database will be ready for the admin panel!
-- =====================================================
