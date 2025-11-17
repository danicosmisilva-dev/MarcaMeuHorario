# 🚀 GitHub Actions Deployment Guide

## Overview

Your GitHub Actions workflows are configured to automatically build and deploy your Angular app to Firebase Hosting with environment variables passed securely as GitHub Secrets.

## Setup Steps

### Step 1: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Click "New repository secret" and add these 7 secrets:

| Secret Name | Value | Source |
|------------|-------|--------|
| `FIREBASE_API_KEY` | Your new Firebase API Key | .env.local |
| `FIREBASE_AUTH_DOMAIN` | marca-meu-horario.firebaseapp.com | .env.local |
| `FIREBASE_PROJECT_ID` | marca-meu-horario | .env.local |
| `FIREBASE_STORAGE_BUCKET` | marca-meu-horario.appspot.com | .env.local |
| `FIREBASE_MESSAGING_SENDER_ID` | 715616776368 | .env.local |
| `FIREBASE_APP_ID` | 1:715616776368:web:5936d09a035f863a90b75 | .env.local |
| `FIREBASE_MEASUREMENT_ID` | G-QHXYVPKNYZ | .env.local |
| `FIREBASE_SERVICE_ACCOUNT_MARCA_MEU_HORARIO` | Your Firebase service account JSON | (Already configured) |

### Step 2: Verify Workflows

Two workflows are now configured:

**1. firebase-hosting-merge.yml**
- Triggers on push to `main` branch
- Builds with production configuration
- Deploys to live Firebase Hosting channel
- Uses environment secrets for build

**2. firebase-hosting-pull-request.yml**
- Triggers on pull requests
- Builds with production configuration
- Deploys to preview channel
- Uses environment secrets for build

### Step 3: Deploy

Now you can deploy by simply pushing to the main branch:

```bash
# Update your local .env.local with the new Firebase key
cp .env.example .env.local
# Edit with your new credentials
nano .env.local

# Test locally
npm run build
npm start

# Commit code changes (NOT .env.local - it's in .gitignore)
git add .
git commit -m "your changes"

# Push to main branch
git push origin main
```

GitHub Actions will automatically:
1. ✅ Checkout your code
2. ✅ Install dependencies
3. ✅ Load environment secrets
4. ✅ Build Angular app
5. ✅ Deploy to Firebase Hosting

## How Environment Variables Work

### Build Time:
```yaml
env:
  FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
  # ... other secrets
```

These variables are available during the build process. Your `index.html` will inject them into `window.env_*`.

### Runtime:
```typescript
// environment.ts
apiKey: getEnvVariable('FIREBASE_API_KEY')
```

The app reads from `window.env_FIREBASE_API_KEY` which was set during build.

## Security

✅ **Secrets are:**
- Stored securely in GitHub encrypted storage
- Only accessible in workflow context
- Never exposed in logs or build output
- Automatically masked in GitHub Actions UI

❌ **Secrets are NOT:**
- Committed to repository
- Visible in `.env.local` (which is in .gitignore)
- Exposed in build artifacts

## Troubleshooting

**Issue: Build fails with "Environment variable not set"**
- Solution: Verify all 7 secrets are added to GitHub Settings → Secrets

**Issue: Firebase deployment fails**
- Solution: Check that `FIREBASE_SERVICE_ACCOUNT_MARCA_MEU_HORARIO` secret is still valid

**Issue: Preview URLs not working on PR**
- Solution: This requires special permissions. Merge to main to deploy to live channel.

**Issue: Want to deploy from branch instead of main?**
- Edit workflow files to add your branch:
```yaml
on:
  push:
    branches:
      - main
      - dev  # Add this line
```

## Updating Credentials

When you rotate your Firebase API key in the future:

1. Generate new key in Firebase Console
2. Update GitHub Secrets with new values
3. Next push will automatically use new credentials

No code changes needed!

## What Happens on Each Push to main

```
Your commit
    ↓
GitHub receives push
    ↓
Actions triggered: firebase-hosting-merge.yml
    ↓
Load environment secrets from GitHub Settings
    ↓
npm ci (install dependencies)
    ↓
npm run build (compile Angular with env vars)
    ↓
Firebase deploy (upload to hosting)
    ↓
✅ Live at: https://marca-meu-horario.web.app/
```

## Monitor Deployments

1. Go to your GitHub repository
2. Click "Actions" tab
3. See workflow run status
4. Click on a run to see detailed logs
5. Check Firebase Hosting console for deployment status

## Related Documentation

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Firebase Hosting GitHub Actions](https://firebase.google.com/docs/hosting/github-integration)
- [Angular Build Configuration](https://angular.dev/guide/build)
