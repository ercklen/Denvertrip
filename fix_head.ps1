$files = @('index.html','contact.html','privacy.html','terms.html')

$cleanHead = @"
<!-- Google tag (gtag.js) - GA4 + Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-38XNTL49BZ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-38XNTL49BZ');
  gtag('config', 'AW-11549299572');
</script>
"@

foreach ($f in $files) {
    $path = "c:\Users\ER0CKL3EN\Documents\test\ismail\$f"
    
    # Read with UTF8 encoding
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

    # Insert tags immediately after <head>
    # In c8032d0, <head> is clean and has tracking.js before </head>.
    $content = $content -replace '(<head[^>]*>)', "`$1`r`n$cleanHead"

    # Write back with UTF8 BOM-less (or standard UTF8)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
    
    Write-Host "Updated: $f"
}
Write-Host "Done!"
