@echo off
echo 正在启动本地服务器...
echo.
echo 请选择启动方式：
echo 1. 使用 Python (推荐)
echo 2. 使用 Node.js http-server
echo 3. 直接打开文件
echo.
set /p choice=请输入选择 (1-3): 

if "%choice%"=="1" (
    echo 使用 Python 启动服务器...
    cd /d "%~dp0src"
    echo 服务器地址: http://localhost:8000
    echo 按 Ctrl+C 停止服务器
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo 使用 Node.js 启动服务器...
    cd /d "%~dp0src"
    echo 服务器地址: http://localhost:8080
    echo 按 Ctrl+C 停止服务器
    npx http-server -p 8080
) else if "%choice%"=="3" (
    echo 直接打开文件...
    start "" "%~dp0test.html"
    start "" "%~dp0src\index.html"
) else (
    echo 无效选择，直接打开文件...
    start "" "%~dp0test.html"
    start "" "%~dp0src\index.html"
)

pause