@echo off
setlocal enabledelayedexpansion

:: Aktuális dátum és idő formázása
for /f "tokens=1-3 delims=." %%a in ("%date%") do (
    set yyyy=%%c
    set mm=00%%b
    set dd=00%%a
)

set mm=!mm:~-2!
set dd=!dd:~-2!

for /f "tokens=1-2 delims=:" %%x in ("%time%") do (
    set hh=00%%x
    set min=00%%y
)
set hh=!hh:~-2!
set min=!min:~-2!

set MSG=%yyyy%%mm%%dd%_%hh%%min%

:: Git parancsok
git add .
git commit -m "%MSG%"
git push
