$files = @('index.html','contact.html','privacy.html','terms.html')

$consentMode = @"
  <!-- Google Consent Mode v2 Default -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    var stored = localStorage.getItem('cookie_consent');
    var analytics = 'denied', ads = 'denied';
    if (stored) {
      try {
        var p = JSON.parse(stored);
        if (p.analytics) analytics = 'granted';
        if (p.advertising) ads = 'granted';
      } catch(e){}
    }
    gtag('consent', 'default', {
      'analytics_storage': analytics,
      'ad_storage': ads,
      'ad_user_data': ads,
      'ad_personalization': ads
    });
  </script>

"@

foreach ($f in $files) {
    $path = "c:\Users\ER0CKL3EN\Documents\test\ismail\$f"
    
    # Read with explicit UTF8
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    # Look for the exact GA4 script tag and inject the consent mode just before it
    $content = $content -replace '(\s*<!-- Google tag \(gtag\.js\) - GA4 \+ Google Ads -->)', "$consentMode`$1"
    
    # Write back explicitly with UTF8 (no BOM)
    $utf8NoBom = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
    
    Write-Host "Fixed: $f"
}
