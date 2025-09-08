# demo.ps1 â€” build and run the scaffold stack locally
docker-compose build
docker-compose up -d
Write-Host "Services started. Backend: http://localhost:8000  Frontend: http://localhost:3000  AI: http://localhost:8100"
