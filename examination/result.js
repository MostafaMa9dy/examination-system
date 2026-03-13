function init() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.href = "../auth/auth.html";
    return;
}

  const resultData = localStorage.getItem("lastResult");
  if (!resultData) {
    if (isLoggedIn !== "true") {
      window.location.href = "../auth/auth.html";
      return;
    }
  }

document.getElementById("logout").addEventListener("click", function () {

    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "../auth/auth.html";

});

  const result = JSON.parse(resultData);
  const percentage = (result.score / result.total) * 100;

  document.getElementById("scoreCorrect").innerText = result.score;
  document.getElementById("scoreIncorrect").innerText =
    result.total - result.score;
  document.getElementById("scorePercent").innerText =
    `${Math.round(percentage)}%`;

  if (percentage < 50) {
    document.getElementById("resultTitle").innerText = "Keep Practicing!";
    document.getElementById("resultMsg").innerText =
      "You didn't pass this time, but you can try again.";
  }

  renderReview(result);

 
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };

  
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
}

function renderReview(result) {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

 for (let i = 0; i < result.questions.length; i++) {

    const q = result.questions[i];

    const userAnswer = result.answers[q.id];

    let isCorrect = false;

    if (userAnswer === q.correctAnswer) {
      isCorrect = true;
    }


    const item = document.createElement("div");
    item.className = "quiz-card";
    item.style.marginBottom = "1rem";
    item.style.padding = "1.5rem";
    item.style.textAlign = "left";

    let optionsHtml = "";
       for (let j = 0; j < q.options.length; j++) {

      const opt = q.options[j];

      let style =
        "padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--border-color); margin-bottom: 0.5rem; font-size: 0.9rem;";

      let label = "";

      if (opt === q.correctAnswer) {

        style +=
          "background: rgba(34, 197, 94, 0.1); border-color: #22c55e; color: #166534;";

        label =
          '<span style="float: right; font-size: 0.7rem; font-weight: 700;">CORRECT</span>';

      } else if (opt === userAnswer) {

        style +=
          "background: rgba(239, 68, 68, 0.1); border-color: #ef4444; color: #991b1b;";

        label =
          '<span style="float: right; font-size: 0.7rem; font-weight: 700;">YOUR ANSWER</span>';
      }

      optionsHtml += "<div style='" + style + "'>" + opt + label + "</div>";
    }

    let icon = "cancel";
    let color = "#ef4444";

    if (isCorrect) {
      icon = "check_circle";
      color = "#22c55e";
    }

    item.innerHTML =
      '<div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">' +
      '<span class="material-icons" style="color:' + color + '">' + icon + "</span>" +
      '<span style="font-weight:700; font-size:0.8rem; color: var(--text-muted); text-transform: uppercase;">Question ' +
      (i + 1) +
      "</span>" +
      "</div>" +
      '<p style="font-weight:600; margin-bottom:1.5rem; color: var(--text-dark);">' +
      q.question +
      "</p>" +
      "<div>" +
      optionsHtml +
      "</div>";

    reviewList.appendChild(item);
  };
}

init();
