# Firebase Deployment Guide - LUXIS Enhanced

## Prerequisites
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Firebase project ID: `NEAT-FSMCRM`
- Node.js and npm installed

## Setup Steps

### 1. Install Dependencies
```bash
npm install
npm install firebase
```

### 2. Configure Environment Variables
Edit `.env.local` with your Firebase credentials from Firebase Console:
- Go to Firebase Console > Project Settings
- Copy your web app configuration
- Update the following variables:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID` (should be: NEAT-FSMCRM)
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`

### 3. Authenticate with Firebase
```bash
firebase login
```
This opens your browser to authenticate your Firebase account.

### 4. Build the Project
```bash
npm run build
```
This creates the `dist` folder that will be deployed to Firebase Hosting.

### 5. Deploy to Firebase

**Option A: Deploy Everything**
```bash
firebase deploy
```
This deploys both the hosting (from dist/) and Firestore rules.

**Option B: Deploy Only Hosting**
```bash
firebase deploy --only hosting
```

**Option C: Deploy Only Firestore**
```bash
firebase deploy --only firestore
```

## File Structure
- `.firebaserc` - Firebase project configuration
- `firebase.json` - Deployment settings (hosting, firestore)
- `firestore.rules` - Firestore security rules
- `firestore.indexes.json` - Firestore indexes configuration
- `src/firebase.ts` - Firebase SDK initialization
- `.env.local` - Environment variables (credentials)

## Firestore Security Rules
Current rules allow:
- Anyone to read data (public access)
- Authenticated users to manage their own user documents
- Authenticated users to read/write project documents

Modify `firestore.rules` to fit your security requirements.

## After Deployment
- Your app will be live at: `https://NEAT-FSMCRM.firebaseapp.com`
- View logs: `firebase logs --only hosting`
- View real-time database: Firebase Console > Firestore

## Troubleshooting

**"Permission denied" during deployment:**
- Run: `firebase login` to re-authenticate
- Check project ID in `.firebaserc` matches your Firebase project

**Build errors:**
- Clear cache: `rm -rf node_modules dist package-lock.json && npm install`
- Rebuild: `npm run build`

**Environment variables not loading:**
- Ensure `.env.local` is in the root directory
- Restart dev server if testing locally: `npm run dev`
- Variables must start with `VITE_` to be available in browser

## Next Steps
1. Configure Firebase Authentication in your app
2. Set up Firestore database collections for your data
3. Implement Cloud Storage for file uploads
4. Add Cloud Functions for backend logic (optional)
