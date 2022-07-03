var gameSequence = [];
var pressedSequence = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
$(".button").hide();
document.addEventListener("keydown", function() {
  if (event.key === "a") {
    level++;
    $("h1").text("level " + level);
    $(".startbutton").hide();
    $("h2").hide();
    $(".button").show();
    drivenFunction();
}
})
$(".startbutton").click(function() {
  level++;
  $("h1").text("level " + level);
  $(".startbutton").hide();
  $("h2").hide();
  $(".button").show();
  drivenFunction();
})

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  playsound(currentColor);
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 250);

}


//for computer pressing the button

function drivenFunction() {
  var randomNumber = Math.floor((Math.random() * 4));
  setTimeout(function() {
    animatePress(buttonColours[randomNumber]);
  }, 600);
  gameSequence.push(buttonColours[randomNumber]);
  pressedSequence = [];

}


//for pressing button


$(".button").click(function(event) {
  animatePress($(this).attr("id"));
  pressedSequence.push($(this).attr("id"));
  if (level === pressedSequence.length) {
    setTimeout(check(), 500);
  }
})

function check() {
  for (var i = 0; i < gameSequence.length; i++) {

    if (pressedSequence[i] !== gameSequence[i]) {
      var audio = new Audio("sounds/error.wav");
      audio.play();
      gameSequence = [];
      level = 1;
      $("h1").text("level " + level);
      alert("gameover");

      drivenFunction();


    }
  }
  if (pressedSequence.length === gameSequence.length) {
    level++;
    $("h1").text("level " + level);
    drivenFunction();

  }
}
