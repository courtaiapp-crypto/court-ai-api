import { NextApiRequest } from 'next';

/**
 * Simple rate limiting implementation
 * In production, consider using Redis or a more sophisticated solution
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

/**
 * Check if request is within rate limit
 * @param ip - Client IP address
 * @param limit - Maximum requests per window
 * @param windowMs - Window duration in milliseconds
 * @returns boolean - Whether request is allowed
 */
export function checkRateLimit(
  ip: string, 
  limit: number = 100, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const now = Date.now();
  const key = ip;
  
  const current = rateLimitMap.get(key);
  
  if (!current || now > current.resetTime) {
    // Reset or initialize
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= limit) {
    return false;
  }
  
  current.count++;
  return true;
}

/**
 * Get client IP address from request
 * @param req - Next.js API request
 * @returns string - Client IP address
 */
export function getClientIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded 
    ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
    : req.socket.remoteAddress || 'unknown';
  
  return ip;
}

/**
 * Validate request origin (enhanced CORS check)
 * @param req - Next.js API request
 * @returns boolean - Whether origin is allowed
 */
export function validateOrigin(req: NextApiRequest): boolean {
  const origin = req.headers.origin;
  const userAgent = req.headers['user-agent'] || '';
  
  // Allow requests without origin (mobile apps)
  if (!origin) {
    // Additional validation for mobile apps
    return userAgent.includes('Expo') || userAgent.includes('ReactNative');
  }
  
  const allowedOrigins = [
    'exp://localhost:8081', // Expo development
    'exp://192.168.1.100:8081', // Expo development (local network)
    'courtai://', // Custom scheme
  ];
  
  // Strict origin validation
  return allowedOrigins.some(allowed => origin === allowed);
}
