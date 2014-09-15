<?php
$con = mysql_connect('localhost', 'root', '');
if (!$con) { die('Could not connect: ' . mysql_error()); }

$db = mysql_select_db("roompicker", $con);

$query = sprintf("SELECT * FROM users");
$result = mysql_query($query);

if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

// $couples = array();
while(($couples[] = mysql_fetch_assoc($result)) || array_pop($couples)); 

mysql_close($con);
?>
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="assets/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
<meta charset="utf-8">
<title>Palm Springs Room Picker</title>

<script type="text/javascript" src="http://use.typekit.com/epb6bpj.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript">
  var pickedColors = [
    <?php
      foreach($couples as $couple){
        if($couple['room'] != null){
          echo '"' . $couple['room'] .'",';
        }
      }
    ?>
  ]
</script>
<script src="assets/main.js" type="text/javascript"></script>

</head>
<body>
  <div class="pageHeader">
    <h1 class="l-wrap">Palm Springs Room Picker</h1>
  </div>
  <div class="main">
    <div class="l-wrap">
      <div class="pageIntro">
        <h2>What is this?</h2>
        <p>Palm Springs Fourth of July, 2012 Extravaganza Fest is nearly upon us! Three couples enter! Three couples leave (probably!)! But we gotta pick rooms! The most fair way to do this is, of course <strong>randomly!</strong></p>
      </div>
    </div>
    
    <div class="pickerBox">
      <div class="l-wrap">

        <div class="intro">
          <h2>Instructions:</h2>
          <p>There are three rooms: <span class="red">Red</span>, <span class="blue">Blue</span>, <span class="teal">Teal</span>.<br/> Click on the big button below your couple name to see which one you get!</p>
          </div>
          <ul class="pickerBox-list">
            <?php 
              $i = 0;
              foreach($couples as $couple){
                $picked = $couple['room'] == null ? '' : 's-picked';
                $text = $couple['room'] == null ? 'Pick Room!' : $couple['room'] .'!';
                
                echo '<li>';
                echo '<h3>' . $couple['name'] . '</h3>';
                echo '<a href="#picker" class="button '. $couple['room'] .' '. $picked .' " data-index="' . $i . '">' . $text . '</a>';
                echo '</li>';
                
                $i++;
              }
            ?>

          </ul>
          <p class="disclaimer">You can view pictures of the house (and Vicki's Beach) <a href="http://www.airbnb.com/rooms/58332" target="_blank">here</a> to refresh your memory.</p>
          
      </div>
    </div>
  </div>
</body>
</html>
