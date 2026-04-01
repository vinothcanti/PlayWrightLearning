pipeline {
    agent any

    triggers {
        cron('H/10 * * * *')   // Runs every 10 minutes
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

        stage('Generate HTML Report') {
            steps {
                bat 'npx playwright show-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            emailext (
                subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME}",
                body: """
                Hello Vinoth,

                Jenkins Playwright execution completed.

                Build Status: ${currentBuild.currentResult}
                Job Name: ${env.JOB_NAME}
                Build Number: ${env.BUILD_NUMBER}

                Check report in Jenkins:
                ${env.BUILD_URL}

                Regards,
                Jenkins Automation
                """,
                to: 'vinothcanti@gmail.com'
            )
        }
    }
}