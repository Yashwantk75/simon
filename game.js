var gameSequence = [];
var pressedSequence = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
$(".button").hide();
document.addEventListener("keydown", function () {
  if (event.key === "a") {
    level++;
    $("h1").text("level " + level);
    $(".startbutton").hide();
    $("h2").hide();
    $(".button").show();
    setTimeout(drivenFunction(), 100);
  }
});
$(".startbutton").click(function () {
  level++;
  $("h1").text("level " + level);
  $(".startbutton").hide();
  $("h2").hide();
  $(".button").show();
  setTimeout(drivenFunction(), 100);
});

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  playsound(currentColor);
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 300);
}

//for computer pressing the button

function drivenFunction() {
  var randomNumber = Math.floor(Math.random() * 4);
  setTimeout(function () {
    animatePress(buttonColours[randomNumber]);
  }, 1000);
  gameSequence.push(buttonColours[randomNumber]);
  pressedSequence = [];
}

//for pressing button

$(".button").click(function (event) {
  // .click is event listener on button
  animatePress($(this).attr("id"));
  pressedSequence.push($(this).attr("id"));
  if (level === pressedSequence.length) {
    setTimeout(check(), 1000);
  }
});

async function check() {
  for (var i = 0; i < gameSequence.length; i++) {
    if (pressedSequence[i] !== gameSequence[i]) {
      var audio = new Audio("sounds/error.wav");
      await audio.play();
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
