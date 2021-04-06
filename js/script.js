
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city-name");
var cityNameEl = document.querySelector("#city");
var cityTempertureEl = document.querySelector("#temperature");
var cityHumidityEl = document.querySelector("#humidity");
var cityWindSpeedEl = document.querySelector("#wind-speed");
var cityUvIndex = document.querySelector("#uv-index");
var cityTimeEl = document.querySelector("#time");
var fiveDayWeatherEl = document.querySelector("#five-day-weather");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityname = cityInputEl.value.trim();
     if (cityname) {
         getCityWeather(cityname);
         
     } else {
         alert("Enter a city name");
     }
};

var getCityWeather = function(cityname) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=01e29ddeca0b1af0d4b9b4e48434c5cf";

    
    //make a request to the url
    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(data) {  
        displayCityName(data);  
        displayFiveDay(data);
    
    });
};


var convertKelvin = function(kelvin) {
    return parseInt((kelvin - 273.15) * 1.8 + 32);
  };


var displayCityName = function(data) {
    var city = data.city.name
    var temperature = data.list[0].main.temp
    var humidity = data.list[0].main.humidity
    var windSpeed = data.list[0].wind.speed
    var uvIndex = data.list[0].visibility
    var time = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.querySelector(".icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'></img>"
    console.log(temperature)
    cityNameEl.textContent = "City: " + city
    cityTempertureEl.textContent = "Temperature: " + convertKelvin(temperature) + " F"
    cityHumidityEl.textContent = "Humidity: " + humidity + "%"
    cityWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH"
    cityUvIndex.textContent = "UV Index: " + uvIndex
    cityTimeEl.textContent = "Time: " + time

}

var displayFiveDay = function(data) {
    console.log(data)
    for(var i = 0; i < data.list.length; i++) {
        if(data.list[i].dt_txt.endsWith("12:00:00")) {
            
            var temperature = data.list[i].main.temp
            var humidity = data.list[i].main.humidity
            var windSpeed = data.list[i].wind.speed
            var uvIndex = data.list[i].visibility
            console.log(temperature)
            console.log(humidity)
            console.log(windSpeed)
            console.log(uvIndex)
            
            var col = document.createElement("div")
            col.classList.add("col-md-2")
            col.innerHTML = "Temperature: " + convertKelvin(temperature) + "Humidity: " + humidity + "%" + "<br>" + "Wind Speed: " + windSpeed 
            fiveDayWeatherEl.appendChild(col)
        }
        
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);