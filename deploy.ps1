param (
  [string]$UserName,
  [switch]$SkipBuild
)

function Main() {
  Update-Version;

  if (-not $SkipBuild) {
    npm install
    npm run build
  }

  scp -o user=$UserName -r ./build/* cdroulers.com:/var/www/mindfulapp.ca
}

function Update-Version() {
  $a = Get-Content 'src/version.json' -raw | ConvertFrom-Json;
  write-output $a;
  $a.name = (Get-Date).ToString("yyyy-MM-dd");
  $a | ConvertTo-Json | set-content 'src/version.json';
}

Main;