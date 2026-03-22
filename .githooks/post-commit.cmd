@echo off
setlocal enabledelayedexpansion

for /f "delims=" %%B in ('git symbolic-ref --quiet --short HEAD 2^>nul') do set "BRANCH=%%B"
if not defined BRANCH exit /b 0

for /f "delims=" %%R in ('git config hooks.autopush.remote 2^>nul') do set "REMOTE=%%R"
if not defined REMOTE set "REMOTE=origin"

git remote get-url "%REMOTE%" >nul 2>nul
if errorlevel 1 exit /b 0

for /f "delims=" %%A in ('git config --bool hooks.autopush.allBranches 2^>nul') do set "ALL_BRANCHES=%%A"
if /i not "!BRANCH!"=="main" if /i not "!ALL_BRANCHES!"=="true" exit /b 0

git rev-parse --verify --quiet "@{u}" >nul 2>nul
if not errorlevel 1 (
  for /f %%H in ('git rev-list --count "@{u}..HEAD" 2^>nul') do set "AHEAD=%%H"
  if "!AHEAD!"=="0" exit /b 0
)

echo [auto-push] Pushing !BRANCH! to !REMOTE!...
git push "%REMOTE%" "!BRANCH!"
exit /b %errorlevel%
