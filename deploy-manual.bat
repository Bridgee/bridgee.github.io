@echo off
echo Building site...
call npm run build

echo Creating temporary deployment folder...
if exist temp-deploy rmdir /s /q temp-deploy
mkdir temp-deploy
cd temp-deploy

echo Initializing git repository...
git init
git remote add origin https://github.com/Bridgee/bridgee.github.io.git

echo Copying build files...
xcopy /E /I /Y ..\dist\* .

echo Creating .nojekyll file...
echo. > .nojekyll

echo Committing and pushing to gh-pages...
git add .
git commit -m "Deploy website updates - %date% %time%"
git push origin HEAD:gh-pages --force

echo Cleaning up...
cd ..
rmdir /s /q temp-deploy

echo Deployment complete!
pause