import { NextApiRequest, NextApiResponse } from 'next';
import { getSignedUrl, validateVideoPath } from '../../../lib/r2';
import { checkRateLimit, getClientIP, validateOrigin } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET requests are supported' 
    });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(req);
    
    // Check rate limit (100 requests per 15 minutes)
    if (!checkRateLimit(clientIP, 100, 15 * 60 * 1000)) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      });
    }

    // Validate origin (basic CORS check)
    if (!validateOrigin(req)) {
      return res.status(403).json({
        error: 'Forbidden',
        message: 'Invalid origin'
      });
    }

    // Get path parameter
    const { path } = req.query;
    
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Path parameter is required and must be a string' 
      });
    }

    // Validate video path format
    if (!validateVideoPath(path)) {
      return res.status(400).json({
        error: 'Invalid path',
        message: 'Video path must be in allowed directories and have valid extension'
      });
    }

    // Check environment variables
    if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || 
        !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
      console.error('Missing R2 environment variables');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Video service is temporarily unavailable'
      });
    }

    // Generate signed URL with 1 hour expiration
    const signedUrl = await getSignedUrl(path, 3600);
    
    // Log successful request (for monitoring)
    console.log(`Generated signed URL for: ${path} (IP: ${clientIP})`);
    
    res.status(200).json({
      url: signedUrl,
      expires: Date.now() + (3600 * 1000), // 1 hour from now
      success: true
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    
    // Don't expose internal errors to client
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to generate video URL. Please try again later.'
    });
  }
}
