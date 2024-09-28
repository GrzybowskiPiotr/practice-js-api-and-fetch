document.addEventListener("DOMContentLoaded", init);

function init() {
  const divList = document.querySelectorAll("div");

  setBorderColorAsync(divList[0], "red", function () {})
    .then(setBorderColorAsync(divList[1], "blue", function () {}))
    .then(
      setBorderColorAsync(divList[2], "green", function () {
        console.log("finish");
      })
    );
}

function setBorderColorAsync(element, color, callback) {
  return new Promise((resolve, reject) => {
    if (element && element instanceof HTMLElement) {
      // sprawdzam czy parametr jest elementem DOM, więcej:
      // https://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object

      if (callback && typeof callback === "function") {
        resolve(
          setTimeout(() => {
            element.style.border = `3px solid ${color}`;
            callback();
          }, Math.random() * 3000)
        );
      } else {
        reject(alert("Parametr ~callback~ mus być funkcją"));
      }
    } else {
      reject(alert("Paremetr ~element~ musi być prawidłowym elementem DOM"));
    }
  });
}
