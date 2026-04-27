# Firebase Deployment - Quick Reference

## Your Firebase Project
- **Project ID:** NEAT-FSMCRM
- **Hosting URL:** https://NEAT-FSMCRM.firebaseapp.com
- **Firebase Console:** https://console.firebase.google.com/project/NEAT-FSMCRM

## Essential Commands

### Initial Setup
```bash
# On Windows: run setup-firebase.bat
# On macOS/Linux: bash setup-firebase.sh

# Or manually:
npm install
npm run build
firebase login
```

### Deployment
```bash
# Deploy everything (hosting + firestore)
firebase deploy

# Deploy just the hosting
firebase deploy --only hosting

# Deploy just firestore rules
firebase deploy --only firestore

# View deployment logs
firebase deploy --debug
firebase logs --only hosting
```

### Configuration
```bash
# Get your credentials from Firebase Console > Project Settings > General
# Update .env.local with these values:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=NEAT-FSMCRM.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=NEAT-FSMCRM
VITE_FIREBASE_STORAGE_BUCKET=NEAT-FSMCRM.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Files Created

### Configuration Files
- `.firebaserc` - Project configuration
- `firebase.json` - Deployment settings
- `firestore.rules` - Security rules
- `firestore.indexes.json` - Database indexes
- `.env.local` - Your credentials (keep secret!)
- `.env.example` - Template for credentials

### Implementation Files
- `src/firebase.ts` - Firebase SDK initialization
- `FIREBASE_DEPLOYMENT.md` - Detailed guide
- `setup-firebase.sh` - Linux/macOS setup script
- `setup-firebase.bat` - Windows setup script

### Updated Files
- `package.json` - Added firebase dependency
- `.gitignore` - Added Firebase-related entries

## Important Notes

⚠️ **Never commit these to git:**
- `.env.local` (contains sensitive credentials)
- `.firebase/` folder (cached deployment files)

✅ **Keep in git:**
- `.firebaserc`
- `firebase.json`
- `firestore.rules`
- `src/firebase.ts`
- `.env.example`

## Firestore Security Rules

Current rules allow:
- ✅ Anyone to **read** all data
- ✅ Authenticated users to manage `/users/{userId}` (their own data)
- ✅ Authenticated users to read/write `/projects/**`

Edit `firestore.rules` to customize security based on your needs.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "dist folder not found" | Run `npm run build` before deploying |
| "Permission denied" | Run `firebase login` again |
| Environment variables not loading | Restart dev server after updating `.env.local` |
| Firestore rules deployment fails | Check syntax in `firestore.rules` |

## Next Steps

1. ✅ Update `.env.local` with Firebase credentials
2. ✅ Test locally: `npm run dev`
3. ✅ Build: `npm run build`
4. ✅ Deploy: `firebase deploy`
5. ✅ Monitor: Visit https://console.firebase.google.com

## Support

- Firebase CLI Docs: https://firebase.google.com/docs/cli
- Firebase Hosting: https://firebase.google.com/docs/hosting
- Firestore: https://firebase.google.com/docs/firestore
