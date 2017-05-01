$(document).ready(function(){
    displayRankings();
});

function displayRankings() {
    $.ajax({
       url: 'dog-rating.php',
       type: 'GET',
       data: {
           mode: 'ranking'
       },
       success: function(stuff) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(stuff,"text/xml");
            var dogs = xmlDoc.getElementsByTagName("dog");
            for (var i = 0; i < dogs.length; i++) {
                var pic = document.createElement("img");
                pic.src = "dogs/"+dogs[i].firstChild.innerHTML+"/cover.jpg";
                pic.width = 100;
                pic.height = 100;
                var rating = dogs[i].childNodes[1].innerHTML;
                var votes = dogs[i].childNodes[2].innerHTML;
                $('#ranktable').append("<tr><th>",pic,"</th><th>"+rating+"</th><th>"+votes+"</th></tr>");
            }
       },
       error: function(e) {
           console.log(e.message);
       }
    });
}
       
       