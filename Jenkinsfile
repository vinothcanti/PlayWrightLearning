pipeline {
    agent any

    triggers {
        cron('H/30 * * * *')
    }

    environment {
        BRANCH_NAME = 'feature/login-automation'
        REPO_URL = 'https://github.com/vinothcanti/PlayWrightLearning.git'
        PATH = "C:\\Program Files\\nodejs;${env.PATH}"
    }

    stages {

        stage('Check Node & NPM') {
            steps {
                echo 'Checking Node.js installation...'
                bat 'node -v'
                bat 'npm -v'
                bat 'npx playwright --version'
            }
        }

        stage('Checkout Code') {
            steps {
                echo 'Checking out latest code from GitHub...'
                git branch: "${BRANCH_NAME}",
                    url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm ci'

                echo 'Installing Playwright browsers...'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Executing Playwright test suite...'
                bat 'npx playwright test tests/register.spec.ts --project=chromium'
            }
        }

        stage('Publish HTML Report') {
            steps {
                echo 'Publishing Playwright HTML report...'
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo 'Archiving test artifacts...'

            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }

        success {
            mail to: 'vinothcanti@gmail.com',
                 subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """
Playwright test execution PASSED successfully.

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Please check HTML report in Jenkins.
"""
        }

        failure {
            mail to: 'vinothcanti@gmail.com',
                 subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: """
Playwright test execution FAILED.

Job Name: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Console Log: ${env.BUILD_URL}console

Please review failed test cases.
"""
        }
    }
}