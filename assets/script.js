var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var searchHistory = document.querySelector("#search-history");
var searchHistoryArray = [];

if (localStorage.getItem("searchHistoryArrayKey")) {
  searchHistoryArray = localStorage.getItem("searchHistoryArrayKey").split(",");
}

for (var i = 0; i < searchHistoryArray.length; i++) {
  var searchHistoryEl = document.createElement("li");
  searchHistoryEl.textContent = searchHistoryArray[i];
  searchHistory.append(searchHistoryEl);
  searchHistoryEl.addEventListener("click", handleSearchFormSubmitAgain);
}

//1st Api Search to get the city
function searchApi(cityQuery) {
  var cityQueryUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityQuery +
    "&appid=a1151b795e9b200b2aec48ef61846024";
  var searchHistoryEl = document.createElement("li");

  fetch(cityQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (queryRes) {
      var lat = queryRes[0].lat;
      var lon = queryRes[0].lon;

      searchApiWeather(cityQuery, lat, lon);
    });

  console.log(searchHistoryArray);
  if (searchHistoryArray.includes(cityQuery)) {
    return;
  }

  searchHistoryEl.textContent = cityQuery;
  searchHistoryEl.addEventListener("click", handleSearchFormSubmitAgain);
  searchHistory.append(searchHistoryEl);
  searchHistoryArray.push(cityQuery);
  console.log(searchHistoryArray);
  localStorage.setItem("searchHistoryArrayKey", searchHistoryArray);
}

//2nd Api search to get the weather
function searchApiWeather(cityQuery, lat, lon) {
  var cityWeatherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=a1151b795e9b200b2aec48ef61846024";

  fetch(cityWeatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherRes) {
      console.log(weatherRes);

      //display results for daily
      var cityTemp = weatherRes.current.temp;
      var cityHum = weatherRes.current.humidity;
      var currentDate = weatherRes.current.dt;
      var date = moment.unix(currentDate).format("MM/DD/YY" + " ");

      var uvi = weatherRes.current.uvi;
      var icon = weatherRes.current.weather[0].icon;
      var wind = weatherRes.current.wind_speed;

      var resultBody = document.createElement("div");
      var titleEl = document.createElement("h3");
      var dateEl = document.createElement("h3");
      var tempEl = document.createElement("h4");
      var humEl = document.createElement("h4");
      var uviEl = document.createElement("h4");
      var iconEl = document.createElement("img");
      var windEl = document.createElement("h4");

      resultContentEl.innerHTML = "";

      resultContentEl.append(resultBody);

      titleEl.textContent = cityQuery;
      resultBody.append(titleEl);

      dateEl.textContent = date;
      resultBody.append(dateEl);

      tempEl.textContent =
        "Current temperature: " + cityTemp + " degrees farenheit";
      resultBody.append(tempEl);

      humEl.textContent = "Humidity: " + cityHum + "%";
      resultBody.append(humEl);

      windEl.textContent = "Windspeed: " + wind;
      resultBody.append(windEl);

      uviEl.textContent = "UVI: " + uvi;
      resultBody.append(uviEl);

      if (uvi < 3) {
        // uviEl.classList.add("green");
        uviEl.style.color = "green";
      } else if (uvi >= 3 && uvi <= 7) {
        uviEl.classList.add("yellow");
      } else {
        uviEl.classList.add("red");
      }

      //link for icon image
      iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      resultBody.append(iconEl);

      //display results for 5-day forecast

      var fiveDayResult = document.querySelector(".five-result-content");
      var fiveDayForecast = weatherRes.daily;

      // 5-day forecast
      fiveDayResult.innerHTML = "";
      for (var i = 1; i < fiveDayForecast.length - 2; i++) {
        var timestamp = fiveDayForecast[i].dt;
        var finalDate = moment.unix(timestamp).format("MM/DD/YY" + " ");

        var cardContainer = document.createElement("div");
        cardContainer.classList.add("card");

        var fiveDayTempEl = document.createElement("h3");
        fiveDayTempEl.textContent =
          finalDate + weatherRes.daily[i].temp.day + " degrees farenheit";
        cardContainer.append(fiveDayTempEl);

        var fiveDayIconEl = document.createElement("img");
        var fiveDayIcon = weatherRes.daily[i].weather[0].icon;
        fiveDayIconEl.src =
          "http://openweathermap.org/img/wn/" + fiveDayIcon + "@2x.png";
        cardContainer.append(fiveDayIconEl);

        var fiveDayHumEl = document.createElement("h4");
        var fiveDayHum = weatherRes.daily[i].humidity;
        fiveDayHumEl.textContent = "Humidity:" + fiveDayHum + "%";
        console.log(fiveDayHumEl);
        cardContainer.append(fiveDayHumEl);

        var fiveDayWindEl = document.createElement("h4");
        var fiveDayWind = weatherRes.daily[i].wind_speed;
        fiveDayWindEl.textContent = "Windspeed: " + fiveDayWind;
        cardContainer.append(fiveDayWindEl);

        fiveDayResult.append(cardContainer);
      }
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  searchApi(searchInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

function handleSearchFormSubmitAgain(event) {
  event.preventDefault();

  var searchInputVal = event.target.innerHTML;
  searchApi(searchInputVal);
}
