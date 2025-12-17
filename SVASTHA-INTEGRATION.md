# Svastha Integration Guide

## URL Structure

### Main Svastha App

```
https://svastha.fit/
```

### Yoga Campaign Integration

```
Frontend: https://svastha.fit/yoga-camp/
Backend:  https://svastha.fit/api/yoga-camp/
```

## Deployment Options

### Option 1: Subdirectory on Svastha Domain (Recommended)

```
svastha.fit/
├── (main svastha app)
├── yoga-camp/           # Frontend files
└── api/
    └── yoga-camp/       # Backend API
```

### Option 2: Subdomain

```
Frontend: https://yoga-camp.svastha.fit/
Backend:  https://api.svastha.fit/yoga-camp/
```

## Backend Integration

### Database

- ✅ **Same Supabase database** as Svastha
- ✅ **Uses existing `profiles` table**
- ✅ **Creates new `yoga_registrations` table**

### Authentication

- ✅ **Same Firebase project** as Svastha
- ✅ **Shared user authentication**
- ✅ **Seamless user experience**

## Deployment Steps

### 1. Backend Deployment

Deploy backend to: `https://svastha.fit/api/yoga-camp/`

### 2. Frontend Deployment

Deploy frontend to: `https://svastha.fit/yoga-camp/`

### 3. Environment Variables

```env
VITE_API_BASE_URL=https://svastha.fit/api/yoga-camp
VITE_SUPABASE_URL=https://swcubveqtvjhqwawgcks.supabase.co
VITE_SUPABASE_ANON_KEY=your_key
```

## Benefits of This Structure

1. **Same Domain**: No CORS issues
2. **Shared Database**: User data consistency
3. **Shared Authentication**: Seamless login experience
4. **SEO Friendly**: Better search rankings
5. **SSL Certificate**: Shared with main domain

## User Flow

1. **New User**: Yoga camp → OTP → Account created → Can login to Svastha app
2. **Existing User**: Yoga camp → Direct registration → No OTP needed
