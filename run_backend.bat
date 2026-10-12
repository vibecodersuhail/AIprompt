@echo off
echo ========================================================
echo  Starting AI Prompt Generator - FastAPI Backend Server
echo ========================================================
echo  API URL: http://127.0.0.1:8000
echo  API Documentation: http://127.0.0.1:8000/docs
echo ========================================================
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --app-dir backend --reload
pause
