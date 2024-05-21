const checkboxApp = document.querySelectorAll(
  "input[type='checkbox]"
);

const buttonCheck = document.querySelector(
  ".ButtonProceed"
);

buttonCheck.addEventListener("click", () => {
  window.location.href = "../build1/quiz.html";
});
