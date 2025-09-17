pipeline {
    agent any

    environment {
        CI = 'true'
        MONGO_URI = 'mongodb+srv://anishningala2018_db_user:Anish0204@lostandfound.1sduv0o.mongodb.net/?retryWrites=true&w=majority&appName=lostandfound'
        CODACY_PROJECT_TOKEN = credentials('codacy-project-token') // Secure Jenkins credential
    }

    tools {
        nodejs "NodeJS"
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
                    bat 'npm test -- --passWithNoTests --watchAll=false'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    withEnv(["MONGO_URI=${env.MONGO_URI}"]) {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Codacy Analysis') {
            steps {
                dir('frontend') {
                    // Download and run Codacy CLI for Windows
                    powershell '''
                        Invoke-WebRequest -Uri "https://github.com/codacy/codacy-analysis-cli/releases/latest/download/codacy-analysis-cli-windows-x64.exe" -OutFile "codacy-analysis-cli.exe"
                        .\\codacy-analysis-cli.exe analyze --tool eslint --output codacy-results.json --verbose
                    '''
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Build finished.'
            }
        }
    }
}
