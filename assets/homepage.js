var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityButtons = document.querySelector("#city-buttons");

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

var getCoordinates = function (locationName) {
var apiGoogleUrl = "http://api.positionstack.com/v1/forward?access_key=2f79fcced3fb30a89ad371057b8c8a0e&query=" + locationName;+"limit=1&output=json";
fetch(apiGoogleUrl)
.then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            return data;
        });
    } else {
        alert("Error: location not found");
    }
})
.catch(function(error) {
    alert("unable to connect to google geolocation");
});
}

getCoordinates("Salt Lake City");
// Do google API search for coordinates
// Create object with city + coordinates

var weatherData = function (lat, long) {
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+"&lon="+long+"&appid=d59404695f0b8f8b3fe98cdfa252ddd5";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            return data;
        });
    } else {
        alert("City Not Found");
    }
});
};


// print out data
cityFormEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
