<?php

$mode = $_GET["mode"];



function modeRanking() {
    $xml = new SimpleXMLElement("<body></body>");
    foreach(glob("dogs/**/info.txt") as $info_file) {
        $name = file($info_file)[0];
        $rating = file($info_file)[1];
        $votes = file($info_file)[2];
        $dog = $xml->addChild('dog');
        $dog->addChild('name',$name);
        $dog->addChild('rating',$rating);
        $dog->addChild('votes',$votes);
    }
    return $xml->asXML();
}

modeRanking();

switch($mode) {
    case 'ranking':
        echo modeRanking();
        break;
    case 'rate':
        echo modeRate();
        break;
}

?>