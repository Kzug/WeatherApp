var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");

function getParams() {
     // Get the search params out of URL and convert it to an array 
    var searchParamsArr = document.location.search.split('&');

    //Sets the search value to the value of cityQuery 
    var cityQuery = searchParamsArr[0].split('=').pop();

    searchApi (cityQuery); 
};

//1st Api Search to get the city
function searchApi (cityQuery) {
    var cityQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityQuery + "&appid=a1151b795e9b200b2aec48ef61846024";

    fetch(cityQueryUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function(queryRes) {
          var lat = queryRes[0].lat;
          var lon = queryRes[0].lon;

        searchApiWeather(cityQuery, lat, lon);
      }
    )
 };

 //2nd Api search to get the weather 
function searchApiWeather (cityQuery, lat, lon) {
    var cityWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=a1151b795e9b200b2aec48ef61846024";
    

    fetch(cityWeatherUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(weatherRes) {
          console.log(weatherRes);
         

        //display results
        var cityTemp = weatherRes.current.temp;
        var cityHum = weatherRes.current.humidity;
        var date = Date();
        var uvi = weatherRes.current.uvi;
        var icon = weatherRes.current.weather[0].icon;
        var wind = weatherRes.current.wind_speed;

        var daily = weatherRes.daily[0].temp.day;

        var resultBody = document.createElement('div');
        var titleEl = document.createElement('h3');
        var dateEl = document.createElement('h3');
        var tempEl = document.createElement('h4');
        var humEl = document.createElement('h4');
        var uviEl = document.createElement('h4');
        var iconEl = document.createElement('img');
        var windEl = document.createElement('h4');

        resultContentEl.append(resultBody);

        titleEl.textContent = "City: " + cityQuery;
        resultBody.append(titleEl);

        dateEl.textContent = "Date: " + date;
        resultBody.append(dateEl);
 
        tempEl.textContent = "Current temperature: " + cityTemp + " degrees farenheit";
        resultBody.append(tempEl);

        humEl.textContent = "Humidity: " + cityHum + "%";
        resultBody.append(humEl);

        windEl.textContent = "Windspeed: " + wind;
        resultBody.append(windEl);

        uviEl.textContent = "UVI: " + uvi;
        resultBody.append(uviEl);

      //link for icon image
        iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        resultBody.append(iconEl);


        //5-day forecast

      var fiveDayResult = document.querySelector(".five-result-content");


// 5-day forecast 
      for (var i=0; i < 5; i++) {

        var fiveDayResultEl = document.createElement ('h3');
        fiveDayResultEl.textContent = "Weather: " + weatherRes.daily[i].temp.day;
        fiveDayResult.append(fiveDayResultEl);

      }

    

      
      }
      )
};      




















function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector ('#search-input').value;

    searchApi(searchInputVal);

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();