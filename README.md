# AgroXchange.Web
Web App layer of AgroXchange project

Article for Azure Pipeline releases:
https://www.olivercoding.com/2019-01-27-angular-azure-cdn

CI/CD:
deploy.sh is used for automated deployments on a Linux web app instance of Azure.
Deploying to Storage/CDN is better. Use Azure Pipelines for this. azure-pipelines.yml sets up the build stage. Setup the release to trigger after the automated build and use /angular/ folder artifacts to copy to Storage.