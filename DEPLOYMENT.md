# Deployment Guide

## Environment Configuration

### Development

```bash
npm run dev
```

Uses `.env.local` or `.env` with localhost API

### Staging

```bash
npm run build:staging
npm run preview:staging
```

Uses `.env.staging` with staging API URL

### Production

```bash
npm run build
```

Uses `.env.production` with production API URL

## Environment Variables

### Required for All Environments

```env
# Supabase (Same for all environments)
VITE_SUPABASE_URL=https://swcubveqtvjhqwawgcks.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Firebase (Same for all environments)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API URL (Different per environment)
VITE_API_BASE_URL=https://svastha.fit/api/yoga-camp
```

### Environment-Specific API URLs

**Development:**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Staging:**

```env
VITE_API_BASE_URL=https://yoga-camp-api-staging.vercel.app/api
```

**Production:**

```env
VITE_API_BASE_URL=https://api.spiritriseyoga.com/api
```

## Deployment Platforms

### Frontend Deployment (Vercel/Netlify)

**Vercel (Recommended):**

1. Connect GitHub repository (root folder)
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variables in Vercel dashboard

**Netlify:**

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables

### Backend Deployment (Separate)

**Option 1: Vercel Functions**

1. Create separate Vercel project for `/backend` folder
2. Use `backend/vercel.json` configuration
3. Set environment variables in Vercel dashboard

**Option 2: Railway/Heroku**

1. Deploy backend folder separately
2. Set environment variables
3. Update `VITE_API_BASE_URL` in frontend

**Option 3: Render/DigitalOcean**

1. Deploy as Node.js app
2. Start command: `npm start`
3. Set environment variables

## Security Notes

- Never commit `.env` files with sensitive data
- Use different Firebase projects for staging/production if needed
- Enable CORS properly in backend for production domains
- Use HTTPS in production

## Backend Deployment

The backend needs to be deployed separately with:

- Supabase connection
- Firebase Admin SDK
- CORS configured for your frontend domain
