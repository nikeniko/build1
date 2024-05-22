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
    "correctPercentageText"
  ).innerText = `${correctPercentage.toFixed(1)}% Correct`;
  document.getElementById(
    "wrongPercentageText"
  ).innerText = `${wrongPercentage.toFixed(1)}% Wrong`;

  const correctCircle = document.querySelector(".correct");
  const wrongCircle = document.querySelector(".wrong");

  correctCircle.style.strokeDasharray = `${correctPercentage} ${
    100 - correctPercentage
  }`;
  wrongCircle.style.strokeDasharray = `${wrongPercentage} ${
    100 - wrongPercentage
  }`;
});
