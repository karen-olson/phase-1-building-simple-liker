// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = "♡";
const FULL_HEART = "♥";

// Your JavaScript code goes here!

//Event Listener: Hide error modal on DOMContentLoaded
const modal = document.querySelector("#modal");
modal.classList = "hidden";
// document.addEventListener(
//   "DOMContentLoaded",
//   () => (modal.classList = "hidden")
// );

//Event Listener: Click Listener for Heart Buttons
const heartButtons = document.querySelectorAll(".like-glyph");
heartButtons.forEach((heartButton) =>
  heartButton.addEventListener("click", handleClick)
);

//Handle Click
function handleClick(e) {
  // Call the server. If successful, call handleSuccess. If an error, call handleError
  mimicServerCall()
    .then(() => handleSuccess())
    .catch(() => handleError());

  function handleSuccess() {
    const currentHeart = e.target;
    const heartValue = currentHeart.classList["value"];

    if (heartValue === "activated-heart") {
      currentHeart.classList.remove("activated-heart");
      currentHeart.innerText = EMPTY_HEART;
    } else {
      currentHeart.classList = "activated-heart";
      currentHeart.innerText = FULL_HEART;
    }
  }

  function handleError() {
    //unhide error modal
    const modal = document.querySelector("#modal");
    modal.classList.remove("hidden");

    // Change modal's inner text/text content to display server error msg
    modal.textContent = "Random server error. Try again.";

    // use setTimeout to change back to .hidden after 3s
    setTimeout(function () {
      modal.classList = "hidden";
    }, 3000);
  }
}

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
