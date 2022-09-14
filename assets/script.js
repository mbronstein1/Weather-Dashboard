var submitBtn = $(".submit-btn");
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
var buttonSection = $("#button-section");
var storedCity = JSON.parse(localStorage.getItem("city")) || [];

if(storedCity.length > 10) {
    storedCity.shift();
};

submitBtn.on("click", function(e) {
    e.preventDefault();
    var cityInput = inputEl.val();
    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial"
    fetchApi(apiWeatherUrl, apiForecastUrl);
    inputEl.val("");
    if (storedCity.includes(cityInput) || cityInput === "") {
        return;
    }
    var saveBtn = $("<btn class='save-btn button submit-btn'>");
    saveBtn.text(cityInput);
    saveBtn.val(cityInput);
    buttonSection.append(saveBtn);
    storedCity.push(cityInput);
    localStorage.setItem("city", JSON.stringify(storedCity));
});

//Create button dynamically after submitBtn is submitted
buttonSection.on("click", ".save-btn", function(e) {
    e.preventDefault();
    var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + e.target.value + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + e.target.value + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
    fetchApi(apiWeatherUrl, apiForecastUrl);
})

function fetchApi(apiWeatherUrl, apiForecastUrl) {
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
                displayForecast(data2);
            });
        }
    })
}

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

//Used above info and experimented with looping through every 8 numbers after 4 (getting the forecast for every day at Noon)
function displayForecast(data2) {
    forecastTitle.text(`5-day Forecast:`);
    forecastDisplay.empty(box);
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

function init(storedCity) {
    if (storedCity !== null) {
        for(var i = 0; i < storedCity.length; i++) {
            var saveBtn = $("<btn class='save-btn button submit-btn'>");
            saveBtn.text([storedCity[i]]);
            saveBtn.val(storedCity[i]);
            buttonSection.append(saveBtn);
        }
    }
};

init(storedCity);


// Original version of onClicks without fetchApi as a function
// submitBtn.on("click", function(e) {
//     e.preventDefault();
//     var cityInput = inputEl.val();
//     var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
//     var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial"
//     fetch(apiWeatherUrl) //Fetch API data, convert to json and pass data object to dispayWeather function
//     .then(function(response1){
//         if(response1.ok) {
//             response1.json()
//             .then(function(data1) {

//                 displayWeather(data1);
//             })
//         } else {
//             alert("Error: Please submit valid city")
//         }
//     })
//     .catch(function(error) {
//         alert("Unable to connect to Open Weather")
//     });
//     fetch(apiForecastUrl)
//     .then(function(response2){
//         if(response2.ok) {
//             response2.json()
//             .then(function(data2) {
//                 displayForecast(data2);
//             });
//         }
//     })
//     var saveBtn = $("<btn class='save-btn button submit-btn'>");
//     saveBtn.text(cityInput);
//     saveBtn.val(cityInput)
//     buttonSection.append(saveBtn);
//     inputEl.val("");
// });


// //Create button dynamically after submitBtn is submitted
// buttonSection.on("click", ".save-btn", function(e) {
//     e.preventDefault();
//     var apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + e.target.value + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
//     var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + e.target.value + "&appid=7ca09bdacd044c4e45bfed7a72a9b8df&units=imperial";
//     fetch(apiWeatherUrl)
//     .then(function(response1){
//         if(response1.ok) {
//             response1.json()
//             .then(function(data1) {
//                 displayWeather(data1);
//             })
//         } else {
//             alert("Error: Please submit valid city")
//         }
//     })
//     .catch(function(error) {
//         alert("Unable to connect to Open Weather")
//     });
//     fetch(apiForecastUrl)
//     .then(function(response2){
//         if(response2.ok) {
//             response2.json()
//             .then(function(data2) {
//                 displayForecast(data2);
//             });
//         }
//     })

// })