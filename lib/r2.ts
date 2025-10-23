import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getS3SignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize R2 client
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

/**
 * Generate a signed URL for R2 object access
 * @param key - The object key in the R2 bucket
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Promise<string> - The signed URL
 */
export async function getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    const signedUrl = await getS3SignedUrl(r2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw new Error('Failed to generate signed URL');
  }
}

/**
 * Validate video path format (enhanced security)
 * @param path - The video path to validate
 * @returns boolean - Whether the path is valid
 */
export function validateVideoPath(path: string): boolean {
  // Security checks
  if (!path || typeof path !== 'string') return false;
  
  // Prevent path traversal attacks
  if (path.includes('..') || path.includes('//') || path.startsWith('/')) {
    return false;
  }
  
  // Allow only video files in specific directories
  const allowedExtensions = ['.mp4', '.mov', '.avi', '.webm'];
  const allowedDirectories = ['videos/', 'shooting/', 'ball-handling/', 'stepback/', 'defense/', 'athletic/'];
  
  const hasValidExtension = allowedExtensions.some(ext => path.toLowerCase().endsWith(ext));
  const hasValidDirectory = allowedDirectories.some(dir => path.startsWith(dir));
  
  // Additional length check
  const isValidLength = path.length > 0 && path.length < 200;
  
  return hasValidExtension && hasValidDirectory && isValidLength;
}
