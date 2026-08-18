$files = @('index.html','contact.html','privacy.html','terms.html')

$gtmHead = @"
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M9G2945W');</script>
  <!-- End Google Tag Manager -->
"@

$gtmBody = @"
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9G2945W"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
"@

foreach ($f in $files) {
    $path = "c:\Users\ER0CKL3EN\Documents\test\ismail\$f"
    
    # Read with explicit UTF8
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Remove old hardcoded gtag.js if exists
    $content = $content -replace '(?s)<!-- Google tag \(gtag\.js\) - GA4 \+ Google Ads -->.*?</script>', ''
    
    # Insert GTM in head right before </head>
    $content = $content -replace '(</head>)', "$gtmHead`r`n`$1"
    
    # Insert GTM in body right after <body>
    $content = $content -replace '(<body[^>]*>)', "`$1`r`n$gtmBody"
    
    # Write back explicitly with UTF8 (no BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
    
    Write-Host "Injected GTM into: $f"
}
