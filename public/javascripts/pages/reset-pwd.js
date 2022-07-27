import {
  getAuth,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

let sendBtn = document.getElementById("sendBtnElement");
const auth = getAuth();
const newSwal = Swal.mixin({
  heightAuto: false,
  allowOutsideClick: false,
  allowEscapeKey: false,
});

sendBtn.addEventListener("click", async function () {
  const email = document.querySelector("input").value;

  handleValidate();
  if (sendBtn.attributes["disabled"] == undefined && email.length > 0) {
    resetPassword(email);
  }
});

async function resetPassword(email) {
  newSwal.fire({
    title: "Sending",
    text: "Just a moment . . .",
    didOpen: () => {
      Swal.showLoading();
      sendPasswordResetEmail(auth, email)
        .then(function () {
          newSwal
            .fire({
              title: "Completed!",
              text: "A password reset link was sent. Click the link in the email to create a new password.",
              showConfirmButton: true,
            })
            .then(function () {
              window.location.replace("/login");
            });
        })
        .catch(function (error) {
          var errorMessage = error.message;
          newSwal.fire({
            title: "Error!",
            text: errorMessage,
          });
        });
    },
  });
}

function handleValidate() {
  const $textInputs = $("input");
  const $validTextInputs = $("input:valid");
  const $submit = $("#sendBtnElement");
  if ($textInputs.length === $validTextInputs.length) {
    $submit.attr("disabled", null);
  } else {
    $submit.attr("disabled", "");
  }
}
