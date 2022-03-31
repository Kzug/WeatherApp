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


function searchApi (cityQuery) {
    var cityQueryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityQuery + "&appid=a1151b795e9b200b2aec48ef61846024";

    fetch(cityQueryUrl)
      .then(function (response) {
          return response.json();
      })
      .then(function(queryRes) {
          console.log(queryRes[0].lat);
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