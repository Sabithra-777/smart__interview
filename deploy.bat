@echo off
echo Building project...
cd frontend\vite-project
call npm install
call npm run build

echo.
echo Build complete! dist folder is ready.
echo.
echo Choose deployment method:
echo 1. Install Netlify CLI: npm install -g netlify-cli
echo 2. Deploy: netlify deploy --prod
echo.
echo OR drag and drop the 'dist' folder to: https://app.netlify.com/drop
echo.
pause
