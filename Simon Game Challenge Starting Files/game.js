 var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(){

    if(!started){

        started = true;
        $("#level-title").text("Level " + level);
        nextSequence();

    }

});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});


function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

  playSound(randomChosenColour);

}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    animatePress(name);

}

function animatePress(currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed")
    }, 100);

}

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    }

    else{

        $("body").addClass("game-over");
        $("h1").text("Game over, Press Any Key to Restart");
        setTimeout(function(){

            $("body").removeClass("game-over");

        }, 200);

        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        startOver();

    }

    
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;

}



