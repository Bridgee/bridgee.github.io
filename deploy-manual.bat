@echo off
echo =================================
echo   MANUAL DEPLOYMENT SCRIPT
echo =================================

echo [1/7] Clearing gh-pages cache...
if exist "node_modules\.cache\gh-pages" (
    rmdir /s /q "node_modules\.cache\gh-pages" 2>nul
    echo Cache cleared.
) else (
    echo Cache already clear.
)

echo [2/7] Building site...
call npm run build
if errorlevel 1 (
    echo Build failed! Aborting deployment.
    pause
    exit /b 1
)

echo [3/7] Creating temporary deployment folder...
if exist temp-deploy rmdir /s /q temp-deploy
mkdir temp-deploy
cd temp-deploy

echo [4/7] Initializing git repository...
git init -b gh-pages
git remote add origin https://github.com/Bridgee/bridgee.github.io.git

echo [5/7] Copying build files...
xcopy /E /I /Y ..\dist\* . >nul

echo [6/7] Creating .nojekyll file...
echo. > .nojekyll

echo [7/7] Committing and pushing to gh-pages...
git add .
git commit -m "Deploy website updates - %date% %time%"
git push origin gh-pages --force

echo Cleaning up...
cd ..
rmdir /s /q temp-deploy

echo.
echo ===============================
echo   DEPLOYMENT COMPLETE! 
echo   Site: https://bridgee.github.io
echo ===============================
pause