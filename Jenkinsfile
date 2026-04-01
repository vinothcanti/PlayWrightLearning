pipeline {
    agent any

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
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test --project=chromium'
            }
        }

        stage('Publish Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            emailext (
                subject: "✅ BUILD SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Hello Vinoth,

                ✅ Playwright tests PASSED successfully!

                Job Name    : ${env.JOB_NAME}
                Build Number: ${env.BUILD_NUMBER}
                Build Status: ${currentBuild.currentResult}
                Duration    : ${currentBuild.durationString}

                🔗 Build URL : ${env.BUILD_URL}
                📊 Report    : ${env.BUILD_URL}Playwright_20HTML_20Report/

                Regards,
                Jenkins Automation
                """,
                to: 'vinothcanti@gmail.com',
                mimeType: 'text/plain'
            )
        }

        failure {
            emailext (
                subject: "❌ BUILD FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Hello Vinoth,

                ❌ Playwright tests FAILED!

                Job Name    : ${env.JOB_NAME}
                Build Number: ${env.BUILD_NUMBER}
                Build Status: ${currentBuild.currentResult}
                Duration    : ${currentBuild.durationString}

                🔗 Build URL  : ${env.BUILD_URL}
                📋 Console Log: ${env.BUILD_URL}console

                Please check the logs for details.

                Regards,
                Jenkins Automation
                """,
                to: 'vinothcanti@gmail.com',
                mimeType: 'text/plain'
            )
        }
    }
}