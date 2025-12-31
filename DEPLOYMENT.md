# Ecommerce Application Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB (local or cloud)
- Docker (optional)

## Local Development

### Backend Setup
```bash
cd Backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Option 1: Docker (Recommended)
```bash
# Build and run with docker-compose
docker-compose up -d

# Or build and run manually
docker build -t ecommerce-app .
docker run -p 5000:5000 --env-file .env ecommerce-app
```

### Option 2: Manual Deployment
```bash
# Build frontend
cd frontend
npm run build

# Setup backend
cd ../Backend
npm install --only=production
cp .env.example .env
# Configure production environment variables
npm start
```

## Environment Variables

### Required Variables
- `PORT`: Server port (default: 5000)
- `MONGO_URL`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Optional Variables
- `NODE_ENV`: Set to 'production' for production mode
- `FRONTEND_URL`: Frontend URL for CORS

## Database Setup

### Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Create database
mongosh
use ecommerce
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/atlas
2. Create cluster
3. Get connection string
4. Update `MONGO_URL` in .env

## Platform-Specific Deployment

### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URL=your_mongodb_url
heroku config:set JWT_SECRET=your_secret_key
git push heroku main
```

### Vercel (Frontend only)
```bash
cd frontend
npm run build
vercel --prod
```

### AWS/Google Cloud/Azure
Use Docker deployment with cloud provider's container service.

## Health Checks
The application includes a health check at `/api/users` endpoint.

## Troubleshooting

### Common Issues
1. **Database connection failed**: Check MONGO_URL format and network access
2. **Port already in use**: Change PORT in .env or stop conflicting service
3. **CORS errors**: Ensure FRONTEND_URL is set correctly in production
4. **Build fails**: Check Node.js version compatibility

### Logs
```bash
# Docker logs
docker-compose logs -f

# Application logs
tail -f logs/app.log
```

## Security Considerations
- Use strong JWT_SECRET in production
- Enable MongoDB authentication
- Use HTTPS in production
- Set proper CORS origins
- Implement rate limiting
- Regular security updates
