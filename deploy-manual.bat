@echo off
echo =================================
echo   MANUAL DEPLOYMENT SCRIPT
echo =================================

echo Running the same cross-platform deployment used by npm...
call npm run deploy
if errorlevel 1 exit /b 1

echo.
echo ===============================
echo   DEPLOYMENT COMPLETE! 
echo   Site: https://bridgee.github.io
echo ===============================
pause
