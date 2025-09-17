pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Must match the name in Manage Jenkins > Global Tool Configuration
    }

    environment {
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/AnishN04/fullstack3.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install --no-audit --no-fund'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install --no-audit --no-fund'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    bat 'npm test -- --watchAll=false --passWithNoTests'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test'
                }
            }
        }
    }

    post {
        always {
            echo "Build finished. Cleaning workspace..."
            cleanWs()
        }
    }
}
