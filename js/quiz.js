//prendo domande e tempo
const questions = JSON.parse(localStorage.getItem("questions"));
const timePerQuestion = parseInt(localStorage.getItem("timePerQuestion"), 10);

//vado a definire le variabili
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");
const currentQuestionElement = document.querySelector(".current");
const totalQuestionElement = document.querySelector(".total");

// vado a settare i valori di base delle variabili
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = timePerQuestion;

// vado a prendere il numero totale delle domande
totalQuestionElement.textContent = `/${questions.length}`;

// vado a inizializiare il quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

// qui vado a mostrare a chermo le varie domande
function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  currentQuestionElement.textContent = questionNo;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // qui vado a mischiare le risposte
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  // per ogni risposta vado ad assegnarli un bottone
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);
    if (answer === currentQuestion.correct_answer) {
      button.dataset.correct = "true";
    }
    button.addEventListener("click", selectAnswer);
  });
}

// resetta il display per dare spazio alle alla prossima domanda
function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  clearInterval(timer);
  timerElement.innerHTML = timePerQuestion;
  timeLeft = timePerQuestion;
}

// qui vado a determinare cosa succede in caso i risposata corretta o sbagliata
function selectAnswer(e) {
  clearInterval(timer);
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  setTimeout(() => {
    handleNextButton();
  }, 1000);
}

// qui avvio il countdown
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    setProgress((timeLeft / timePerQuestion) * 100);
    if (timeLeft === 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}

// qui se il timer arriva a 0 fara vedere la risposata corretta e dopo un secondo passera alla prossima domanda
function handleTimeOut() {
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  setTimeout(() => {
    handleNextButton();
  }, 1000);
}

// qui andiamo a dire se la domanda corrente arriva alla stessa lunghezza delle domande totali mostra il risultato
nextButton.addEventListener("click", handleNextButton);

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// la funzione ci portrà alla prossima pagina dove ci verrà mostrato il risultato
function showScore() {
  localStorage.setItem("score", score);
  localStorage.setItem("totalQuestions", questions.length);
  window.location.href = "resultPage.html";
}

// inizializza il quiz
startQuiz();

// codice per il diagramma a ciambella
let progressCircle = document.querySelector(".progress");
let radius = progressCircle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = circumference;

function setProgress(percent) {
  progressCircle.style.strokeDashoffset =
    circumference - (percent / 100) * circumference;
}
