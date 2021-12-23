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
            button.setAttribute("class", "day-buttons")
            // button.classList.add("")
            button.innerText = cities[i]
            button.value = cities[i]
            button.addEventListener("click", getWeather)
            var br = document.createElement("br");
            cityHistory.appendChild(button)
            cityHistory.appendChild(br)
            
        }
    } else {
        cities = [];
    }
};

function saveCities(city) {
    localStorage.setItem("cities", city);
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
}



// Current Weather Function
var weatherData = function (lat, long) {
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+"&lon="+long+"&cnt=5&appid=d59404695f0b8f8b3fe98cdfa252ddd5";
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {
            console.log(data);
            var counter = 0

            var currentDay = document.createElement("p");
            var currentIcon = document.createElement("img");
            console.log(currentIcon)
            console.log(data.current.weather[0].icon)
            var iconTwo = data.current.weather[0].icon
            currentIcon.src = `http://openweathermap.org/img/wn/${iconTwo}@2x.png`;
            var currentTemp = data.current.temp
            var currentHumidity = data.current.humidity
            var currentWindSpeed = data.current.wind_speed
            // var currentUvIndex = data.current.uvi
            // if (currentUvIndex < 3) {
            //     currentUvIndex.classList.add("bg-success")
            // }
            // if (currentUvIndex > 3) {
            //     currentUvIndex.classList.add("bg-warning");
            // }
            currentDayDiv.innerHTML = "";
            currentDayDiv.appendChild(currentDay);
            currentDayDiv.appendChild(currentIcon);
            mainDiv.appendChild(currentDayDiv);
            currentDay.innerText = 
            moment().add(counter, "days").format("ddd MMM D YYYY") + "\n" 
            + "Temperature: " + Math.floor((currentTemp - 273.15)*1.8 + 32) + " °F" + "\n" + 
            "Humidity: " + currentHumidity + "%" + "\n" + 
            "Wind: " + currentWindSpeed + " MPH" 
            // "Current UV index: " + currentUvIndex
            // console.log(data.current.uvi)

            // // icons depending on the weather

            // For loop for 5 day forecast
            for (let i = 1; i < 6; i++) {

                var date = document.createElement("p");
                date.innerText = moment().add(i, "days").format("ddd MMM D YYYY")

                var Icon = document.createElement("img");
                Icon.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;

                var tempCard = document.createElement("p");
                var div = document.createElement("div")
                var temp = data.daily[i].temp.day
                tempCard.innerText = "Temp: " + Math.floor((temp - 273.15)*1.8 + 32) + " °F"
                div.setAttribute("class", "individual-days");

                var windSpeed = document.createElement("p");
                var wind = data.daily[i].wind_speed
                windSpeed.innerText = "Wind: " + wind + " MPH"


                var HumidCard = document.createElement("p");
                var humidity = data.daily[i].humidity
                HumidCard.innerText = "Humidity: " + humidity + "%"
                div.append(date,Icon,tempCard,windSpeed,HumidCard)
                forecastDiv.append(div);
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


