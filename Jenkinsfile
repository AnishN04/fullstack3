pipeline {
    agent any

    environment {
        CI = 'true'
        MONGO_URI = 'mongodb+srv://anishningala2018_db_user:Anish0204@lostandfound.1sduv0o.mongodb.net/?retryWrites=true&w=majority&appName=lostandfound'
    }

    tools {
        nodejs "NodeJS"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ShanmukYadav/fullstack-master.git'
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

        stage('Upload Coverage to Codacy') {
            steps {
                withCredentials([string(credentialsId: 'CODACY_PROJECT_TOKEN', variable: 'CODACY_PROJECT_TOKEN')]) {
                    // Install curl on Windows Jenkins agent if needed
                    bat """
                        bash -c "bash <(curl -Ls https://coverage.codacy.com/get.sh) report -l JavaScript -r frontend/coverage/lcov.info"
                        bash -c "bash <(curl -Ls https://coverage.codacy.com/get.sh) report -l JavaScript -r backend/coverage/lcov.info"
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Build finished.'
        }
    }
}
