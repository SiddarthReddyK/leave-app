# EduLeave - Deployment Guide

## Prerequisites

- Node.js v16+ installed
- MongoDB Atlas account (or self-hosted MongoDB)
- Git account (for version control)
- Hosting platform account (Heroku, Vercel, Netlify, AWS, DigitalOcean, etc.)

## Backend Deployment

### Option 1: Deploy to Heroku

#### Step 1: Install Heroku CLI

```bash
# Windows
choco install heroku-cli

# macOS
brew tap heroku/brew && brew install heroku

# Linux
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

#### Step 2: Create Heroku App

```bash
cd backend
heroku login
heroku create eduleave-backend
heroku addons:create mongolab:sandbox
```

#### Step 3: Set Environment Variables

```bash
heroku config:set JWT_SECRET=your_secure_secret_key_here
heroku config:set NODE_ENV=production
```

#### Step 4: Create Procfile

```bash
# In backend directory, create file: Procfile
echo "web: node src/server.js" > Procfile
```

#### Step 5: Deploy

```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Option 2: Deploy to DigitalOcean App Platform

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/eduLeave-backend.git
git push -u origin main
```

#### Step 2: Connect to DigitalOcean

- Log in to DigitalOcean dashboard
- Click "Create" → "Apps"
- Select your GitHub repository
- Configure environment variables
- Set PORT=8080
- Add MongoDB connection string

#### Step 3: Deploy

- Click "Deploy"
- Wait for deployment to complete

### Option 3: Deploy to AWS EC2

#### Step 1: Launch EC2 Instance

```bash
# Choose Ubuntu 20.04 LTS
# t2.micro (free tier eligible)
# Open ports: 22 (SSH), 80, 443, 5000
```

#### Step 2: SSH into Instance

```bash
ssh -i "your-key.pem" ubuntu@your-instance-public-dns
```

#### Step 3: Install Dependencies

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y mongodb
sudo apt-get install -y git
```

#### Step 4: Clone Repository

```bash
git clone https://github.com/yourusername/eduLeave-backend.git
cd eduLeave-backend/backend
npm install
```

#### Step 5: Create .env File

```bash
nano .env
# Add:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/eduLeave
# JWT_SECRET=your_secure_secret_key_here
# NODE_ENV=production
```

#### Step 6: Start MongoDB

```bash
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Step 7: Use PM2 for Process Management

```bash
npm install -g pm2
pm2 start src/server.js --name "eduleave-api"
pm2 save
pm2 startup
```

## Frontend Deployment

### Option 1: Deploy to Vercel

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Configure .env.production

```bash
cd frontend
echo "REACT_APP_API_URL=https://your-backend-url.com" > .env.production
```

#### Step 3: Deploy

```bash
vercel --prod
```

### Option 2: Deploy to Netlify

#### Step 1: Build React App

```bash
cd frontend
npm run build
```

#### Step 2: Deploy via Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or drag & drop build folder to Netlify dashboard

#### Step 3: Set Environment Variables

- Go to Site settings → Build & deploy → Environment
- Add: `REACT_APP_API_URL=https://your-backend-url.com`

### Option 3: Deploy to AWS S3 + CloudFront

#### Step 1: Build React App

```bash
cd frontend
npm run build
```

#### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://eduleave-frontend
```

#### Step 3: Upload Build Files

```bash
aws s3 sync build/ s3://eduleave-frontend/
```

#### Step 4: Create CloudFront Distribution

- Go to CloudFront console
- Create new distribution
- Set origin to your S3 bucket
- Use default CloudFront domain or custom domain

## Database Setup

### MongoDB Atlas (Cloud)

#### Step 1: Create Account

- Go to mongodb.com/cloud/atlas
- Sign up for free account
- Create organization and project

#### Step 2: Create Cluster

- Click "Create Cluster"
- Choose free tier (M0)
- Select region closest to users
- Click "Create Cluster"

#### Step 3: Configure Security

- Network Access → Add IP address
- Database Access → Create database user

#### Step 4: Get Connection String

- Click "Connect" → "Connect Your Application"
- Copy connection string
- Replace `<password>` with database password

#### Step 5: Use in .env

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eduLeave?retryWrites=true&w=majority
```

### Self-Hosted MongoDB

#### Step 1: Install MongoDB

```bash
# Ubuntu
sudo apt-get install -y mongodb

# macOS
brew install mongodb-community

# Windows
# Download installer from mongodb.com
```

#### Step 2: Start MongoDB

```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Step 3: Create Database

```bash
mongosh
> use eduLeave
> db.createCollection("users")
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Certbot)

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
```

### Using AWS Certificate Manager

- Go to AWS Certificate Manager
- Request certificate for your domain
- Validate domain ownership
- Attach to CloudFront distribution

## Environment Variables Production Checklist

### Backend

- [ ] `MONGODB_URI` - Production MongoDB connection
- [ ] `JWT_SECRET` - Strong random secret (32+ characters)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `PORT` - Set to 80 or 443 (if using reverse proxy: 8080)
- [ ] `CORS_ORIGIN` - Frontend domain URL

### Frontend

- [ ] `REACT_APP_API_URL` - Backend production URL
- [ ] `PUBLIC_URL` - Your frontend domain (if applicable)

## Post-Deployment Checklist

- [ ] Test login with all roles
- [ ] Test leave application submission
- [ ] Test teacher approval workflow
- [ ] Test admin dashboard
- [ ] Verify emails/notifications (if implemented)
- [ ] Check SSL certificate validity
- [ ] Monitor error logs
- [ ] Setup automated backups
- [ ] Configure CDN for static assets
- [ ] Setup monitoring and alerts

## Monitoring & Logging

### Backend Logging with Winston

```bash
npm install winston
```

### Application Monitoring

- Sentry for error tracking
- DataDog for performance monitoring
- CloudWatch/Loggly for logs

### Database Monitoring

- MongoDB Atlas dashboard
- Monitor storage usage
- Setup automated backups

## Scaling Considerations

1. **Horizontal Scaling**
   - Load balancer (NGINX/AWS ALB)
   - Multiple backend instances
   - Session management (Redis)

2. **Vertical Scaling**
   - Upgrade EC2/App Platform instance size
   - Increase database resources

3. **Caching**
   - Redis for session management
   - CloudFront for static assets
   - Browser caching with proper headers

## Rollback Plan

### If Deployment Fails

```bash
# Heroku
heroku releases
heroku rollback v10

# AWS CodeDeploy
# Revert to previous version in deployment pipeline

# Manual rollback
git revert <commit-hash>
git push origin main
```

## Support & Maintenance

- Monitor uptime with tools like UptimeRobot
- Set up error notifications
- Regular security updates
- Database maintenance and optimization
- Monthly backup verification

## Cost Estimation (Monthly)

| Service          | Free Tier          | Paid Tier          |
| ---------------- | ------------------ | ------------------ |
| Backend Hosting  | Heroku free → Paid | $5-50+             |
| Frontend Hosting | Vercel/Netlify     | Free+              |
| Database         | MongoDB M0         | $9-100+            |
| CDN              | -                  | $0.085-0.17 per GB |
| Email Service    | 200/month          | 10-50+             |
| Monitoring       | Limited free       | $10-50+            |

**Total Estimate**: $20-250+/month depending on scale
