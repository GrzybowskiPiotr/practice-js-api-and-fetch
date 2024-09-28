document.addEventListener("DOMContentLoaded", init);
const button = document.querySelector("button");
const span = document.querySelector("span");
function init() {
  console.log("DOM");
}

async function handleButtonClick() {
  const url = "https://api.ipify.org?format=json";
  fetch(url)
    .then((res) => res.json())
    .then((res) => (span.innerHTML = res.ip))
    .catch((error) => console.error(error));
}

button.addEventListener("click", handleButtonClick);
