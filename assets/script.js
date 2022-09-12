var submitBtn = $("#submit-btn");
var inputEl = $("#city-input");
var weatherDisplay = $("#weather-display")
var locationDisplay = $("#location-display");
var tempDisplay = $("#temp-display");
var windDisplay = $("#wind-display");
var humidityDisplay = $("#humidity-display");
var uvDisplay = $("#uv-display")
var todaysDate = (moment().format("M/D/YY"));
var forecastTitle = $("#forecast-title");
var forecastDisplay = $("#forecast-display");

submitBtn.on("click", function(e) {
    e.preventDefault();
    var cityInput = inputEl.val();
    // console.log(cityInput);
    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial"
    fetch(apiWeatherUrl) //Fetch API data, convert to json and pass data object to dispayWeather function
    .then(function(response1){
        if(response1.ok) {
            response1.json()
            .then(function(data1) {
                console.log(data1);
                displayWeather(data1);
            })
        } else {
            alert("Error: Please submit valid city")
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather")
    });
    fetch(apiForecastUrl)
    .then(function(response2){
        if(response2.ok) {
            response2.json()
            .then(function(data2) {
                console.log(data2);
                displayForecast(data2);
            });
        }
    })
    forecastTitle.text(`5-day Forecast:`)
    inputEl.val("");
});

function displayWeather(data1) {
    var iconUrl = `http://openweathermap.org/img/w/${data1.weather[0].icon}.png`;//Get icon url from api data
    var icon = $("<img src=" + iconUrl + ">");//Convert icon url into img
    locationDisplay.text(`${data1.name} (${todaysDate})`);//Display data and icon img on page
    locationDisplay.append(icon);
    tempDisplay.text(`Temp: ${data1.main.temp}\u00B0F`);
    windDisplay.text(`Wind: ${data1.wind.speed} MPH`);
    humidityDisplay.text(`Humidity: ${data1.main.humidity}%`);
    weatherDisplay.attr("style", "border: 1px black solid; padding: 0px 10px 20px")
}

//Workshopped this function until it worked with ONE box and ONE array item
// function displayForecast(data2) {
//     var iconUrl = `http://openweathermap.org/img/w/${data2.list[4].weather[0].icon}.png`;
//     var icon = $("<img src=" + iconUrl + ">");
//     var box = $("<div class='column forecast-box is-one-fifth'>");
//     var dateForecast = $("<div class='title is-5'>");
//     var tempForecast = $("<div style='padding: 5px'>");
//     var windForecast = $("<div style='padding: 5px'>");
//     var humidForecast = $("<div style='padding: 5px'>");
//     forecastTitle.text(`5-day Forecast:`)
//     dateForecast.text(moment(data2.list[4].dt_txt).format('l'));
//     tempForecast.text(`Temp: ${data2.list[4].main.temp}\u00B0F`);
//     windForecast.text(`Wind: ${data2.list[4].wind.speed} MPH`);
//     humidForecast.text(`Humidity: ${data2.list[4].main.humidity}%`);
//     box.append(dateForecast);
//     box.append(icon);
//     box.append(tempForecast);
//     box.append(windForecast);
//     box.append(humidForecast);
//     forecastDisplay.append(box);
//     console.log(box);
// }

//Used above info and experimented with looping through every 8 numbers after 4 (getting the forecast for every day at Noon)
function displayForecast(data2) {
    // console.log(data2.list);
    for (var i = 0; i < (data2.list.length); i++) {
        if (i===4 || i===12 || i===20 || i===28 || i===36) {
        var iconUrl = `http://openweathermap.org/img/w/${data2.list[i].weather[0].icon}.png`;
        var icon = $("<img src=" + iconUrl + ">");
        var box = $("<div class='column forecast-box is-one-sixth'>");
        var dateForecast = $("<div class='title is-5'>");
        var tempForecast = $("<div style='padding: 5px'>");
        var windForecast = $("<div style='padding: 5px'>");
        var humidForecast = $("<div style='padding: 5px'>");
        dateForecast.text(moment(data2.list[i].dt_txt).format('l'));
        tempForecast.text(`Temp: ${data2.list[i].main.temp}\u00B0F`);
        windForecast.text(`Wind: ${data2.list[i].wind.speed} MPH`);
        humidForecast.text(`Humidity: ${data2.list[i].main.humidity}%`);
        box.append(dateForecast);
        box.append(icon);
        box.append(tempForecast);
        box.append(windForecast);
        box.append(humidForecast);
        forecastDisplay.append(box);
        }
    }
}