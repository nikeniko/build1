// andiamo a dare al bottone la funzione per iniziare il quiz
document.querySelector(".btn-start").addEventListener("click", startQuiz);

// vado a definire le variabili che verranno selezionate dall'utente
function startQuiz() {
  const numQuestions = document.getElementById("num-questions").value;
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;
  const timePerQuestion = document.getElementById("time").value;

  // vado a pescare le domane dall'url di questo sito
  const apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("questions", JSON.stringify(data.results));
      localStorage.setItem("timePerQuestion", timePerQuestion);
      window.location.href = "quiz.html";
    })
    .catch((error) => console.error("Error fetching questions:", error));
}
