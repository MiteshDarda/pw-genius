export default (): {
  port: number;
  aws: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    s3Bucket: string;
  };
  frontend: {
    url: string;
  };
  mode: string;
} => ({
  port: parseInt(process.env.PORT) || 3000,
  aws: {
    region: process.env.AWS_REGION || 'us-west-2', // Changed default to us-west-2
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || 'pw-bucket-mitesh', // Updated to match your bucket
  },
  frontend: {
    url: process.env.VITE_BACKEND_URL || 'http://localhost:3000',
  },
  mode: process.env.NODE_ENV || 'development',
});
