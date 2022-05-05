
var buttonColours=["red","blue","green","yellow"];


var gamePattern=[];
var userClickedPattern=[];

var started=false;
var levels = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + levels);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);


  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    console.log("sucess");
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }


  }
  else{
    console.log("wrong");
    var fail=new Audio("sounds/wrong.mp3");
    fail.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");

    },200);
    startOver();
  }

}

function nextSequence(){

  userClickedPattern = [];
  levels++;
  $("#level-title").text("Level "+levels);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChoosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#"+randomChoosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);

}
function startOver(){
  levels=0;
  gamePattern=[];
  started=false;
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
