let sendBtn = document.getElementById("sendBtnElement");

sendBtn.addEventListener("click", function () {
  handleValidate();
  const email = document.querySelector("input").value;
  if (sendBtn.attributes["disabled"] == undefined && email.length > 0) {
    console.log("send");
  }
});
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
