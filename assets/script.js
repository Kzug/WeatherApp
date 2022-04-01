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
    var cityWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=a1151b795e9b200b2aec48ef61846024";
    

    fetch(cityWeatherUrl)
      .then(function(response) {
          return response.json();
      })
      .then(function(weatherRes) {
          console.log(weatherRes);
      }
      )
      
        //display results
        var resultBody = document.createElement('div');
        var titleEl = document.createElement('h3');

        resultContentEl.append(resultBody);

        titleEl.textContent = "City: " + cityQuery;
        console.log (cityQuery);
        resultBody.append(titleEl);
};




















function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector ('#search-input').value;

    searchApi(searchInputVal);

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();