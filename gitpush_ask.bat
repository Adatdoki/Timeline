@echo off
set /p MSG=Commit üzenet:
git add .
git commit -m "%MSG%"
git push
pause
