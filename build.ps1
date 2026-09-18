$ErrorActionPreference = 'Stop'

$output = Join-Path $PSScriptRoot 'dist'
New-Item -ItemType Directory -Path $output -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'index.html') -Destination $output -Force
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'wavedash.js') -Destination $output -Force
Get-ChildItem -LiteralPath $PSScriptRoot -Filter '*.png' -File |
    Copy-Item -Destination $output -Force

Write-Output "Wavedash build ready: $output"
