pipeline {
    agent any

    environment {
        CI = 'true'
        MONGO_URI = 'mongodb+srv://anishningala2018_db_user:Anish0204@lostandfound.1sduv0o.mongodb.net/?retryWrites=true&w=majority&appName=lostandfound'
        CODACY_PROJECT_TOKEN = credentials('codacy-project-token') // store Codacy token securely in Jenkins
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
                    bat 'npm test -- --passWithNoTests --watchAll=false --coverage'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    withEnv(["MONGO_URI=${env.MONGO_URI}"]) {
                        bat 'npm test -- --coverage'
                    }
                }
            }
        }

        stage('Codacy Analysis') {
            steps {
                dir('frontend') {
                    // Download and run Codacy CLI
                    powershell '''
                        Invoke-WebRequest -Uri "https://github.com/codacy/codacy-analysis-cli/releases/latest/download/codacy-analysis-cli-windows-x64.exe" -OutFile "codacy-analysis-cli.exe"
                        .\\codacy-analysis-cli.exe analyze --tool eslint --output codacy-results.json --verbose
                    '''
                }
            }
        }

        stage('Upload Coverage Reports to Codacy') {
            steps {
                powershell '''
                    # Download Codacy Coverage Reporter
                    Invoke-WebRequest -Uri "https://coverage.codacy.com/get.sh" -OutFile "codacy-coverage.sh"

                    # Run coverage upload for frontend if file exists
                    if (Test-Path "frontend\\coverage\\lcov.info") {
                        bash codacy-coverage.sh report -r frontend/coverage/lcov.info
                    }

                    # Run coverage upload for backend if file exists
                    if (Test-Path "backend\\coverage\\lcov.info") {
                        bash codacy-coverage.sh report -r backend/coverage/lcov.info
                    }
                '''
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
