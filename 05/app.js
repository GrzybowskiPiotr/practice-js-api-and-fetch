const apiUrl = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", init);
const form = document.querySelector("form");
const formFirstName = document.querySelector(".form__field--first-name");
const formLastName = document.querySelector(".form__field--last-name");
function init() {
  loadUsers();
}

function loadUsers() {
  const promise = fetchGet(apiUrl);

  promise.then((data) => insertUsers(data)).catch((err) => console.error(err));
}

function fetchGet(url) {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp);
  });
}

function insertUsers(usersList) {
  const ulElement = document.querySelector(".users");
  ulElement.innerHTML = "";
  usersList.forEach((user) => {
    const liElement = document.createElement("li");
    liElement.innerText = `${user.firstName} ${user.lastName}`;

    ulElement.appendChild(liElement);
  });
}

function handleformSubmit(e) {
  e.preventDefault();
  e.stopPropagation();
  const firstName = formFirstName.value.trim();
  const lastName = formLastName.value.trim();

  if (firstName !== "" && lastName !== "") {
    let formObj = { firstName, lastName };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    }).finally((res) => {
      if (res.ok) {
        alert(res.ok);
        loadUsers();
        form.reset();
      }
    });
  } else {
    console.log("pole Imie lub Nazwizsko nie może być puste");
  }
}

form.addEventListener("submit", (e) => handleformSubmit(e));
