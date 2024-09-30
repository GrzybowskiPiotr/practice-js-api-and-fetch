document.addEventListener("DOMContentLoaded", init);
const form = document.querySelector("form");
const submit = document.querySelector("input[type=submit]");
const latInput = document.querySelector(".form__field--lat");
const logInput = document.querySelector(".form__field--lng");
const apiKey = "2aff5c61175c474d96e05c1bc6839441";
const parLat = document.querySelector(".weather__lat");
const parLng = document.querySelector(".weather__lng");
const patCity = document.querySelector(".weather__summary");
const temp = document.querySelector(".weather__temperature");
function handleFormSubmit(e) {
  e.preventDefault();
  latitude = latInput.value;
  longitude = logInput.value;

  let url = `https://api.weatherbit.io/v2.0/current?lat=${[latitude]}&lon=${[
    longitude,
  ]}&lang=[pl]&key=${[apiKey]}`;

  let weatherData = {};

  function handleFetchedData(dataObj) {
    weatherData = dataObj.data[0];
    console.log(weatherData);
    parLat.innerHTML = weatherData.lat;
    parLng.innerHTML = weatherData.lon;
    patCity.innerHTML = weatherData.city_name;
    temp.innerHTML = weatherData.app_temp;
    temp.nextSibling.replaceWith("℃");
  }

  fetch(url)
    .then((res) => res.json())
    .then((res) => handleFetchedData(res))
    .catch((err) => console.error(err));
}

form.addEventListener("submit", (e) => handleFormSubmit(e));

function init() {
  console.log("DOM");
}
