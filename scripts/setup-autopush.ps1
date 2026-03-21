param(
  [switch]$AllBranches,
  [string]$Remote = "origin"
)

$ErrorActionPreference = "Stop"

git config core.hooksPath .githooks
git config hooks.autopush.remote $Remote

if ($AllBranches) {
  git config hooks.autopush.allBranches true
} else {
  git config --unset hooks.autopush.allBranches 2>$null
}

Write-Host "Auto-push hook enabled."
Write-Host "Remote: $Remote"
if ($AllBranches) {
  Write-Host "Mode: all branches"
} else {
  Write-Host "Mode: main only"
}
