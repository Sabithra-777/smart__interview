# Netlify Deployment Guide

## Method 1: Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Navigate to project directory:
```bash
cd frontend/vite-project
```

3. Build the project:
```bash
npm install
npm run build
```

4. Deploy to Netlify:
```bash
netlify deploy
```

5. Follow prompts:
   - Authorize with Netlify account
   - Create new site or link existing
   - Set publish directory: `dist`

6. For production deployment:
```bash
netlify deploy --prod
```

## Method 2: Netlify Web UI (Drag & Drop)

1. Build the project locally:
```bash
cd frontend/vite-project
npm install
npm run build
```

2. Go to https://app.netlify.com/drop

3. Drag and drop the `dist` folder

## Method 3: GitHub Integration

1. Push code to GitHub repository

2. Go to https://app.netlify.com

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repository

5. Configure build settings:
   - Base directory: `frontend/vite-project`
   - Build command: `npm run build`
   - Publish directory: `dist`

6. Click "Deploy site"

## Important Notes

- The app uses localStorage, so data is stored in the browser
- Each user's data is isolated to their browser
- No backend server required
- All configuration files are already created (netlify.toml, _redirects)

## Verify Deployment

After deployment, test:
1. Register as student
2. Take a test
3. View results
4. Check analytics
5. Register as admin
6. Add/edit questions
