@echo off
title Site IA PRO 2026 - laissez cette fenetre ouverte
cd /d "%~dp0"
echo Demarrage du site... il s'ouvrira dans votre navigateur.
start "" cmd /c "timeout /t 12 /nobreak >nul && start http://localhost:3000"
call "C:\Program Files\nodejs\npm.cmd" run dev -- -p 3000
pause
