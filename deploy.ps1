param (
  [string]$UserName,
  [switch]$SkipBuild
)

if (-not $SkipBuild) {
  npm install
  npm run build
}

scp -o user=$UserName -r ./build/* cdroulers.com:/var/www/mindfulapp.ca