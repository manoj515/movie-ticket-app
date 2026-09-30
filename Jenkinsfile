pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-nginx-app'
        CONTAINER_NAME = 'my-nginx-container'
        HOST_PORT = '8080'
        CONTAINER_PORT = '80'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${HOST_PORT}:${CONTAINER_PORT} \
                        ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    sleep 5
                    docker ps | grep ${CONTAINER_NAME}
                '''
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
            echo 'Access the application at http://<server-ip>:8080'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
