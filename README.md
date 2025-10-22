# Court AI API

Backend API for Court AI mobile app - handles video signing and R2/Cloudflare integration.

## Features

- 🔐 Secure video URL signing with R2/Cloudflare
- ⏰ Time-limited access tokens
- 🚀 Serverless deployment on Vercel
- 📱 Mobile app integration

## Environment Variables

```env
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=court-ai-videos
```

## API Endpoints

### GET /api/video/sign

Generates a signed URL for video access.

**Parameters:**
- `path` (string): Video path in R2 bucket

**Response:**
```json
{
  "url": "https://signed-url...",
  "expires": 1640995200000
}
```

## Deployment

1. Connect to Vercel
2. Set environment variables
3. Deploy automatically on push to main

## Development

```bash
npm install
npm run dev
```

## Security

- URLs expire after 1 hour
- Rate limiting implemented
- CORS configured for mobile app
