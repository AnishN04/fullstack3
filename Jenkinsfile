pipeline {
    agent any

    environment {
        CI = 'true'
        // MongoDB Atlas connection for backend tests
        MONGO_URI = 'mongodb+srv://anishningala2018_db_user:Anish0204@lostandfound.1sduv0o.mongodb.net/?retryWrites=true&w=majority&appName=lostandfound'
    }

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

        stage('Run Frontend Tests with Coverage') {
            steps {
                dir('frontend') {
                    bat 'npm test -- --passWithNoTests --watchAll=false --coverage'
                }
            }
        }

        stage('Run Backend Tests with Coverage') {
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
                withCredentials([string(credentialsId: 'codacy-project-token', variable: 'CODACY_PROJECT_TOKEN')]) {
                    sh '''
                        # Upload frontend coverage
                        if [ -f frontend/coverage/lcov.info ]; then
                          bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r frontend/coverage/lcov.info
                        fi

                        # Upload backend coverage
                        if [ -f backend/coverage/lcov.info ]; then
                          bash <(curl -Ls https://coverage.codacy.com/get.sh) report -r backend/coverage/lcov.info
                        fi
                    '''
                }
            }
        }

        stage('Codacy Analysis') {
            steps {
                withCredentials([string(credentialsId: 'codacy-project-token', variable: 'CODACY_PROJECT_TOKEN')]) {
                    sh '''
                        # Install Codacy CLI v2
                        bash <(curl -Ls https://raw.githubusercontent.com/codacy/codacy-cli-v2/main/codacy-cli.sh)

                        # Run analysis & generate SARIF
                        codacy-cli analyze --format sarif -o codacy.sarif || true

                        # Upload SARIF results to Codacy (associate with current commit)
                        codacy-cli upload -s codacy.sarif -c "$(git rev-parse HEAD)" -t "$CODACY_PROJECT_TOKEN" || true
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
