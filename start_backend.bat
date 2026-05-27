@echo off
cd /d "C:\Users\ASUS\Desktop\AI Customer"
set PYTHONPATH=C:\Users\ASUS\Desktop\AI Customer
.\venv\Scripts\python.exe -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --timeout-keep-alive 300
pause
