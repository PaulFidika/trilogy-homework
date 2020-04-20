
// Display the welcome page
function initializeQuiz() {
    $("#title").html("Hey there all you cool cats and kittens! Are you ready for a coding challenge? Of course you are! Press start, if you dare.")
        .show();
    $("#leaderboard").empty().
        hide();
    $("#fname").hide();
    $("#timer").hide();
    $("#button-0").html("Start Quiz")
        .click(function () {
            $("#title").hide();
            $("#timer").show();
            window.timer = setInterval(incrementTimer, 1000);
            $("#button-0").off("click");
            startQuiz();
        });

    for (i = 0; i < 4; i++) {
        $("#answer-" + i).hide();
    }

    q = 0;
    correct = 0;
    timeRemaining = 45;
};

// load the current question onto the page
function startQuiz() {
    $("#button-0").hide();
    $("#result").hide();

    $("#question").html(quizQuestions[q].question)
        .show();

    for (i = 0; i < 4; i++) {
        $("#answer-" + i).html(quizQuestions[q].answers[i])
            .off("click")
            .click(evaluate)
            .removeClass("wrong")
            .show();
    }
}

// this event-handler figures out if you answered correctly or incorrectly
function evaluate() {
    if (this.value == quizQuestions[q].correctAnswer) {
        $("#result").html("Correct! Yes, nice work!");
        correct++;
    } else {
        $("#result").html("Nope, incorrect");
        timeRemaining -= 5;
    }

    for (i = 0; i < 4; i++) {
        $("#answer-" + i).off("click"); // remove the event-handler that allows them to be clicked
        if (i != quizQuestions[q].correctAnswer) {
            $("#answer-" + i).addClass("wrong"); // add a strike-through for the wrong options
        }
    }

    $("#result").show();
    nextQuestion();
}

// this primes the page for the next question
function nextQuestion() {
    $("#button-0").show();
    q++;

    if (q < quizQuestions.length) {
        $("#button-0").html("Next Question")
            .click(startQuiz);
    }
    else {
        $("#button-0").html("End Quiz")
            .off("click")
            .click(endQuiz);
    }
}

function endQuiz() {
    $("#question").hide();
    $("#result").hide();
    $("#timer").hide();
    clearInterval(window.timer);
    console.log(window.timer);

    for (i = 0; i < 4; i++) {
        $("#answer-" + i).off("click")
            .removeClass("wrong")
            .hide();
    }

    $("#title").html("Nice work. You got " + correct + " out of " + quizQuestions.length + " questions right, and you had " + timeRemaining + " seconds left. Type your name below to transcribe your name upon the annals of history.")
        .show();

    $("#fname").show();
    $("#button-0").html("Add to leaderboard")
        .off("click")
        .click(leaderBoard);

};

function leaderBoard() {
    if (!localStorage.leaderboard) {
        localStorage.setItem("leaderboard", "[]");
    }

    let lb = JSON.parse(localStorage.getItem("leaderboard")); // pull leaderboard from memory

    // add a new name to the leaderboard
    lb.push({
        name: $("#fname").val(),
        score: correct,
        timer: timer
    });

    localStorage.setItem("leaderboard", JSON.stringify(lb)); // save new leaderboard to memory

    for (i = 0; i < lb.length; i++) {
        let entry = document.createElement("li");
        entry.innerHTML = lb[i].name + " " + "Score: " + lb[i].score + " Seconds Remaining: " + lb[i].timer;
        $("#leaderboard").prepend(entry);
    }

    entry = document.createElement("div");
    entry.innerHTML = "<h3>Leaderboard:</h3>";
    $("#leaderboard").prepend(entry);

    $("#leaderboard").show();
    $("#fname").hide();
    $("#title").hide();
    $("#button-0").html("Take the quiz again")
        .off("click")
        .click(initializeQuiz);
}

// Timer function code
function incrementTimer() {
    timeRemaining--;
    $("#timer").html("Time Remaining: " + timeRemaining + " seconds");
    if (timeRemaining <= 0) {
        endQuiz();
    }
}

let q = 0; // this variable is the current question number we are on
let timeRemaining = 0;
let correct = 0; // number of questions answered correctly

// this array lists all of the quiz content
const quizQuestions = [
    {
        question: "What does JSON stand for?",
        answers: ["Junky Stuff On Networks", "JavaScript Online Notes", "Just Stop Obeying Nigeria", "JavaScript Object Notation"],
        correctAnswer: 3
    },
    {
        question: "Can you name variables with a hyphen in JavaScript?",
        answers: ["Yes of course", "Nope", "I have no clue", "I give up"],
        correctAnswer: 1
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["j", "js", "script", "compile"],
        correctAnswer: 2
    },
    {
        question: "How do you write 'Hello World' in an Alert Box?",
        answers: ["msgBox(Hello World)", "alert('Hello World')", "Just Ask Google", "popUp('Hello World')"],
        correctAnswer: 1
    },
    {
        question: "How do you call a function named myFunction?",
        answers: ["myFunction()", "call myFunction", "execute myFunction", "$(myFunction)"],
        correctAnswer: 0
    }
];

$(document).ready(function () {
    initializeQuiz();
});
