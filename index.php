<?php
// get the school name 
$urlName =  !(substr($_SERVER['SCRIPT_NAME'], 0, 3) == '/p/') ? "boti" : explode('/', $_SERVER['SCRIPT_NAME'])[2];
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Ionic App</title>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    <base href="/p/<?= $urlName ?>/www/" />
    <meta name="api" content="/p/<?= $urlName ?>/www/" />

    <?php //echo  //Url::base(); 
    ?>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="http://fonts.cdnfonts.com/css/sofia-pro" rel="stylesheet" />
    <meta name="color-scheme" content="light dark" />
    <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />

    <link rel="icon" type="image/png" href="assets/icon/favicon.png" />

    <!-- add to homescreen for ios -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="styles.64d6582e5c8875100a82.css" />
</head>

<body>
    <app-root></app-root>
    <script src="runtime-es2015.f41cdbb0e931650a09b1.js" type="module"></script>
    <script src="runtime-es5.f41cdbb0e931650a09b1.js" nomodule defer></script>
    <script src="polyfills-es5.f40d7ab36532cbdfaefb.js" nomodule defer></script>
    <script src="polyfills-es2015.0f9c1dc0927f224e5df5.js" type="module"></script>
    <script src="main-es2015.249dfa39f4aea1587081.js" type="module"></script>
    <script src="main-es5.249dfa39f4aea1587081.js" nomodule defer></script>
</body>

</html>