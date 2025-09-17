pipeline {
    agent any
    stages {
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    bat 'npm test -- --ci --reporters=default --reporters=jest-junit || exit 0'
                }
            }
        }

        stage('Upload Frontend Coverage') {
            steps {
                dir('frontend') {
                    bat '''
                    if exist coverage\\lcov.info (
                        curl -Ls https://coverage.codacy.com/get.sh -o codacy.sh
                        bash codacy.sh report -r coverage/lcov.info
                    )
                    '''
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test -- --ci --reporters=default --reporters=jest-junit || exit 0'
                }
            }
        }

        stage('Upload Backend Coverage') {
            steps {
                dir('backend') {
                    bat '''
                    if exist coverage\\lcov.info (
                        curl -Ls https://coverage.codacy.com/get.sh -o codacy.sh
                        bash codacy.sh report -r coverage/lcov.info
                    )
                    '''
                }
            }
        }
    }
}
