    pipeline {
        agent any
    
        tools {
            nodejs 'Node18'
        }
    
        triggers {
            cron('H/10 * * * *')
        }
    
        stages {
            stage('Checkout Code') {
                steps {
                    git branch: 'master',
                        url: 'https://github.com/vinothcanti/PlayWrightLearning.git'
                }
            }
    
            stage('Install Dependencies') {
                steps {
                    bat 'npm install'
                    bat 'npx playwright install'
                }
            }
    
            stage('Run Playwright Test') {
                steps {
                    bat 'npx playwright test --reporter=html'
                }
            }
        }
    
        post {
            always {
                emailext(
                    to: 'vinothcanti@gmail.com',
                    subject: 'Playwright Test Report',
                    body: 'Latest execution report attached.',
                    attachmentsPattern: 'playwright-report/**'
                )
            }
        }
    }
