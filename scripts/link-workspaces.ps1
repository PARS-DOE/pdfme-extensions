Set-Location -Path "packages"

# Link all packages
Get-ChildItem -Directory | ForEach-Object {
    Set-Location -Path $_.Name
    npm link
    Set-Location -Path ".."
}

# Special handling for generator and ui
$specialDirs = @("generator", "ui")
foreach ($dir in $specialDirs) {
    Set-Location -Path $dir
    npm link @pdfme/common
    npm link @pdfme/schemas
    if ($dir -eq "ui") {
        npm link @pdfme/converter
    }
    Set-Location -Path ".."
}

Set-Location -Path ".."