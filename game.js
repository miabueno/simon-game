
buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];

var level = 0;
var started = false;

// respond to user key press
$(document).on("keydown", function(){
    if (!started){
        setTimeout(function(){
            nextSequence()
        }, 500);
        started = true;
    }
});

// respond to users clicks
$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

    userClickedPattern = [];

    level += 1;
    $("h1").text("Level " + level);

    // generate random number between 0 - 4
    var randomNumber = Math.floor(Math.random() * 4);

    // random colour becomes array position of random number
    var randomChosenColour = buttonColours[randomNumber];

    // append colour to game pattern array
    gamePattern.push(randomChosenColour);

    // flash the element with the ID of respective random colour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // play audio of respective colour
    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

function checkAnswer(i) {
    if (userClickedPattern[i] === gamePattern[i]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    }
    else {
        console.log("fail");
        playSound("wrong");

        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");

        setTimeout(function(){ $("body").removeClass("game-over"); }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
