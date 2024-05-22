document.addEventListener("DOMContentLoaded", function () {
  const score = parseInt(localStorage.getItem("score"), 10);
  const totalQuestions = parseInt(localStorage.getItem("totalQuestions"), 10);

  const correctAnswers = score;
  const wrongAnswers = totalQuestions - correctAnswers;

  const correctPercentage = (correctAnswers / totalQuestions) * 100;
  const wrongPercentage = (wrongAnswers / totalQuestions) * 100;

  document.getElementById(
    "correctPercentage"
  ).innerText = `${correctPercentage.toFixed(1)}%`;
  document.getElementById(
    "wrongPercentage"
  ).innerText = `${wrongPercentage.toFixed(1)}%`;
  document.getElementById(
    "correctAnswers"
  ).innerText = `${correctAnswers}/${totalQuestions} questions`;
  document.getElementById(
    "wrongAnswers"
  ).innerText = `${wrongAnswers}/${totalQuestions} questions`;

  document.getElementById(
    "correctPercentage"
  ).innerText = `${correctPercentage.toFixed(1)}% `;
  document.getElementById(
    "wrongPercentage"
  ).innerText = `${wrongPercentage.toFixed(1)}% `;

  const correctCircle = document.querySelector(".correct");
  const wrongCircle = document.querySelector(".wrong");

  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const correctLength = (circumference * correctPercentage) / 100;
  const wrongLength = (circumference * wrongPercentage) / 100;

  correctCircle.style.strokeDasharray = `${correctLength} ${
    circumference - correctLength
  }`;
  wrongCircle.style.strokeDasharray = `${wrongLength} ${
    circumference - wrongLength
  }`;
});
document.getElementById("rateButton").addEventListener("click", function () {
  window.location.href = "feedback.html";
});
