const checkboxApp = document.querySelectorAll(".Checkbox");

const buttonCheck = document.querySelector(
  ".ButtonProceed"
);

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
    return (href = "quiz.html");
  }
};

buttonCheck.addEventListener("click", nextPage);
