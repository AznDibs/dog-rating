<?php

$dog = $_POST["dog"];
$rating = $_POST["rating"];

$info_file = "dogs/$dog/info.txt";
$name = file($info_file)[0];
$oldRating = file($info_file)[1];
$oldVotes = file($info_file)[2];

$newVotes = $oldVotes + 1;
$newRating = (($oldRating*$oldVotes)+$rating)/$newVotes;


$new_text = "$name$newRating\n$newVotes";
fwrite(fopen($info_file, "w"),$new_text);

echo $new_text;


?>