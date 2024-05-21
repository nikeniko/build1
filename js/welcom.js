const checkboxApp = document.querySelectorAll(".Checkbox");

const buttonCheck = document.querySelector(
  ".ButtonProceed"
);
// Verifica che la cackBox è stata selezionata

const nextPage = function (event) {
  let isChecked = false;
  checkboxApp.forEach((checkbox) => {
    if (checkbox.checked) {
      isChecked = true;
    }
  });
  if (!isChecked) {
    event.preventDefault();
    alert("You must Accept the conditions");
  } else {
    window.location.href = "quiz.html";
  }
};

buttonCheck.addEventListener("click", nextPage);
