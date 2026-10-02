# cpanel_bundle.ps1

$rootDir = Get-Location
$standaloneDir = Join-Path $rootDir ".next\standalone"
$publicSource = Join-Path $rootDir "public"
$staticSource = Join-Path $rootDir ".next\static"
$staticDest = Join-Path $standaloneDir ".next\static"
$zipFile = Join-Path $rootDir "deploy_cpanel.zip"

Write-Host "Creating optimized cPanel bundle..." -ForegroundColor Cyan

# 1. Ensure standalone directory exists
if (-not (Test-Path $standaloneDir)) {
    Write-Error "Standalone directory not found! Run 'npm run build' first."
    exit
}

# 2. Copy public folder to standalone
Write-Host "Copying public assets..."
if (Test-Path $publicSource) {
    # Copy contents of public to standalone/public
    $destPublic = Join-Path $standaloneDir "public"
    if (-not (Test-Path $destPublic)) {
        New-Item -ItemType Directory -Path $destPublic -Force | Out-Null
    }
    Copy-Item -Path "$publicSource\*" -Destination $destPublic -Recurse -Force
}

# 3. Copy static assets to standalone/.next/static
Write-Host "Copying static chunks..."
if (-not (Test-Path $staticDest)) {
    New-Item -ItemType Directory -Path $staticDest -Force | Out-Null
}
Copy-Item -Path "$staticSource\*" -Destination $staticDest -Recurse -Force

# 4. Copy content folder to standalone
Write-Host "Copying content JSON files..."
$contentSource = Join-Path $rootDir "content"
if (Test-Path $contentSource) {
    $destContent = Join-Path $standaloneDir "content"
    if (-not (Test-Path $destContent)) {
        New-Item -ItemType Directory -Path $destContent -Force | Out-Null
    }
    Copy-Item -Path "$contentSource\*" -Destination $destContent -Recurse -Force
}

# 4.5. Inject environment variable support for cPanel Node App
Write-Host "Injecting environment loader into server.js..."
$envLocal = Join-Path $rootDir ".env.local"
$envDefault = Join-Path $rootDir ".env"
if (Test-Path $envLocal) {
    Copy-Item -Path $envLocal -Destination $standaloneDir -Force
}
if (Test-Path $envDefault) {
    Copy-Item -Path $envDefault -Destination $standaloneDir -Force
}

$serverJsPath = Join-Path $standaloneDir "server.js"
if (Test-Path $serverJsPath) {
    $originalContent = Get-Content -Raw -Path $serverJsPath
    
    $envLoaderCode = @'
// Custom Env Loader injected by build script
(function() {
  const fs = require('fs');
  const path = require('path');
  const envFiles = ['.env', '.env.local'];
  for (const file of envFiles) {
    const envPath = path.join(__dirname, file);
    if (fs.existsSync(envPath)) {
      console.log(`[Env Loader] Loading variables from ${file}`);
      try {
        const content = fs.readFileSync(envPath, 'utf8');
        const lines = content.split(/\r?\n/);
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith('#')) continue;
          const equalIndex = trimmed.indexOf('=');
          if (equalIndex === -1) continue;
          const key = trimmed.slice(0, equalIndex).trim();
          let val = trimmed.slice(equalIndex + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          val = val.replace(/\\n/g, '\n');
          process.env[key] = val;
        }
      } catch (err) {
        console.error(`[Env Loader] Error loading ${file}:`, err);
      }
    }
  }
})();

'@
    
    $newContent = $envLoaderCode + $originalContent
    Set-Content -Path $serverJsPath -Value $newContent -Encoding utf8
}

# 5. Create the zip
Write-Host "Zipping the bundle..."
if (Test-Path $zipFile) {
    Remove-Item $zipFile
}


# We want to zip the *contents* of the standalone folder using tar to avoid file lock issues
tar -a -c -f $zipFile -C $standaloneDir .

Write-Host "Bundle created successfully: $zipFile" -ForegroundColor Green
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload 'deploy_cpanel.zip' to your cPanel 'stage' folder."
Write-Host "2. Extract it there."
Write-Host "3. In 'Setup Node.js App', set Startup File to 'server.js'."
Write-Host "4. Start the app!"
