let currentQuestions = [];
let currentIndex = 0;
let answers = {};
let marked = [];
let timeLeft = 1 * 60;
let timerInterval;

function startApp() {

  const logged = localStorage.getItem("isLoggedIn");

  if (logged !== "true") {
    window.location.href = "../auth/auth.html";
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  document.querySelector(".nameuser").innerText = "Hello " + user.firstName;

  let baseQuestions = QUESTIONS;

  let shuffled = shuffle(baseQuestions.slice());

  for (let i = 0; i < shuffled.length; i++) {

    let q = shuffled[i];

    let newQ = {
      id: q.id,
      question: q.question,
      correctAnswer: q.correctAnswer,
      options: shuffle(q.options.slice())
    };

    currentQuestions.push(newQ);
  }

  showQuestion();
  drawNumbers();
  runTimer();
  Theme();
}

function Theme() {

  const btn = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");

  let saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.documentElement.classList.add("dark");
    icon.innerText = "light_mode";
  }

  btn.onclick = function () {

    const dark = document.documentElement.classList.toggle("dark");

    if (dark) {
      localStorage.setItem("theme", "dark");
      icon.innerText = "light_mode";
    } else {
      localStorage.setItem("theme", "light");
      icon.innerText = "dark_mode";
    }
  };
}

function runTimer() {

  const timer = document.getElementById("timer");

  timerInterval = setInterval(function () {

    timeLeft--;

    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    timer.innerText =
      mins.toString().padStart(2, "0") +
      ":" +
      secs.toString().padStart(2, "0");

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishExam(false);
    }

  }, 1000);
}

function showQuestion() {

  const q = currentQuestions[currentIndex];

  document.getElementById("currentNum").innerText = currentIndex + 1;
  document.getElementById("qText").innerText = q.question;

  const list = document.getElementById("optionsList");
  list.innerHTML = "";

  for (let i = 0; i < q.options.length; i++) {

    const opt = q.options[i];

    const btn = document.createElement("button");

    let selected = "";
    if (answers[q.id] === opt) {
      selected = "selected";
    }

    btn.className = "option-item " + selected;

    let letter = String.fromCharCode(65 + i);

    btn.innerHTML =
      "<span class='option-prefix'>" + letter + ".</span>" +
      "<span>" + opt + "</span>";

    btn.onclick = function () {

      answers[q.id] = opt;

      showQuestion();
      drawNumbers();
    };

    list.appendChild(btn);
  }

  let markIcon = document.getElementById("markIcon");

  if (marked.includes(q.id)) {
    markIcon.style.color = "#eab308";
    markIcon.innerText = "flag";
  } else {
    markIcon.style.color = "#64748b";
    markIcon.innerText = "outlined_flag";
  }

  document.getElementById("prevBtn").style.visibility =
    currentIndex === 0 ? "hidden" : "visible";

  const isLast = currentIndex === currentQuestions.length - 1;

  document.getElementById("nextBtn").innerText = isLast
    ? "Finish Exam"
    : "Next Question";
}

function drawNumbers() {

  const grid = document.getElementById("navGrid");
  grid.innerHTML = "";

  currentQuestions.forEach((q, idx) => {

    const dot = document.createElement("div");

    let className = "nav-dot";

    if (currentIndex === idx) className += " active";
    else if (answers[q.id]) className += " done";

    if (marked.includes(q.id)) className += " marked";

    dot.className = className;

    dot.innerText = idx + 1;

    dot.onclick = function () {
      currentIndex = idx;
      showQuestion();
      drawNumbers();
    };

    grid.appendChild(dot);
  });
}

document.getElementById("prevBtn").onclick = function () {

  if (currentIndex > 0) {

    currentIndex--;

    showQuestion();
    drawNumbers();
  }
};

document.getElementById("nextBtn").onclick = function () {

  if (currentIndex < currentQuestions.length - 1) {

    currentIndex++;

    showQuestion();
    drawNumbers();

  } else {

    finishExam(true);
  }
};

document.getElementById("markBtn").onclick = function () {

  const id = currentQuestions[currentIndex].id;

  if (marked.includes(id)) {

    marked = marked.filter(function (x) {
      return x !== id;
    });

  } else {

    marked.push(id);
  }

  showQuestion();
  drawNumbers();
};


function confirmPopup(message){

  return new Promise(resolve=>{

    const overlay = document.getElementById("popupOverlay");

    document.getElementById("popupMessage").innerText = message;

    overlay.style.display="flex";

    document.getElementById("popupYes").onclick=()=>{
      overlay.style.display="none";
      resolve(true);
    };

    document.getElementById("popupNo").onclick=()=>{
      overlay.style.display="none";
      resolve(false);
    };

  });

}

async function finishExam(manual){

  if(manual){

    const ok = await confirmPopup(
      "Are you sure you want to finish the exam?"
    );

    if(!ok) return;

  }

  clearInterval(timerInterval);

  let score = 0;

  currentQuestions.forEach(q=>{
    if (answers[q.id] === q.correctAnswer) score++;
  });

  const result = {
    score,
    total: currentQuestions.length,
    answers,
    questions: currentQuestions
  };

  localStorage.setItem("lastResult",JSON.stringify(result));

  window.location.href="result.html";

}

startApp();