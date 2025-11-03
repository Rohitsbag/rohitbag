# Deployment Guide for Rohit's Personal Website

## Prerequisites
- Node.js 18+ installed
- GitHub account
- Supabase account

## Step-by-Step Deployment

### 1. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for the database to be provisioned

2. **Run the Database Schema**
   - In your Supabase project dashboard, go to **SQL Editor**
   - Open the file `supabase-schema.sql` from this repository
   - Copy the entire content
   - Paste into the SQL Editor
   - Click **Run** or press `Ctrl/Cmd + Enter`
   - You should see success messages for all tables created

3. **Get Your API Credentials**
   - Go to **Settings** → **API**
   - Copy the **Project URL** (it should match what's in `.env`)
   - Copy the **anon public** key (it should match what's in `.env`)
   - These are already configured in your `.env` file

4. **Verify Database Setup**
   - Go to **Table Editor**
   - You should see all 8 tables:
     - life_story
     - projects
     - advice_museum
     - contact_submissions
     - testimonials
     - admin_users
     - site_settings
     - page_analytics

### 2. Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test the Website**
   - Visit `http://localhost:5173`
   - Navigate through all pages
   - Test the contact form
   - Test the advice museum submission

4. **Test Admin Panel**
   - Visit `http://localhost:5173/admin/login`
   - Login with: `admin@rohit.dev` / `admin123`
   - Explore all admin features
   - Try creating/editing content

### 3. Configure for GitHub Pages

1. **Update Repository Name in vite.config.js**
   
   Open `vite.config.js` and change the base path:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR-REPO-NAME/', // ← Change this to your actual repo name
     build: {
       outDir: 'dist',
       assetsDir: 'assets',
     },
   })
   ```

   For example, if your repo is `rohit-website`, use:
   ```js
   base: '/rohit-website/',
   ```

2. **Update Links in Your Code (if needed)**
   - All internal links use React Router, so they should work automatically
   - The `basename` in `App.jsx` is set to `/rohit-site/`
   - Update this to match your repo name:
   ```jsx
   <Router basename="/YOUR-REPO-NAME">
   ```

### 4. Deploy to GitHub Pages

1. **Initialize Git Repository (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to GitHub.com
   - Click "New Repository"
   - Name it (e.g., `rohit-website`)
   - Don't initialize with README (we already have one)
   - Create repository

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

   This will:
   - Build your site
   - Create a `gh-pages` branch
   - Push the built site to GitHub Pages

5. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **gh-pages** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### 5. Verify Deployment

1. **Visit Your Live Site**
   - Go to the URL shown in GitHub Pages settings
   - Test all pages and features
   - Verify forms submit correctly to Supabase
   - Check responsive design on mobile

2. **Check Admin Panel**
   - Visit `/admin/login` on your live site
   - Verify you can login
   - Test content management features

### 6. Custom Domain (Optional)

If you want to use a custom domain:

1. **Purchase a Domain** (from Namecheap, GoDaddy, etc.)

2. **Configure DNS**
   - Add CNAME record pointing to: `YOUR-USERNAME.github.io`
   - Or add A records pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

3. **Update GitHub Pages Settings**
   - Go to repository **Settings** → **Pages**
   - Enter your custom domain
   - Check "Enforce HTTPS"

4. **Update vite.config.js**
   ```js
   base: '/', // Change to root for custom domain
   ```

5. **Update App.jsx**
   ```jsx
   <Router basename="/"> // Change to root
   ```

6. **Rebuild and redeploy**
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Blank Page After Deployment

**Problem**: Site shows blank page on GitHub Pages

**Solution**:
1. Check browser console for errors
2. Verify `base` path in `vite.config.js` matches repo name
3. Make sure `basename` in `App.jsx` matches repo name
4. Check if `gh-pages` branch exists and has content

### 404 on Page Refresh

**Problem**: Refreshing any page (except home) gives 404

**Solution**: This is normal for GitHub Pages with client-side routing. Options:
1. Use hash routing instead of browser routing
2. Add a custom 404.html that redirects to index.html
3. For custom domain: Configure server redirects

### Supabase Errors

**Problem**: Forms not submitting, data not loading

**Solution**:
1. Check `.env` file has correct Supabase URL and keys
2. Verify Supabase project is active
3. Check Row Level Security policies allow anonymous inserts
4. Open browser console to see specific errors

### Admin Panel Not Accessible

**Problem**: Can't access `/admin/login`

**Solution**:
1. Clear browser cache and localStorage
2. Check routing in `App.jsx`
3. Verify admin routes are not protected by base path issues

## Updating Your Site

To make changes and redeploy:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main

# Redeploy
npm run deploy
```

## Environment Variables for Production

For production deployment, you may want to:

1. **Create Production Environment File**
   - Create `.env.production`
   - Add production-specific variables

2. **Secure Admin Credentials**
   - Implement proper Supabase Auth
   - Remove hardcoded demo credentials
   - Use Supabase RLS policies

3. **Add Analytics**
   - Integrate Google Analytics
   - Use the `page_analytics` table
   - Add tracking code

## Need Help?

If you encounter issues:
1. Check the [Vite documentation](https://vitejs.dev)
2. Check the [Supabase documentation](https://supabase.com/docs)
3. Check GitHub Pages [troubleshooting guide](https://docs.github.com/en/pages)
4. Open an issue in the repository

## Security Notes

⚠️ **Important for Production:**

1. **Never commit `.env` files** with real credentials
2. **Use environment variables** for sensitive data
3. **Implement proper authentication** for admin panel
4. **Enable RLS** policies in Supabase
5. **Use HTTPS** always (GitHub Pages provides this automatically)
6. **Validate all user inputs** server-side
7. **Rate limit** form submissions
8. **Regular backups** of your Supabase database

---

Your website is now live! 🎉

Remember to update content through the admin panel and keep your dependencies updated regularly.
