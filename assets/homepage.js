var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var cityButtons = document.querySelector("#city-buttons");
var mainDiv = document.querySelector("#main");
var cityNameEl = document.createElement("h2");
var forecastDiv = document.querySelector("#forecastCard");
var cityHistory = document.querySelector("#cityHistory");
var currentDayDiv = document.createElement ("div");
currentDayDiv.classList.add("currentDay");
currentDayDiv.setAttribute("id", "currentDay");
var cities; 


// var NowMoment = moment().format();

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var city = cityInputEl.value.trim();
  forecastDiv.innerHTML = ""
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
            mainDiv.innerHTML = "";
            cityNameEl.innerText = locationName;
            mainDiv.appendChild(cityNameEl)
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

// Current Weather Function
var weatherData = function (lat, long) {
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+"&lon="+long+"&cnt=5&appid=d59404695f0b8f8b3fe98cdfa252ddd5";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var counter = 0

            var currentDay = document.createElement("p");
            var currentTemp = data.current.temp
            // currentTemp.innerText = Math.floor((temp - 273.15)*1.8 + 32)
            var currentHumidity = data.current.humidity
            var currentWindSpeed = data.current.wind_speed
            // currentDay.innerText = moment().add(counter, "days").format("ddd MMM D YYYY") + "\n" + "Temp " + currentTemp + " °F" + "\n" + "Humidity " + currentHumidity + "%" + "\n" + currentWindSpeed + " MPH"   
            currentDayDiv.innerHTML = "";
            currentDayDiv.appendChild(currentDay);
            mainDiv.appendChild(currentDayDiv);
            currentDay.innerText = moment().add(counter, "days").format("ddd MMM D YYYY") + "\n" + Math.floor((currentTemp - 273.15)*1.8 + 32) + " °F" + "\n" + "Humidity " + currentHumidity + "%" + "\n" + currentWindSpeed + " MPH"   
            // // icons depending on the weather

            // For loop for 5 day forecast
            for (let i = 0; i < 5; i++) {

                var p2 = document.createElement("p");
                p2.innerText = moment().add(counter, "days").format("ddd MMM D YYYY")

                var p1 = document.createElement("p");
                var div = document.createElement("div")
                var temp = data.daily[i].temp.day
                p1.innerText = Math.floor((temp - 273.15)*1.8 + 32) + " °F"
                div.setAttribute("class", "col-3");

                var p3 = document.createElement("p");
                var wind = data.daily[i].wind_speed
                p3.innerText = "Wind Speed " + wind + " MPH"


                var p4 = document.createElement("p");
                var humidity = data.daily[i].humidity
                p4.innerText = "Humidity " + humidity + "%"
                div.append(p2,p1,p3,p4)
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
