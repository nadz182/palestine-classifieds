# Deployment Guide - GitHub Pages

## Prerequisites
- A GitHub account
- Git installed on your computer

## Step-by-Step Deployment Instructions

### 1. Update Configuration
First, replace `YOUR_GITHUB_USERNAME` in `package.json` with your actual GitHub username:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/palestine-classifieds"
```

### 2. Initialize Git Repository (if not already done)
```bash
cd palestine-classifieds
git init
git add .
git commit -m "Initial commit - Palestine Classifieds"
```

### 3. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `palestine-classifieds`
3. Make it **Public** (required for free GitHub Pages)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### 4. Push to GitHub
```bash
git remote add origin https://github.com/nadz182/palestine-classifieds.git
git branch -M main
git push -u origin main
```

### 5. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
5. The workflow will automatically deploy your site

### 6. Wait for Deployment
- Go to the **Actions** tab in your repository
- You'll see the deployment workflow running
- Wait for it to complete (usually 2-3 minutes)
- Once complete, your site will be live!

### 7. Access Your Site
Your site will be available at:
```
https://YOUR_GITHUB_USERNAME.github.io/palestine-classifieds/
```

## Alternative: Manual Deployment

If you prefer manual deployment:

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build your project
2. Create a `gh-pages` branch
3. Push the built files to that branch

Then enable GitHub Pages:
1. Go to Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `root`
4. Save

## Updating Your Site

After making changes:

### Using GitHub Actions (Automatic):
```bash
git add .
git commit -m "Your update message"
git push
```
The site will automatically redeploy!

### Using Manual Deploy:
```bash
npm run deploy
```

## Troubleshooting

### Issue: Blank page after deployment
- Check that `base` in `vite.config.js` matches your repo name
- Ensure the homepage in `package.json` is correct

### Issue: 404 errors on routes
- The `.github/workflows/deploy.yml` handles this automatically
- Make sure the workflow completed successfully

### Issue: Build fails
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Try building locally first: `npm run build`

## Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Cost
GitHub Pages is **completely free** for public repositories!
