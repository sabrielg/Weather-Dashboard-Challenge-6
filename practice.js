var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityButtons = document.querySelector("#city-buttons");
var mainDiv = document.querySelector("#main");
var forecastDiv = document.querySelector("#forecast");

var formSubmitHandler = function (event) {
    target = $(event.target);
    targetId = target.attr("id");

    if (targetId === "citySearchList") {
        var city = target.text();
    } else if (targetId === "search-submit") {
        var city = $("#citySearch").val();
    };
    if(city) {
        getWeatherData(city);
    } else {
        alert("Please enter a city");
    }
    target.blur();
//   event.preventDefault();
//   console.log(event);
//   var city = cityInputEl.value.trim();
//   if (city) {
//     getCoordinates(city);
//     repoContainerEl.textContent = "";
//     cityInputEl.value = "";
//   } else {
//     alert("Please enter a City");
//   }
};

var getCoordinates = function (locationName) {
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +locationName+"&appid=d59404695f0b8f8b3fe98cdfa252ddd5"
fetch(apiUrl)
.then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var h2 = document.createElement("h2");
            // var locationName = userInput.value;
            h2.innerText = locationName;
            mainDiv.appendChild(h2)
            weatherData(data.city.coord.lat, data.city.coord.lon);
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

getCoordinates(locationName);


var weatherData = function (lat, long) {
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+"&lon="+long+"&cnt=5&appid=d59404695f0b8f8b3fe98cdfa252ddd5";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);

            // add in date and icons depending on the weather
            for (let i = 0; i < 5; i++) {
                var p = document.createElement("p");
                var temp = data.daily[i].temp.day
                p.innerText = Math.floor((temp - 273.15)*1.8 + 32) + "°F"
                forecastDiv.appendChild(p);
            }
            for (let i = 0; i < 5; i++) {
                var p = document.createElement("p");
                var wind = data.daily[i].wind_speed
                p.innerText = wind + "MPH"
                forecastDiv.appendChild(p);
            }
            for (let i = 0; i < 5; i++) {
                var p = document.createElement("p");
                var humidity = data.daily[i].humidity
                p.innerText = humidity + "%"
                forecastDiv.appendChild(p);
            }
            
            return data;
        });
    } else {
        alert("City Not Found");
    }
});
};


// print out data
cityFormEl.addEventListener("submit", formSubmitHandler);
// cityButtonsEl.addEventListener("click", buttonClickHandler);