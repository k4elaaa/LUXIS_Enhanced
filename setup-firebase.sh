#!/bin/bash
# Firebase Deployment Setup Script for LUXIS Enhanced

set -e

echo "🚀 Firebase Deployment Setup for LUXIS Enhanced"
echo "================================================"
echo ""

# Check if firebase-tools is installed
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "✅ Firebase CLI is ready"
echo ""

# Install dependencies
echo "📥 Installing project dependencies..."
npm install

echo "✅ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Project built successfully"
echo ""

# Check if authenticated
echo "🔑 Checking Firebase authentication..."
if ! firebase projects:list &> /dev/null; then
    echo "⚠️  You need to authenticate with Firebase"
    echo "Running: firebase login"
    firebase login
fi

echo "✅ Firebase authentication verified"
echo ""

# Display next steps
echo "📋 Setup Complete! Next steps:"
echo ""
echo "1. Update .env.local with your Firebase credentials:"
echo "   - Go to Firebase Console: https://console.firebase.google.com"
echo "   - Select project: NEAT-FSMCRM"
echo "   - Go to Project Settings > General"
echo "   - Copy your Web SDK configuration"
echo ""
echo "2. Deploy to Firebase:"
echo "   firebase deploy"
echo ""
echo "3. Your app will be live at:"
echo "   https://NEAT-FSMCRM.firebaseapp.com"
echo ""
