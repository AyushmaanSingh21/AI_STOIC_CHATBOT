@echo off
echo Starting StoicSage Simplified...
echo.
echo This batch file will help run the StoicSage app on Windows
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo Node.js is not installed or not in your PATH
  echo Please download and install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo npm is not installed or not in your PATH
  echo Please make sure your Node.js installation includes npm
  echo.
  pause
  exit /b
)

:: Check if dependencies are installed
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies
    pause
    exit /b
  )
)

:: Start the server
echo Starting StoicSage server on http://localhost:5000
echo Press Ctrl+C to stop the server
echo.
node server-simple.js
pause