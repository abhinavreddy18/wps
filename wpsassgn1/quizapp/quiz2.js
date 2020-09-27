// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let students = [];

// create our questions
let questions = [

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let ques_no = 0;

//add a ques
function addQues() {

    let correct_co = 0;
    questions[ques_no] = {};
    questions[ques_no].question = "";
    questions[ques_no].choiceA = "";
    questions[ques_no].choiceB = "";
    questions[ques_no].choiceC = "";
    questions[ques_no].correct = [];

    questions[ques_no].question = document.getElementById("ques").value;
    questions[ques_no].choiceA = document.getElementById("ans1").value;
    questions[ques_no].choiceB = document.getElementById("ans2").value;
    questions[ques_no].choiceC = document.getElementById("ans3").value;

    if (document.getElementById("option1").checked == true)
        questions[ques_no].correct[correct_co++] = "1";
    if (document.getElementById("option2").checked == true)
        questions[ques_no].correct[correct_co++] = "2";
    if (document.getElementById("option3").checked == true)
        questions[ques_no].correct[correct_co++] = "3";

    document.getElementById("ques").value = '';
    document.getElementById("ans1").value = '';
    document.getElementById("ans2").value = '';
    document.getElementById("ans3").value = '';
    document.getElementById("option1").checked = false;
    document.getElementById("option2").checked = false;
    document.getElementById("option3").checked = false;

    console.log(questions[ques_no]);
    ques_no++;
}

//store ques
function addPaper() {
    window.setItem(document.getElementById("course"), JSON.stringify(questions));
}

//students add
function addStudent() {
    let co = students.length;
    students.name = "";
    students.roll = "";
    students.email = "";
    students.phone = 0;
    students.password = "";
    students[co].name = document.getElementById("name").value;
    students[co].roll = document.getElementById("roll").value;
    students[co].email = document.getElementById("email").value;
    students[co].phone = document.getElementById("phno").value;
    students[co].password = document.getElementById("password").value;
    window.localStorage.setItem(roll, password);
}

//student checking
function studentcheck() {
    let check = window.getItem(document.getElementById("roll"));
    if (check == document.getElementById("passkey"))
        window.location.href = "quiz.html";
}

function lecturerCheck() {
    console.log("in");
    window.setItem("1602102", "vasavi");
    console.log("in");
    let check = window.getItem(document.getElementById("emp"));
    if (check == document.getElementById("passkey")) {
        console.log("in");
        window.location.href = "./lecturerhome.html";
    }
}


// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc + ">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer) {
    let i = 0;
    let correct_co = questions[runningQuestion].correct.length;
    let scor_q = 0;
    for (i = 0; i < correct_co; i++) {
        if (answer == questions[runningQuestion].correct[i]) {
            // answer is correct
            scor_q++;
        }
    }
    score += scor_q / correct_co;
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
        (scorePerCent >= 60) ? "img/4.png" :
        (scorePerCent >= 40) ? "img/3.png" :
        (scorePerCent >= 20) ? "img/2.png" :
        "img/1.png";

    scoreDiv.innerHTML = "<img src=" + img + ">";
    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}