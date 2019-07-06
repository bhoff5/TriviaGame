var options = [{
        question: "What is the smallest planet in the solar system?",
        choice: ["Earth", "Venus", "Mercury", "Neptune"],
        answer: 2,
        photo: "assets/images/mercury.jpg"
    },
    {
        question: "What is the largest planet in the Solar System?",
        choice: ["Jupiter", "Saturn", "Mars", "Neptune"],
        answer: 0,
        photo: "assets/images/jupiter.jpg"
    },
    {
        question: "What is the hottest planet in the Solar System?",
        choice: ["Saturn", "Venus", "Mars", "Mercury"],
        answer: 1,
        photo: "assets/images/venus.jpg"
    },
    {
        question: "What is the brightest planet in the night sky?",
        choice: ["Saturn", "Venus", "Mars", "Mercury"],
        answer: 1,
        photo: "assets/images/venus.jpg"
    },
    {
        question: "What is the third planet from the Sun?",
        choice: ["Venus", "Mercury", "Earth", "Mars"],
        answer: 2,
        photo: "assets/images/earth.jpg"
    },
    {
        question: "Which planet is not a gas giant?",
        choice: ["Mercury", "Saturn", "Jupiter", "Neptune"],
        answer: 0,
        photo: "assets/images/mercury.jpg"
    },
    {
        question: "Phobos and Deimos are moons of which planet?",
        choice: ["Mercury", "Uranus", "Jupiter", "Mars"],
        answer: 3,
        photo: "assets/images/mars.jpg"
    },
    {
        question: "Which planet in the solar system is furthest from the sun?",
        choice: ["Mercury", "Saturn", "Jupiter", "Neptune"],
        answer: 3,
        photo: "assets/images/neptune.jpg"
    },
    {
        question: "Which is the coldest planet?",
        choice: ["Uranus", "Venus", "Jupiter", "Neptune"],
        answer: 0,
        photo: "assets/images/uranus.jpg"
    },
    {
        question: "Triton is the largest moon of what planet??",
        choice: ["Uranus", "Neptune", "Jupiter", "Saturn"],
        answer: 1,
        photo: "assets/images/neptune.jpg"
    },
];

var correctCount = 0;
var wrongCount = 0;
var timer = 20;
var intervalId;
var userGuess = "";
var running = false;
var totalQuestions = options.length;
var choice;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
$("#start").on("click", function () {
    $("#start").hide();
    displayQuestion();
    runTimer();
    for (var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
})

function runTimer() {

    if (!running) {
        intervalId = setInterval(decrement, 1000);
        running = true;
    }
}

function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

    if (timer === 0) {
        wrongCount++;
        stop();
        $("#answerArea").html("<p>Time is up! The correct answer is: " + choice.choice[choice.answer] + "</p>");
        hidepicture();
    }
}

function stop() {
    running = false;
    clearInterval(intervalId);

}

function displayQuestion() {
    index = Math.floor(Math.random() * options.length);
    choice = options[index];

    $("#pictureArea").append("<img src=\"assets/images/mysteryplanet.png\">");

    $("#questionArea").html("<h2>" + choice.question + "</h2>");
    for (var i = 0; i < choice.choice.length; i++) {
        var userChoice = $("<div>");
        userChoice.addClass("answerButton");
        userChoice.html(choice.choice[i]);
        userChoice.attr("data-guessvalue", i);
        $("#answerArea").append(userChoice);

    }
    var audio = new Audio("assets/sounds/click1.wav");
    $(".answerButton").mouseenter(function () {
        audio.play();
    });


    $(".answerButton").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));

        if (userGuess === choice.answer) {
            var winsound = new Audio("assets/sounds/winsound.wav");
            winsound.play();
            stop();
            correctCount++;
            userGuess = "";
            $("#answerArea").html("<p>Correct!</p>");

            hidepicture();

        } else {
            var losesound = new Audio("assets/sounds/losesound1.wav");
            losesound.play();
            stop();
            wrongCount++;
            userGuess = "";
            $("#answerArea").html("<p>Wrong! The correct answer is: <br><br><br>" + choice.choice[choice.answer] + "</p>");

            hidepicture();
        }
    })
}


function hidepicture() {
    $("#pictureArea").empty();
    $("#pictureArea").append("<img src=" + choice.photo + ">");
    newArray.push(choice);
    options.splice(index, 1);

    var hidpic = setTimeout(function () {
        $("#answerArea").empty();
        $("#pictureArea").empty();
        timer = 20;



        if ((wrongCount + correctCount) === totalQuestions) {
            $("#questionArea").empty();
            $("#questionArea").html("<h2>Game Over!  Your Final Results: </h2>");
            $("#answerArea").append("<h3> Correct: " + correctCount + "</h3>");
            $("#answerArea").append("<h3> Incorrect: " + wrongCount + "</h3>");
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;

        } else {
            runTimer();
            displayQuestion();

        }
    }, 3000);


}

$("#reset").on("click", function () {
    $("#reset").hide();
    $("#answerArea").empty();
    $("#pictureArea").empty();
    $("#questionArea").empty();
    for (var i = 0; i < holder.length; i++) {
        options.push(holder[i]);
    }
    runTimer();
    displayQuestion();

})