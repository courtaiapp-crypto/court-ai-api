#!/bin/bash

# Court AI API - GitHub Setup Script
# Run this script to initialize and push to GitHub

echo "🚀 Setting up Court AI API repository..."

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Court AI API with R2 video signing"

# Set main branch
git branch -M main

# Add remote origin
git remote add origin https://github.com/courtaiapp-crypto/court-ai-api.git

# Push to GitHub
git push -u origin main

echo "✅ Repository setup complete!"
echo "📝 Next steps:"
echo "1. Go to Vercel dashboard"
echo "2. Import this repository"
echo "3. Set environment variables"
echo "4. Deploy!"
echo ""
echo "🔗 Repository: https://github.com/courtaiapp-crypto/court-ai-api"
