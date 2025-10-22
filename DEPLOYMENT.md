# Court AI API - Deployment Guide

## 🚀 Quick Deployment to Vercel

### 1. Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `courtaiapp-crypto/court-ai-api`
4. Click "Deploy"

### 2. Configure Environment Variables

In Vercel dashboard, go to Project Settings → Environment Variables:

```env
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key  
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=court-ai-videos
```

### 3. Get R2 Credentials

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 Object Storage
3. Click "Manage R2 API tokens"
4. Create new token with R2 permissions
5. Copy the credentials to Vercel

### 4. Test Deployment

After deployment, test the endpoints:

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Video signing (replace with your video path)
curl "https://your-app.vercel.app/api/video/sign?path=videos/shooting/form-shooting.mp4"
```

## 🔧 Local Development

### 1. Clone Repository

```bash
git clone https://github.com/courtaiapp-crypto/court-ai-api.git
cd court-ai-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

```bash
cp env.example .env.local
# Edit .env.local with your R2 credentials
```

### 4. Run Development Server

```bash
npm run dev
```

Server will be available at `http://localhost:3000`

## 📱 Mobile App Integration

### Update App Configuration

In your React Native app, update `app.config.ts`:

```typescript
EXPO_PUBLIC_SIGN_API_BASE: 'https://your-app.vercel.app'
```

### Test Integration

1. Run your mobile app
2. Navigate to Exercise Library
3. Click on a video
4. Verify signed URL is generated

## 🔒 Security Features

- ✅ Rate limiting (100 requests/15 minutes)
- ✅ Origin validation
- ✅ Path validation (only video files)
- ✅ Time-limited URLs (1 hour)
- ✅ CORS headers configured

## 📊 Monitoring

### Health Check Endpoint

```bash
GET /api/health
```

Returns API status and configuration.

### Logs

Check Vercel dashboard for:
- Request logs
- Error logs  
- Performance metrics

## 🛠️ Troubleshooting

### Common Issues

1. **"Missing environment variables"**
   - Check all R2 credentials are set in Vercel
   - Verify variable names match exactly

2. **"Invalid path" errors**
   - Ensure video paths start with `videos/`
   - Check file extensions are supported

3. **Rate limit exceeded**
   - Wait 15 minutes or implement caching
   - Consider increasing limits for production

### Debug Mode

Add to your `.env.local` for debugging:

```env
DEBUG=true
LOG_LEVEL=debug
```

## 🔄 Updates

### Automatic Deployment

- Push to `main` branch triggers deployment
- Vercel automatically builds and deploys
- Zero-downtime deployments

### Manual Deployment

```bash
vercel --prod
```

## 📈 Performance

### Optimization Tips

1. **Enable Vercel Edge Functions** (if needed)
2. **Use R2 CDN** for faster video delivery
3. **Implement caching** for frequently accessed videos
4. **Monitor usage** to optimize costs

### Expected Performance

- API response time: < 200ms
- Signed URL generation: < 100ms
- Rate limit: 100 requests/15 minutes per IP

## 🆘 Support

For issues:
1. Check Vercel logs
2. Verify R2 credentials
3. Test with health endpoint
4. Contact: support@court-ai.com
