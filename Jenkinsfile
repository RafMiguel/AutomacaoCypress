pipeline{

    agent any

        parameters{

            string(name: "spec", defaultValue: "cypress/e2e/**/**", description: "Location where the spec file(s) are in project")
            choice(name: "browser", choices: ['chrome', 'edge', 'firefox'], description: "Pick a browser to run the test spec")

                            }

        options{

            ansiColor('xterm')

                        }

        stages{
            stage('Build'){

                steps{

                    echo('Building application')

                        }

                                 }
            stage('Testing'){

                steps{
                    sh "npm install"
                    sh "npm run cli --browser ${browser} --spec ${spec}"
                        }
                                        }
            stage('Deploy'){

                steps{

                    echo "Deploying application"
                        }

                                     }
                    }

        post{
            always{
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/validation/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '', useWrapperFileDirectly: true])
                        }
              }    
    

}