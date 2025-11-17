# ✅ GitHub Secrets Setup Checklist

## Quick Setup (5 minutes)

### Step 1: Go to GitHub Secrets
1. Open your repository: https://github.com/danicosmisilva-dev/MarcaMeuHorario
2. Click **Settings** → **Secrets and variables** → **Actions**

### Step 2: Add Each Secret

Click **"New repository secret"** for each one:

```
Secret Name: FIREBASE_API_KEY
Value: AIzaSyBCUBBrdItSKrEPeTBHuuuSnpj6R1Ke0ks
```

```
Secret Name: FIREBASE_AUTH_DOMAIN
Value: marca-meu-horario.firebaseapp.com
```

```
Secret Name: FIREBASE_PROJECT_ID
Value: marca-meu-horario
```

```
Secret Name: FIREBASE_STORAGE_BUCKET
Value: marca-meu-horario.appspot.com
```

```
Secret Name: FIREBASE_MESSAGING_SENDER_ID
Value: 715616776368
```

```
Secret Name: FIREBASE_APP_ID
Value: 1:715616776368:web:5936d09a035f863a90b75
```

```
Secret Name: FIREBASE_MEASUREMENT_ID
Value: G-QHXYVPKNYZ
```

### Step 3: Verify Setup

After adding all secrets, verify in GitHub:
- Repository → Settings → Secrets and variables → Actions
- Should see 7+ secrets listed (some may be pre-existing)

### Step 4: Test Deployment

Push to main branch to trigger deployment:
```bash
git push origin main
```

Then:
1. Go to **Actions** tab in GitHub
2. Watch the workflow run
3. Check status of "Deploy to Firebase Hosting on merge"
4. Once complete, verify at: https://marca-meu-horario.web.app/

## ✅ Checklist

- [ ] 1. Open GitHub Settings → Secrets
- [ ] 2. Added FIREBASE_API_KEY
- [ ] 3. Added FIREBASE_AUTH_DOMAIN
- [ ] 4. Added FIREBASE_PROJECT_ID
- [ ] 5. Added FIREBASE_STORAGE_BUCKET
- [ ] 6. Added FIREBASE_MESSAGING_SENDER_ID
- [ ] 7. Added FIREBASE_APP_ID
- [ ] 8. Added FIREBASE_MEASUREMENT_ID
- [ ] 9. Pushed code to main
- [ ] 10. Verified workflow ran successfully in Actions tab

## After Setup

Your deployment workflow is now automated:

```
git push origin main
    ↓
GitHub Actions runs automatically
    ↓
✅ App deployed to Firebase Hosting
```

No manual deployment needed!

## Values Reference

Copy from `.env.local`:
```bash
cat .env.local
```

Should show:
```
FIREBASE_API_KEY=AIzaSyBCUBBrdItSKrEPeTBHuuuSnpj6R1Ke0ks
FIREBASE_AUTH_DOMAIN=marca-meu-horario.firebaseapp.com
FIREBASE_PROJECT_ID=marca-meu-horario
FIREBASE_STORAGE_BUCKET=marca-meu-horario.appspot.com
FIREBASE_MESSAGING_SENDER_ID=715616776368
FIREBASE_APP_ID=1:715616776368:web:5936d09a035f863a90b75
FIREBASE_MEASUREMENT_ID=G-QHXYVPKNYZ
```

Use these values when adding secrets to GitHub.
