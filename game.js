var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];
var randomNumber;
var randomChosenColor;
var level = 0;

function nextSequence(){
  randomNumber= Math.floor(Math.random()*4);
  console.log(randomNumber);
  randomChosenColor=buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level=level+1;
  $("#level-title").text("Level "+level);
  userClickedPattern=[];
}

  $(document).keydown(keypressed);
function keypressed(){
  if (level<1){
    nextSequence();
  }
}

function playSound(name){
  var sound= new Audio("sounds/"+name+".mp3");
  sound.play();
}

$(".btn").on("click", function(){
  if (level>0){
  var userChosenColor=event.target.id;
  $("."+userChosenColor).addClass("pressed");
  setTimeout(function(){$("."+userChosenColor).removeClass("pressed")},100);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkSolution(level);}
  else{
    nextSequence();
  }
});

function checkSolution(currenLevel){
    var i=0;
    var items=userClickedPattern.length;
    while (i<items){
      var userColors=userClickedPattern[i];
      var gameColors= gamePattern[i];
      if (userColors===gameColors){
        console.log("userColors is "+ userColors+" and gameColors is "+gameColors);
        i++;
      }
      if(userColors!=gameColors) {
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        gamePattern=[];
        level=0;
        break;
      }
      if (i===level){
        setTimeout(nextSequence,1000);
      }
    }
  }
