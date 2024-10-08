document.addEventListener("DOMContentLoaded", init);

function init() {
  const divList = document.querySelectorAll("div");

  setBorderColorAsync(divList[0], "red")
    .then(() => {
      setBorderColorAsync(divList[1], "blue");
    })
    .then(() => {
      setBorderColorAsync(divList[2], "green");
    })
    .then(() => console.log("finish"))
    .catch((error) => {
      console.error(error);
    });

  // setBorderColorAsync(divList[0], 'red', function() {
  //     setBorderColorAsync(divList[1], 'blue', function() {
  //         setBorderColorAsync(divList[2], 'green', function() {
  //             console.log('finish');
  //         });
  //     });
  // });
}

function setBorderColorAsync(element, color) {
  return new Promise((resolve, reject) => {
    if (!element) {
      reject("brak elementu");
    } else {
      setTimeout(() => {
        element.style.border = `3px solid ${color}`;
        resolve();
      }, Math.random() * 3000);
    }
  });
}

// function setBorderColorAsync(element, color, callback) {
//   setTimeout(() => {
//     element.style.border = `3px solid ${color}`;
//     callback();
//   }, Math.random() * 3000);
// }
