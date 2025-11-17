# 🚀 Deployment Flow Diagram

## Complete Deployment Process

```
LOCAL DEVELOPMENT
├── Create/edit code
├── Update .env.local (never committed)
├── npm run build (test locally)
├── git commit & push
└── git push origin main/dev

       ↓

GITHUB ACTIONS TRIGGERED
├── Checkout code
├── Load secrets from GitHub Settings
├── Install dependencies (npm ci)
├── Build with environment variables
│   └── Firebase config injected into app
├── Run tests (optional)
└── Deploy to Firebase Hosting

       ↓

FIREBASE HOSTING
├── Upload build artifacts
├── Serve on production domain
├── Update SSL certificates
└── ✅ App live at marca-meu-horario.web.app
```

## Step-by-Step: First Deployment

### 1️⃣ Setup GitHub Secrets (One-time)
```
GitHub → Settings → Secrets → Add 7 Secrets:
  ✓ FIREBASE_API_KEY
  ✓ FIREBASE_AUTH_DOMAIN
  ✓ FIREBASE_PROJECT_ID
  ✓ FIREBASE_STORAGE_BUCKET
  ✓ FIREBASE_MESSAGING_SENDER_ID
  ✓ FIREBASE_APP_ID
  ✓ FIREBASE_MEASUREMENT_ID
```

### 2️⃣ Push to Main Branch
```bash
git push origin main
```

### 3️⃣ Monitor Deployment
```
GitHub → Actions Tab:
  ├── See workflow running
  ├── Watch each step
  ├── Check for errors
  └── Verify deployment success
```

### 4️⃣ Verify Live
```
https://marca-meu-horario.web.app/
```

## Workflow Files Overview

### firebase-hosting-merge.yml
**Trigger:** Push to `main` branch
**Action:** Deploy to LIVE

```
push to main
    ↓
Build & Deploy
    ↓
🔴 Live audience gets update
```

### firebase-hosting-pull-request.yml
**Trigger:** Pull Request created
**Action:** Deploy to PREVIEW

```
Create PR
    ↓
Build & Deploy Preview
    ↓
🟡 Reviewers can preview changes
    ↓
Merge to main for live deployment
```

## Environment Variables Flow

```
.env.local (local only)
    ↓
GitHub Secrets (encrypted)
    ↓
GitHub Actions reads secrets
    ↓
index.html sets window.env_*
    ↓
environment.ts reads from window.env_*
    ↓
Angular app uses credentials
```

## Security Verification

✅ Credentials are:
- Stored in GitHub encrypted vault
- Never exposed in logs
- Not in git repository
- Masked in GitHub UI
- Only accessible during build

❌ Credentials are NOT:
- Committed to repository
- Visible in source code
- Exposed in build artifacts
- Hardcoded anywhere

## Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| Build fails: "Environment variable not set" | Add missing secret to GitHub Settings |
| Deployment fails | Check Firebase service account secret is valid |
| App shows blank after deploy | Verify environment variables passed to build |
| Want to deploy from different branch | Edit workflow YAML `branches:` section |
| Preview URL not working | Preview deploys only happen on main |
| Need to rotate API key | Update GitHub secret, no code changes needed |

## Performance Notes

- Build time: ~2-3 minutes
- Deployment time: ~30-60 seconds
- Total: ~3-4 minutes from push to live

**Cached npm install:** Much faster on subsequent builds

## Manual Deployment (if needed)

```bash
# Local deployment (for testing)
npm run build -- --configuration production
npx firebase deploy --only hosting

# Requires: firebase login (one-time setup)
# Requires: GOOGLE_APPLICATION_CREDENTIALS set
```

## What NOT to Do

❌ Don't commit `.env.local` - it's in .gitignore
❌ Don't hardcode secrets in workflow files
❌ Don't share GitHub Secrets with others
❌ Don't expose service account JSON
❌ Don't use old API key after regeneration

## Next Steps

1. [ ] Add 7 GitHub Secrets
2. [ ] Commit changes: `git push origin dev`
3. [ ] Test workflow on PR first
4. [ ] Merge to main to deploy live
5. [ ] Verify at: marca-meu-horario.web.app
6. [ ] Monitor GitHub Actions for any issues

## Useful Links

- GitHub Secrets: https://github.com/danicosmisilva-dev/MarcaMeuHorario/settings/secrets/actions
- GitHub Actions: https://github.com/danicosmisilva-dev/MarcaMeuHorario/actions
- Firebase Hosting: https://console.firebase.google.com
- Deployment Logs: https://github.com/danicosmisilva-dev/MarcaMeuHorario/actions
