<?php
$file = 'logger.txt';
$current = file_get_contents($file);
$current .= $_REQUEST['subscription_obj']."\n";
// Write the contents back to the file
file_put_contents($file, $current);

?>