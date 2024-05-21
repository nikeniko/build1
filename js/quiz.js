const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    answers: [
      { text: "Central Processing Unit", correct: true },
      { text: "Central Process Unit", correct: false },
      { text: "Central personal Unit", correct: false },
      { text: "Central Processor Unit", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    answers: [
      { text: "Final", correct: true },
      { text: "Static", correct: false },
      { text: "Private", correct: false },
      { text: "Public", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    answers: [
      { text: ".svg", correct: true },
      { text: ".png", correct: false },
      { text: ".jpeg", correct: false },
      { text: ".gif", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheet", correct: true },
      { text: "Counter Strike: Source", correct: false },
      { text: "Corrective Style Sheet", correct: false },
      { text: "Computer Style Sheet", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    answers: [
      { text: "Nougat", correct: true },
      { text: "Ice Cream Sandwich", correct: false },
      { text: "Jelly Bean", correct: false },
      { text: "Marshmallow", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    answers: [
      { text: "140", correct: true },
      { text: "120", correct: false },
      { text: "160", correct: false },
      { text: "100", correct: false },
    ],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    answers: [
      { text: "Java", correct: true },
      { text: "Python", correct: false },
      { text: "C", correct: false },
      { text: "Jakarta", correct: false },
    ],
  },
];

// variabili per domande, risposte, prosegui, tempo, risposta corrente, num.totale domande
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");
const currentQuestionElement = document.querySelector(".current");
const totalQuestionElement = document.querySelector(".total");
// indice a 0, lo sccore iniziale, tempo e tempo rimanente
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
// il numero totale domande
totalQuestionElement.textContent = `/${questions.length}`;
// inizializazione quiz, indice domanda 0, score 0, funzione per visualizare prima domanda
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}
// visualizazione domande, resetta l'interfaccia del quiz, mostra la domanda e il numero
function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  currentQuestionElement.textContent = questionNo;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  // funzione per mischiare le l'ordine delle risposte
  shuffleArray(currentQuestion.answers);
  // creà un bottone per ogni risposta
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
// funzione per mischiare le l'ordine delle risposte
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// nascode il bottone next, rimuove le risposte e resetta il timer
function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  clearInterval(timer);
  timerElement.innerHTML = "30";
  timeLeft = 30;
}
// stoppa il timer, controlla se le risposte sono corrette lo visualizza come tale e se si aggiunge un punto, prosegue dopo un secondo
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
// inizia il countdown
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    setProgress((timeLeft / 30) * 100);
    if (timeLeft === 0) {
      clearInterval(timer);
      handleTimeOut();
    }
  }, 1000);
}
// fa vedere la risposta corretta disabilita tutti i bottoni e dopo un secondo cambia pagina
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
//va vedere la domanada che segue
nextButton.addEventListener("click", handleNextButton);
// e se arriva alla fine va vedere lo score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
// e lo score verrà visualizato in questa pagina
function showScore() {
  window.location.href = "result-page.html";
}

startQuiz();
// cercio progressivo, timer
let progressCircle = document.querySelector(".progress");
let radius = progressCircle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = circumference;

function setProgress(percent) {
  progressCircle.style.strokeDashoffset =
    circumference - (percent / 100) * circumference;
}
