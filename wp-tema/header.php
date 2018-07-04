<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title><?php bloginfo(); ?></title>
  <meta name="description" content="Završni rad">
  <meta name="author" content="Leon Redžić">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700" rel="stylesheet"> 
  <script>
  window.server_url = '<?= $_SERVER["SERVER_ADDR"]; ?>';
  </script>
<?php wp_head(); ?>

  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
</head>

<body id="body">
