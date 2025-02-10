pipeline {
    agent any

    stages {
        stage('Build Start') {
            steps {
                script {
                // Jenkins Credentials에서 Secret Text 가져오기
                // credentialsId : credentials 생성 당시 작성한 
                // variable : 스크립트 내부에서 사용할 변수 이름 
                withCredentials([string(credentialsId: 'discord-webhook', variable: 'discord_webhook')]) {
                        // 디스코드 알림 메세지 작성 
                        // description : 메세지 설명문
                        // link : Jenkins BUILD 주소
                        // title : 메세지 제목
                        // webhookURL : 메세지 전송 URL
                        discordSend description: """
                        Jenkins Build Start
                        """,
                        link: env.BUILD_URL, 
                        title: "🐅 ${env.JOB_NAME} : ${currentBuild.displayName} 시작", 
                        webhookURL: "$discord_webhook"
                    }
                }
            }
        }

        stage("Copy Environment Variable File") {
            steps {
                script {
                    // withCredentials: Credentials 서비스를 활용
                    // file: secret file을 불러옴
                    // credentialsId: 불러올 file의 식별 ID
                    // variable: 블록 내부에서 사용할 변수명
                    withCredentials([file(credentialsId: 'env-file', variable: 'env_file')]) {
                        // Jenkins 서비스 내 .env 파일을 파이프라인 프로젝트 내부로 복사
                        sh 'cp $env_file .env'

                        // 파일 권한 설정
                        // 소유자: 읽기 + 쓰기 권한, 그 외: 읽기 권한
                        sh 'chmod 644 .env'
                    }
                }
            }
        }

        stage("Docker Image Build & Container Run") {
            steps {
                script {
                    sh 'docker compose build'
                    sh 'docker compose up -d'
                }
            }
        }
    }
    
    post {
		    always {
				    echo '항상 실행된다.'
		    }
		    
		    success {
                withCredentials([string(credentialsId: 'discord-webhook', variable: 'discord_webhook')]) {
                            discordSend description: """
                            제목 : ${currentBuild.displayName}
                            결과 : ${currentBuild.currentResult}
                            실행 시간 : ${currentBuild.duration / 1000}s
                            """,
                            link: env.BUILD_URL, result: currentBuild.currentResult, 
                            title: "🐅 ${env.JOB_NAME} : ${currentBuild.displayName} 성공", 
                            webhookURL: "$discord_webhook"
                }
            }
            failure {
                withCredentials([string(credentialsId: 'discord-webhook', variable: 'discord_webhook')]) {
                            discordSend description: """
                            제목 : ${currentBuild.displayName}
                            결과 : ${currentBuild.currentResult}
                            실행 시간 : ${currentBuild.duration / 1000}s
                            """,
                            link: env.BUILD_URL, result: currentBuild.currentResult, 
                            title: "🐅 ${env.JOB_NAME} : ${currentBuild.displayName} 실패", 
                            webhookURL: "$discord_webhook"
                }
            }
    }
}