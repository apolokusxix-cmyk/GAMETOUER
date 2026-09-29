@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 server.py
  goto :end
)
where python >nul 2>nul
if %errorlevel%==0 (
  python server.py
  goto :end
)
echo No se encontro Python. Instala Python 3 y vuelve a tocar iniciar.bat.
echo El juego necesita Python para abrirse en el navegador.
pause
:end
endlocal
