const apiUrl = "http://localhost:3000/users";

document.addEventListener("DOMContentLoaded", init);
const form = document.querySelector("form");
const formFirstName = document.querySelector(".form__field--first-name");
const formLastName = document.querySelector(".form__field--last-name");
function init() {
  loadUsers();
  module.exports = () => {
    const data = { users: [] };
    for (let i = 0; i < 100; i++) {
      data.users.push({ id: i, name: `users${i}` });
    }
    return data;
  };
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

async function sendData(firstName, lastName) {
  let id = "";
  await fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => {
      id = `${res.length + 1}`;
    });

  if (firstName !== "" && lastName !== "") {
    let formObj = { id, firstName, lastName };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObj),
    }).finally(() => {
      form.reset();
      loadUsers();
    });
  } else {
    console.log("pole Imie lub Nazwizsko nie może być puste");
  }
}

function handleformSubmit(e) {
  e.preventDefault();
  e.stopPropagation();
  const firstName = formFirstName.value.trim();
  const lastName = formLastName.value.trim();
  sendData(firstName, lastName);
}

form.addEventListener("submit", (e) => handleformSubmit(e));
