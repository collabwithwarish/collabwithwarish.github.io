@echo off
title Warish Raj Portfolio - Local Studio Preview
echo ================================================================
echo           Warish Raj - Video Editor Studio Server
echo ================================================================
echo.
echo Starting local web server on http://localhost:3000 ...
echo (This allows YouTube and Google Drive video embeds to play seamlessly)
echo.

where python >nul 2>nul
if %errorlevel% == 0 (
  echo [INFO] Python detected. Starting server...
  start "" "http://localhost:3000"
  python -m http.server 3000
  goto end
)

where node >nul 2>nul
if %errorlevel% == 0 (
  echo [INFO] Node.js detected. Starting server...
  start "" "http://localhost:3000"
  npx --yes serve -l 3000 .
  goto end
)

echo [NOTICE] Neither Python nor Node.js was detected.
echo Opening index.html directly...
start "" "index.html"

:end
pause

