# 🔒 Security Setup Guide - Environment Variables

This document explains how to configure environment variables for Firebase credentials in this project.

## Why Environment Variables?

Previously, Firebase credentials were hardcoded in the source code, which:
- ❌ Exposed secrets in git history and public repositories
- ❌ Made credentials available to anyone with repository access
- ❌ Violated security best practices

Now, all sensitive data is loaded from environment variables at runtime.

## Setup Instructions

### 1. For Local Development

**Step 1: Create `.env.local` from the template**
```bash
cp .env.example .env.local
```

**Step 2: Fill in your Firebase credentials**
Edit `.env.local` and add your actual Firebase configuration:
```env
FIREBASE_API_KEY=your_actual_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**Step 3: The .env.local file is protected**
- ✅ Already in `.gitignore` - will never be committed
- ✅ Never share this file publicly
- ✅ Each developer should have their own

### 2. For Production Deployment

**Option A: Firebase Hosting (Recommended)**
1. Set environment variables in Firebase Console or via Firebase CLI:
   ```bash
   firebase functions:config:set firebase.api_key="your_key"
   ```

2. Inject variables into your `index.html` during build:
   ```bash
   # In your deployment script
   npm run build -- --configuration production
   ```

**Option B: Docker/Kubernetes**
Pass environment variables when running the container:
```bash
docker run \
  -e FIREBASE_API_KEY="your_key" \
  -e FIREBASE_PROJECT_ID="your_project" \
  ...
  your-app-image
```

**Option C: Environment-specific builds**
Create separate environment files and build for each deployment:
```bash
npm run build -- --configuration production --env=prod
```

### 3. How It Works

1. **Environment File** (`src/environments/environment.ts`):
   - Reads from `window.env_VARIABLE_NAME`
   - Falls back to empty string if not set
   - Logs warning if variable is missing

2. **Index HTML** (`src/index.html`):
   - Initializes window variables before Angular loads
   - In production, these are populated from your deployment platform

3. **Load Time**:
   ```
   index.html loads → Environment variables injected → Angular initializes → Uses env config
   ```

## Security Checklist

Before making the repository public:

- ✅ Remove all hardcoded credentials from source code
- ✅ Update `.gitignore` to exclude `.env*` files
- ✅ Clean git history to remove old secrets (already done)
- ✅ Add `.env.example` template for new developers
- ✅ Create documentation (this file)
- ✅ Never commit `.env.local` or `.env.production.local`
- ✅ Rotate any exposed Firebase API keys in Firebase Console

## Verify It's Secure

Check that credentials are NOT in git history:
```bash
git log --all --source -S "AIzaSyBSnpQLwAv7CwEpDWkLuLiMhYfiQu6-i1I"
# Should return empty or only "[REMOVED]" markers
```

Check that `.env.local` is ignored:
```bash
git check-ignore .env.local
# Should output: .env.local
```

## Troubleshooting

**Q: "Environment variable is not set" warning in console**
- A: Ensure `.env.local` exists and contains the required variables

**Q: Firebase not initializing in development**
- A: Check browser console for missing env variable warnings
- A: Verify `.env.local` has correct values

**Q: Build fails in production**
- A: Ensure environment variables are set in your deployment platform
- A: Check that Firebase config is accessible via `window.env_*`

## Additional Resources

- [Firebase Console](https://console.firebase.google.com)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)
