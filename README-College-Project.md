# MNC Training Games - College Project

A gamified corporate training platform built with React, Node.js, and MongoDB.

## 🎯 Project Overview

This is a **college project** that demonstrates:
- **Frontend**: React with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js with Express, MongoDB
- **Authentication**: JWT-based user management
- **Gamification**: 8 different training games
- **Containerization**: Docker for easy deployment

## 🚀 Quick Start (College Project Setup)

### Prerequisites
- Docker Desktop installed
- At least 2GB RAM available
- Git installed

### Step 1: Clone and Setup
```bash
# Navigate to project directory
cd MNC-Training-Games

# Copy environment file
cp env.example .env
```

### Step 2: Start the Application
```bash
# Start all services (simple version)
docker-compose -f docker-compose.simple.yml up --build

# Or run in background
docker-compose -f docker-compose.simple.yml up -d --build
```

### Step 3: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 🎮 Features for College Project

### 1. User Authentication
- User registration and login
- JWT token-based authentication
- Protected routes

### 2. Training Games
- **Business Simulation** - Strategic decision making
- **Crisis Management** - Emergency response scenarios
- **Negotiation Game** - Sales and negotiation skills
- **Leadership Game** - Management scenarios
- **AI Learning Game** - Technology training
- **Scribble Game** - Creative problem solving
- **Bingo Game** - Team collaboration
- **Team Sudoku** - Logical thinking

### 3. Dashboard & Analytics
- Progress tracking
- Skill development visualization
- Achievement system
- Performance metrics

### 4. Social Features
- Team management
- Community discussions
- Live sessions
- Event management

## 📁 Project Structure

```
MNC-Training-Games/
├── skill-quest-mnc-games-29-main/  # React Frontend
│   ├── src/
│   │   ├── components/             # UI Components
│   │   ├── pages/                  # Application Pages
│   │   │   └── games/             # Game Components
│   │   ├── contexts/               # React Context
│   │   └── hooks/                  # Custom Hooks
│   ├── Dockerfile                  # Frontend Container
│   └── nginx.conf                  # Web Server Config
├── Backend/                        # Node.js API
│   ├── controllers/                # Request Handlers
│   ├── models/                     # Database Models
│   ├── routes/                     # API Routes
│   ├── middleware/                 # Express Middleware
│   └── Dockerfile                  # Backend Container
├── docker-compose.simple.yml       # Simple Docker Setup
├── docker-compose.yml              # Full Docker Setup
└── README-College-Project.md       # This File
```

## 🛠️ Development Commands

### Start Services
```bash
# Start all services
docker-compose -f docker-compose.simple.yml up

# Start in background
docker-compose -f docker-compose.simple.yml up -d

# View logs
docker-compose -f docker-compose.simple.yml logs -f
```

### Stop Services
```bash
# Stop all services
docker-compose -f docker-compose.simple.yml down

# Stop and remove data
docker-compose -f docker-compose.simple.yml down -v
```

### Rebuild Services
```bash
# Rebuild all services
docker-compose -f docker-compose.simple.yml build --no-cache

# Rebuild specific service
docker-compose -f docker-compose.simple.yml build backend
```

## 🎯 College Project Features

### 1. **Easy Setup**
- One-command deployment
- Pre-configured environment
- No complex configuration needed

### 2. **Modern Tech Stack**
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Containerization**: Docker + Docker Compose
- **UI Library**: shadcn/ui components

### 3. **Real-World Application**
- User authentication system
- Database management
- API development
- Responsive web design
- Game development concepts

### 4. **Learning Outcomes**
- Full-stack development
- Containerization with Docker
- Database design and management
- API development and integration
- Modern web development practices

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the ports
   lsof -i :3000
   lsof -i :5000
   lsof -i :27017
   ```

2. **Docker Not Running**
   ```bash
   # Start Docker Desktop
   # Then run the application
   docker-compose -f docker-compose.simple.yml up
   ```

3. **Build Errors**
   ```bash
   # Clean and rebuild
   docker-compose -f docker-compose.simple.yml down
   docker system prune -f
   docker-compose -f docker-compose.simple.yml up --build
   ```

4. **Database Connection Issues**
   ```bash
   # Check MongoDB logs
   docker-compose -f docker-compose.simple.yml logs mongodb
   
   # Access MongoDB shell
   docker-compose -f docker-compose.simple.yml exec mongodb mongosh
   ```

## 📊 Project Metrics

### Code Statistics
- **Frontend**: ~50 components, 8 game modules
- **Backend**: 4 controllers, 3 models, 2 routes
- **Total Lines**: ~15,000+ lines of code
- **Technologies**: 15+ modern web technologies

### Features Implemented
- ✅ User Authentication System
- ✅ 8 Interactive Training Games
- ✅ Real-time Dashboard
- ✅ Progress Tracking
- ✅ Achievement System
- ✅ Team Management
- ✅ Responsive Design
- ✅ Docker Containerization

## 🎓 Academic Value

### Learning Objectives Met
1. **Full-Stack Development**: Complete web application
2. **Database Design**: MongoDB schema and relationships
3. **API Development**: RESTful API with Express
4. **Frontend Development**: Modern React with TypeScript
5. **Containerization**: Docker deployment
6. **Version Control**: Git workflow
7. **Project Management**: Organized code structure

### Skills Demonstrated
- Modern JavaScript/TypeScript
- React Hooks and Context API
- Node.js and Express.js
- MongoDB and Mongoose
- Docker and containerization
- RESTful API design
- Responsive web design
- Git version control

## 📝 Documentation

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Database Collections
- `users` - User accounts and profiles
- `games` - Game progress and scores
- `achievements` - User achievements and badges

## 🚀 Deployment Options

### 1. Local Development
```bash
docker-compose -f docker-compose.simple.yml up
```

### 2. Production (Optional)
```bash
docker-compose -f docker-compose.yml up -d
```

### 3. Cloud Deployment
- **Heroku**: Easy deployment with Docker
- **AWS**: EC2 with Docker
- **Google Cloud**: Cloud Run
- **Azure**: Container Instances

## 📞 Support

For college project questions:
1. Check the troubleshooting section
2. Review Docker logs
3. Ensure Docker Desktop is running
4. Verify ports are not in use

## 🎯 Project Submission

### Files to Include
- Complete source code
- Docker configuration files
- README documentation
- Screenshots of application
- Demo video (optional)

### Presentation Points
- Technology stack overview
- Key features demonstration
- Code architecture explanation
- Learning outcomes achieved
- Future enhancement possibilities

---

**Good luck with your college project! 🎓✨** 