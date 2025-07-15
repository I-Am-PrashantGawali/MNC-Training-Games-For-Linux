#!/bin/bash

# MNC Training Games - Quick Start Script for College Project

echo "🎓 MNC Training Games - College Project Setup"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running!"
        echo "Please start Docker Desktop and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Check if docker-compose is available
check_docker_compose() {
    if ! command -v docker-compose &> /dev/null; then
        print_error "docker-compose is not installed!"
        echo "Please install Docker Compose and try again."
        exit 1
    fi
    print_success "Docker Compose is available"
}

# Setup environment file
setup_env() {
    if [ ! -f .env ]; then
        print_warning "Creating .env file from template..."
        cp env.example .env
        print_success "Environment file created"
    else
        print_success "Environment file already exists"
    fi
}

# Start the application
start_application() {
    echo ""
    echo "🚀 Starting MNC Training Games..."
    echo "This may take a few minutes on first run..."
    echo ""
    
    # Stop any existing containers
    docker-compose -f docker-compose.simple.yml down 2>/dev/null
    
    # Start the application
    docker-compose -f docker-compose.simple.yml up --build -d
    
    if [ $? -eq 0 ]; then
        print_success "Application started successfully!"
        echo ""
        echo "🌐 Access your application:"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend API: http://localhost:5000"
        echo "   MongoDB: localhost:27017"
        echo ""
        echo "📊 To view logs:"
        echo "   docker-compose -f docker-compose.simple.yml logs -f"
        echo ""
        echo "🛑 To stop the application:"
        echo "   docker-compose -f docker-compose.simple.yml down"
        echo ""
        print_success "Your college project is ready! 🎓"
    else
        print_error "Failed to start the application"
        echo "Check the logs above for errors."
        exit 1
    fi
}

# Main execution
echo ""
echo "🔍 Checking prerequisites..."

check_docker
check_docker_compose
setup_env

echo ""
echo "📋 Prerequisites check completed!"
echo ""

# Ask user if they want to start the application
read -p "Do you want to start the application now? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    start_application
else
    echo ""
    echo "📝 To start the application later, run:"
    echo "   docker-compose -f docker-compose.simple.yml up --build"
    echo ""
    echo "📖 For more information, see README-College-Project.md"
fi 