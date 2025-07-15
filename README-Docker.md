# MNC Training Games - Docker Setup

This document provides instructions for running the MNC Training Games application using Docker.

## 🐳 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- At least 2GB of available RAM
- At least 5GB of available disk space

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
cd MNC-Training-Games
```

### 2. Set Environment Variables
```bash
# Copy the example environment file
cp env.example .env

# Edit the .env file with your configuration
nano .env
```

### 3. Build and Run
```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

### 4. Access the Application
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 📁 Docker Configuration Files

### Frontend (`skill-quest-mnc-games-29-main/`)
- `Dockerfile` - Multi-stage build for React app
- `nginx.conf` - Nginx configuration for serving static files

### Backend (`Backend/`)
- `Dockerfile` - Node.js application container

### Root Directory
- `docker-compose.yml` - Orchestrates all services
- `docker-compose.simple.yml` - Simplified setup for college projects
- `mongo-init.js` - MongoDB initialization script
- `.dockerignore` - Excludes unnecessary files from builds

## 🔧 Services Overview

### 1. MongoDB Database
- **Image**: `mongo:7.0`
- **Port**: 27017
- **Volume**: `mongodb_data` (persistent data)
- **Credentials**: admin/password123

### 2. Backend API
- **Build**: Custom Node.js application
- **Port**: 5000
- **Environment**: Production
- **Dependencies**: MongoDB

### 3. Frontend React App
- **Build**: Multi-stage with Nginx
- **Port**: 80
- **Features**: Static file serving, API proxy

## 🛠️ Development Commands

### Start Services
```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Start specific service
docker-compose up backend
```

### Stop Services
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Stop and remove images
docker-compose down --rmi all
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb

# Follow logs
docker-compose logs -f
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose build --no-cache

# Rebuild specific service
docker-compose build backend
```

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using the ports
   lsof -i :80
   lsof -i :5000
   lsof -i :27017
   ```

2. **MongoDB Connection Issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Access MongoDB shell
   docker-compose exec mongodb mongosh
   ```

3. **Frontend Build Issues**
   ```bash
   # Rebuild frontend
   docker-compose build --no-cache frontend
   ```

4. **Backend API Issues**
   ```bash
   # Check backend logs
   docker-compose logs backend
   
   # Restart backend
   docker-compose restart backend
   ```

### Database Management

```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh

# Backup database
docker-compose exec mongodb mongodump --out /backup

# Restore database
docker-compose exec mongodb mongorestore /backup
```

## 🔒 Security Considerations

### Production Deployment

1. **Change Default Passwords**
   - Update MongoDB credentials
   - Change JWT secret
   - Use strong passwords

2. **Environment Variables**
   ```bash
   # Create production .env file
   cp env.example .env.production
   
   # Update with secure values
   JWT_SECRET=your-very-secure-jwt-secret
   MONGO_INITDB_ROOT_PASSWORD=your-secure-password
   ```

3. **Network Security**
   - Use HTTPS in production
   - Configure firewall rules
   - Enable SSL/TLS certificates

4. **Container Security**
   - Run containers as non-root users
   - Keep base images updated
   - Scan for vulnerabilities

## 📊 Monitoring

### Health Checks
```bash
# Check service status
docker-compose ps

# Check resource usage
docker stats
```

### Logs
```bash
# View all logs
docker-compose logs

# Follow specific service
docker-compose logs -f backend
```

## 🚀 Production Deployment

### Using Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml mnc-training
```

### Using Kubernetes
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://admin:password123@mongodb:27017/mnc_training?authSource=admin` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key-change-in-production` |
| `PORT` | Backend server port | `5000` |
| `NODE_ENV` | Node.js environment | `production` |
| `VITE_API_URL` | Frontend API URL | `http://localhost:5000/api` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Docker logs
- Open an issue on GitHub 