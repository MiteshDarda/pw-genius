# Docker Setup for Backend

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
NODE_ENV=production
PORT=3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/pw_genius

# AWS Configuration
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_S3_BUCKET=pw-bucket-mitesh

# Frontend URL
VITE_BACKEND_URL=http://localhost:3000
```

## Docker Commands

### Build the Docker image
```bash
docker build -t pw-genius-backend .
```

### Run with Docker Compose
```bash
docker-compose up -d
```

### Run without Docker Compose
```bash
docker run -d \
  --name pw-genius-backend \
  -p 3000:3000 \
  --env-file .env \
  pw-genius-backend
```

### Development with Docker
```bash
# Build and run in development mode
docker-compose -f docker-compose.dev.yml up --build
```

## Environment Variables in Docker

The Docker setup supports the following environment variables:

- `NODE_ENV`: Environment mode (development/production)
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `AWS_REGION`: AWS region for S3
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_S3_BUCKET`: S3 bucket name
- `VITE_BACKEND_URL`: Frontend URL for CORS

## Health Check

The container includes a health check that verifies the API is responding:
- Endpoint: `http://localhost:3000/api/health`
- Interval: 30 seconds
- Timeout: 10 seconds
- Retries: 3

## Security Features

- Non-root user (nestjs:nodejs)
- Multi-stage build for smaller image size
- Production-only dependencies
- Health checks for monitoring 