# Quick Start Guide

Get Rohit's website up and running in 5 minutes!

## 🚀 Fast Track Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Set Up Database (2 minutes)

1. Go to [Supabase](https://supabase.com) and sign in
2. Create a new project (or use existing)
3. Go to **SQL Editor**
4. Copy all content from `supabase-schema.sql`
5. Paste and click **Run**
6. Done! ✅

### 3. Start Development Server (30 seconds)

```bash
npm run dev
```

Visit: `http://localhost:5173`

### 4. Access Admin Panel (30 seconds)

1. Go to: `http://localhost:5173/admin/login`
2. Login with:
   - Email: `admin@rohit.dev`
   - Password: `admin123`

### 5. Deploy to GitHub Pages (1 minute)

```bash
# Update vite.config.js base path to your repo name
# Update App.jsx basename to your repo name

npm run deploy
```

## ✅ What You Get

- ✨ Beautiful, responsive website
- 🌙 Dark/Light theme
- ♿ Accessibility mode
- 📝 Full admin panel
- 💾 Supabase backend
- 📱 Mobile-optimized
- 🎨 Smooth animations

## 📊 Admin Panel Features

Access at `/admin/login`:

1. **Dashboard** - Overview & stats
2. **Story Manager** - Edit your life story
3. **Projects** - Manage portfolio
4. **Advice Museum** - Approve submissions
5. **Contacts** - View messages
6. **Settings** - Configure site

## 🎨 Customization

### Update Your Info

**Option 1: Admin Panel** (Recommended)
- Go to `/admin/settings`
- Update all fields
- Click Save

**Option 2: Code**
- Edit `src/pages/Home.jsx` for hero section
- Edit `src/pages/Story.jsx` for your story
- Edit `src/pages/Projects.jsx` for projects

### Change Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#your-color',
    600: '#your-color',
    // etc...
  }
}
```

### Change Theme

The theme toggle is in the header. It saves to localStorage automatically.

## 📝 Content Management

### Add Life Story Entry
1. Go to `/admin/story`
2. Fill in the form
3. Click Create
4. It appears on `/story` page

### Add Project
1. Go to `/admin/projects`
2. Fill in details
3. Add tags (comma-separated)
4. Click Create

### Review Advice
1. Go to `/admin/advice`
2. Click "Pending"
3. Approve or delete submissions
4. Approved advice shows on `/advice-museum`

### View Contact Messages
1. Go to `/admin/contacts`
2. Click on a message
3. Change status or reply via email

## 🚢 Deployment Checklist

Before deploying:

- [ ] Run `supabase-schema.sql` in Supabase
- [ ] Update `.env` with your Supabase credentials (already done)
- [ ] Update `vite.config.js` base path
- [ ] Update `App.jsx` basename
- [ ] Test locally: `npm run dev`
- [ ] Build: `npm run build`
- [ ] Deploy: `npm run deploy`
- [ ] Enable GitHub Pages in repo settings

## 🆘 Common Issues

**Blank page after deployment?**
- Check vite.config.js base path matches repo name

**Forms not working?**
- Verify Supabase schema was run
- Check .env has correct credentials

**Can't access admin?**
- Clear localStorage
- Use incognito mode
- Check demo credentials

**Dark mode not working?**
- Clear localStorage: `localStorage.clear()`
- Refresh page

## 📚 Files to Know

```
Important Files:
├── supabase-schema.sql    # Database setup
├── vite.config.js         # Build config (update base)
├── src/App.jsx            # Routes (update basename)
├── .env                   # Supabase credentials
├── README.md              # Full documentation
└── DEPLOYMENT_GUIDE.md    # Detailed deployment
```

## 🎯 Next Steps

1. **Customize Content**
   - Add your real story to Story Manager
   - Add your actual projects
   - Update social media links in Settings

2. **Update Branding**
   - Change colors in tailwind.config.js
   - Update favicon in public/
   - Add your photos/images

3. **Deploy**
   - Follow deployment guide
   - Test on live site
   - Share your website!

4. **Security** (For Production)
   - Implement real Supabase Auth
   - Remove demo credentials
   - Enable RLS policies
   - Rate limit forms

## 💡 Pro Tips

1. **Use Admin Panel for Content** - It's faster than editing code
2. **Test Dark Mode** - Always check both themes
3. **Mobile First** - Test responsive design early
4. **Backup Database** - Export data from Supabase regularly
5. **Update Dependencies** - Run `npm update` monthly

## 🎉 You're Ready!

Your website is now set up. Start customizing and make it yours!

Need detailed help? Check:
- `README.md` - Full documentation
- `DEPLOYMENT_GUIDE.md` - Step-by-step deployment
- Supabase Docs - Database questions
- React Docs - Component questions

---

**Happy building! 🚀**
