var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityButtons = document.querySelector("#city-buttons");
var mainDiv = document.querySelector("#main");
var forecastDiv = document.querySelector("#forecastCard");
var cityHistory = document.querySelector("#cityHistory");
var cities; 


// var NowMoment = moment().format();

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var city = cityInputEl.value.trim();
  console.log(city)
  if (city) {
      saveCities(city);
    getCoordinates(city);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var getCoordinates = function (locationName) {
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +locationName+"&appid=d59404695f0b8f8b3fe98cdfa252ddd5"
fetch(apiUrl)
.then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var h2 = document.createElement("h2");
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
function getWeather(event) {
    mainDiv.innerHTML = ""
    forecastDiv.innerHTML = ""
    console.log(event.target.innerText)
    getCoordinates(event.target.innerText);
}

loadRecentSearch();


function loadRecentSearch() {
    var recentSearch = JSON.parse(localStorage.getItem("cities"));
    if (recentSearch) {
        cities = recentSearch;
        for (let i = 0; i < cities.length; i++) {
            var button = document.createElement("button");
            // button.classList.add("")
            button.innerText = cities[i]
            button.value = cities[i]
            button.addEventListener("click", getWeather)
            cityHistory.appendChild(button)
            
        }
    } else {
        cities = [];
    }
};

function saveCities(city) {
    // localStorage.setItem("cities", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
}



// getCoordinates(city);


var weatherData = function (lat, long) {
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+"&lon="+long+"&cnt=5&appid=d59404695f0b8f8b3fe98cdfa252ddd5";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var counter = 0
            // icons depending on the weather
            // for loop for 0 which = current day
            for (let i = 0; i < 5; i++) {
                var p = document.createElement("p");
                var div = document.createElement("div")
                var temp = data.daily[i].temp.day
                p.innerText = Math.floor((temp - 273.15)*1.8 + 32) + "°F"
                // forecastDiv.appendChild(p)
                div.setAttribute("class", "col-3");

                var p2 = document.createElement("p");
                p2.innerText = moment().add(counter, "days").format("ddd MMM D YYYY")
                // forecastDiv.appendChild(p2);
                // p2.setAttribute("class", "col-3");

                var p3 = document.createElement("p");
                var wind = data.daily[i].wind_speed
                p3.innerText = wind + "MPH"
                // forecastDiv.appendChild(p3);


                var p4 = document.createElement("p");
                var humidity = data.daily[i].humidity
                p4.innerText = humidity + "%"
                // forecastDiv.appendChild(p4);
                div.append(p,p2,p3,p4)
                forecastDiv.append(div);
                counter ++
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
