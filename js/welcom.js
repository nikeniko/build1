const checkboxApp = document.querySelectorAll(".Checkbox");

const buttonCheck = document.querySelector(".ButtonProceed");

// Verifica che la cackBox è stata selezionata, se non lo fosse esegue un messaggio di allert,
// Se invece lo è prosegue con la pagina di riferimento

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
    window.location.href = "Chosequiz.html";
  }
};

buttonCheck.addEventListener("click", nextPage);
