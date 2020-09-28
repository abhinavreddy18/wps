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
let questionswps = [

];

let questionsdbms = [

];

let questionscn = [

];

let questions = [

];



// create some variables

let lastQuestion = questions.length - 1;
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
    console.log(questions);
    let correct_co = 0;
    let ques_no = questions.length;
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
        questions[ques_no].correct = "A";
    if (document.getElementById("option2").checked == true)
        questions[ques_no].correct = "B";
    if (document.getElementById("option3").checked == true)
        questions[ques_no].correct = "C";

    document.getElementById("ques").value = '';
    document.getElementById("ans1").value = '';
    document.getElementById("ans2").value = '';
    document.getElementById("ans3").value = '';
    document.getElementById("option1").checked = false;
    document.getElementById("option2").checked = false;
    document.getElementById("option3").checked = false;

}

//add paper
function addPaper() {
    console.log(questions);
    var course = document.getElementById("course").value;
    console.log(course);

    window.localStorage.setItem(course, JSON.stringify(questions));
    document.getElementById("course").value = "";

}

//students add
function addStudent() {
    let co = students.length;
    students[co] = {};
    students[co].name = "";
    students[co].roll = "";
    students[co].email = "";
    students[co].phone = 0;
    students[co].password = "";
    students[co].name = document.getElementById("name").value;
    students[co].roll = document.getElementById("roll").value;
    students[co].email = document.getElementById("email").value;
    students[co].phone = document.getElementById("phno").value;
    students[co].password = document.getElementById("password").value;
    students[co].dbms = 0;
    students[co].cn = 0;
    students[co].wps = 0;
    console.log("in");
    let roll = students[co].roll;
    let password = students[co].password;
    console.log(roll);
    console.log(password)
    window.localStorage.setItem(roll, password);
    window.localStorage.setItem("stu", JSON.stringify(students));
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phno").value = "";
    document.getElementById("password").value = "";


}

//student checking
function studentCheck() {
    let check = window.localStorage.getItem("1");
    console.log(check);
    if (check == document.getElementById("passkey").value)
        window.location.href = "quiz.html";
}

function lecturerCheck() {
    console.log("in");
    window.localStorage.setItem('1602102', 'vasavi');
    console.log("in");
    let id = document.getElementById("emp").value;
    console.log(id);
    let check = window.localStorage.getItem(id);
    console.log(check);
    let password = document.getElementById("passkey").value;
    console.log(password);
    if (check == password) {
        console.log("in");
        location.href = "lecturerhome.html";
    }
}




// render a question
function renderQuestion() {

    quesarr = window.localStorage.getItem("wps");

    questions = JSON.parse(quesarr);

    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}


start.addEventListener("click", startQuiz);
// start quiz
function startQuiz() {
    quesarr = window.localStorage.getItem("wps");

    questions = JSON.parse(quesarr);
    lastQuestion = questions.length - 1;
    console.log(lastQuestion);
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
    quesarr = window.localStorage.getItem("wps");

    questions = JSON.parse(quesarr);
    let correct_co = questions[runningQuestion].correct;
    console.log(correct_co);
    console.log(answer);

    let scor_q = 0;

    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;
    }

    console.log(score);
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


//table for students
function detailsDisplay() {
    let dis = "";
    dis += "<table>";
    dis += "<tr>";
    dis += "<th>" + "Student name" + "</th>";
    dis += "<th>" + "Roll number" + "</th>";
    dis += "<th>" + "dbms" + "</th>";
    dis += "<th>" + "cn" + "</th>";
    dis += "<th>" + "wps" + "</th>";
    dis += "</tr>";

    let i = 0;
    let stud_arr = JSON.parse(window.localStorage.getItem("stu"));
    console.log(stud_arr);
    students = stud_arr;
    let count = students.length;
    console.log(count);
    for (i = 0; i < count; i++) {

        dis += "<tr>";
        dis += "<td>" + students[i].name + "</td>";
        dis += "<td>" + students[i].roll + "</td>";
        dis += "<td>" + students[i].dbms + "</td>";
        dis += "<td>" + students[i].cn + "</td>";
        dis += "<td>" + students[i].wps + "</td>";
        dis += "</tr>";

    }
    dis += "</table>";
    document.getElementById("table").innerHTML = dis;
}