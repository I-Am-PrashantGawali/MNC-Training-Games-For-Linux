pipeline {
    agent any

    stages {

        stage('Checkout Repo') {
            steps {
                echo 'Checking out source code...'
                // This automatically clones your GitHub repo
                
                checkout scm
            }
        }

        stage('Build & Run with Docker Compose') {
            steps {
                echo 'Building and starting containers...'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Check Running Containers') {
            steps {
                echo 'Listing running containers...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            slackSend (
                channel: '#jenkins-notify',
                color: 'good',
                message: "✅ *BUILD PASSED* for ${env.JOB_NAME} #${env.BUILD_NUMBER} <${env.BUILD_URL}|Open>",
                tokenCredentialId: 'SMS',   // <<< SAME FIX
                teamDomain: '',              // <<< Empty if using xoxb bot
                botUser: true
            )
        }
        failure {
            slackSend (
                channel: '#jenkins-notify',
                color: 'danger',
                message: "❌ *BUILD FAILED* for ${env.JOB_NAME} #${env.BUILD_NUMBER} <${env.BUILD_URL}|Open>",
                tokenCredentialId: 'SMS',
                teamDomain: '',
                botUser: true
            )
        }
    }
}

