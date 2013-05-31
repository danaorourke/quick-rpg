<!doctype html>
<html>
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="HandheldFriendly" content="true">
    <title>Because Garden</title>
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" ></script>
    <link rel="stylesheet" media="all" href="css/style.css">
</head>
	
<body lang="en">
	<header id="header"><h1>Because Garden</h1></header>
	<section id="test"></section>
	<section id="gamespace"></section>
	<section id="test"></section>
	<footer id="footer">Cup of Tea Creations &copy;2013</footer>
	<script type="text/javascript" src="js/game.js"></script>
	<script type="text/javascript" src="js/character.js"></script>
	<script type="text/javascript" src="js/area.js"></script>
	<script type="text/javascript" src="js/plant.js"></script>
	<script type="text/javascript">
	/*	var rose = new glob('Rose');
		var jack = new glob('Jack');
		var micky = new glob('Micky');
		var ricky = new glob('Ricky');
		var amy = new glob('Amy');
		var rory = new glob('Rory');
		var objects = new Array(rose,jack,micky,ricky,amy,rory);
		game.init('gamespace',objects);*/
		
		var o = new Array(character,area);
		game.init('gamespace',o);
	</script>
</body>
</html>