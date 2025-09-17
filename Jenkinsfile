pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/AnishN04/fullstack3.git',
                    credentialsId: 'github-pat'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install --no-audit --no-fund'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install --no-audit --no-fund'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --ci --passWithNoTests'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test -- --ci --passWithNoTests'
                }
            }
        }
    }

    post {
        always {
            echo "Build finished. Cleaning workspace..."
            cleanWs()
        }
        success {
            echo "✅ Build succeeded!"
        }
        failure {
            echo "❌ Build failed! Check logs above."
        }
    }
}
