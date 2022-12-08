@echo off
set DestPath=K:\lainjuren\image
for /r %DestPath% %%i in (.) do (
echo %%i
cd %%i
ren *.png *.jpg 
)
pause
