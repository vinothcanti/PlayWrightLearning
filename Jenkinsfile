pipeline {
    agent any

    triggers {
        cron('H/60 * * * *')
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
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --project=chromium'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            mail to: 'vinothcanti@gmail.com',
                 subject: "✅ SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Playwright tests PASSED!\n\nBuild URL: ${env.BUILD_URL}"
        }

        failure {
            mail to: 'vinothcanti@gmail.com',
                 subject: "❌ FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Playwright tests FAILED!\n\nConsole: ${env.BUILD_URL}console"
        }
    }
}