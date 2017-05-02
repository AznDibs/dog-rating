var currentDog = "dog0";

$(document).ready(function(){
    displayRankings();
    for (var i = 0; i < 10; i++) {
        var val = i+1;
        //$('#radio-buttons').append("<label class='radio-inline'><button type='radio' name='optradio' value="+val+">"+val+"</label>");
        $('#rating-buttons').append("<a href='#' class='btn btn-primary'>"+val+"</a>");
    }
    var buttons = document.getElementById("rating-buttons").childNodes;
    for (var i = 0; i < buttons.length; i++) {
        $(buttons[i]).on("click",onClick);
    }
    displayDog();
});

function displayDog() {
    $.ajax({
        url: 'dog-rating.php',
        type: 'GET',
        data: {
            mode: 'pic'
        },
        success: function(stuff) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(stuff,"text/xml");
            var dogs = xmlDoc.getElementsByTagName("dog");
            var random = Math.floor(Math.random()*dogs.length);
            var pic = document.createElement("img");
            pic.className = "img-responsive";
            pic.src = "dogs/"+dogs[random].firstChild.innerHTML+"/cover.jpg";
            currentDog = dogs[random].firstChild.innerHTML;
            pic.width = 500;
            pic.height = 500; 
            $("#current-dog").append(pic);
        },
        error: function(e) {
            console.log(e.message);
        }       
    });
}

function onClick(me) {
    var name = currentDog.split("\n")[0];
    console.log(name);
    rateDog(name,me.target.innerHTML);
}

function rateDog(x, y) {
    $.ajax({
        url: 'add-rating.php',
        type: 'POST',
        data: {
            dog: x,
            rating: y
        },
        success: function(stuff) {
            console.log(stuff);
            location.reload();
        },
        error: function(e) {
            console.log(e.message);
        }
    });    
}

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
                pic.className = "img-responsive";
                pic.src = "dogs/"+dogs[i].firstChild.innerHTML+"/cover.jpg";
                pic.width = 100;
                pic.height = 100;
                var rating = dogs[i].childNodes[1].innerHTML;
                rating = Math.floor(rating*10)/10;
                var votes = dogs[i].childNodes[2].innerHTML;
                $('#ranktable').append("<tr><th>",pic,"</th><th>"+rating+"</th><th>"+votes+"</th></tr>");
            }
       },
       error: function(e) {
           console.log(e.message);
       }
    });
}
       
       