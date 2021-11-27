var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var city = cityInputEl.value.trim();
  if (city) {
    getCityRepos(city);
    repoContainerEl.textContent = "";
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getCityRepos = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
};

cityFormEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
