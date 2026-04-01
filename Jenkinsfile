pipeline {
    agent any

    triggers {
        cron('H/90 * * * *')
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Test') {
            steps {
                bat 'npx playwright test --project=chromium'
            }
        }

        stage('Generate HTML Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }

        success {
            echo 'Playwright test executed successfully'
        }

        failure {
            echo 'Playwright test failed'
        }
    }
}
