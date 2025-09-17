pipeline {
    agent any

    tools {
        nodejs "NodeJS" // Make sure your Jenkins NodeJS tool is named exactly "NodeJS"
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
                    // Run frontend tests; fail build if tests fail
                    bat 'npm test -- --passWithNoTests'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    // Run backend tests normally; failures will fail the build
                    bat 'npm test'
                }
            }
        }
    }
}
