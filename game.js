
buttonColours = ["red", "blue", "green", "yellow"];

// computer generated pattern
gamePattern = [];

// the pattern a user clicks
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

// runs to add a colour to the computer generated sequence
function nextSequence() {

    // reset user clicked pattern every level
    userClickedPattern = [];

    // increase level
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

// plays sound specified by name
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// updates class type to button for animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){ $("#" + currentColour).removeClass("pressed"); }, 100);
}

// checks user's button choice
// param: index of array of last button selection
function checkAnswer(i) {
    // if the specified index is equal to the expected --> success
    if (userClickedPattern[i] === gamePattern[i]) {
        // given success --> once the user clicks number of buttons needed
        // add nextSequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    }
    else {

        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");

        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over"); }, 200);

        // reset game
        startOver();
    }
}

// reset global variables to reset game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
