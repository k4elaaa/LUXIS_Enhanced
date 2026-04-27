@echo off
REM Firebase Deployment Setup Script for LUXIS Enhanced (Windows)

setlocal enabledelayedexpansion
cls

echo.
echo 🚀 Firebase Deployment Setup for LUXIS Enhanced
echo ================================================
echo.

REM Check if firebase-tools is installed
where firebase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📦 Installing Firebase CLI...
    call npm install -g firebase-tools
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install Firebase CLI
        exit /b 1
    )
)

echo ✅ Firebase CLI is ready
echo.

REM Install dependencies
echo 📥 Installing project dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Build the project
echo 🔨 Building the project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to build project
    exit /b 1
)

echo ✅ Project built successfully
echo.

REM Display next steps
echo 📋 Setup Complete! Next steps:
echo.
echo 1. Update .env.local with your Firebase credentials:
echo    - Go to Firebase Console: https://console.firebase.google.com
echo    - Select project: NEAT-FSMCRM
echo    - Go to Project Settings ^> General
echo    - Copy your Web SDK configuration
echo.
echo 2. Authenticate with Firebase:
echo    firebase login
echo.
echo 3. Deploy to Firebase:
echo    firebase deploy
echo.
echo 4. Your app will be live at:
echo    https://NEAT-FSMCRM.firebaseapp.com
echo.

pause
