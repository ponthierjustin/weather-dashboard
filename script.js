$(document).ready(function () {
  function searchCityWeather(cityname) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=3f40f6c653ada73b131b1bb93e6ed9c3";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var CurrentCity = $("<h1>").text(response.name);
      var currentTemp = $("<h3>").text("Temperature: " + response.main.temp);
      var currentHumidity = $("<h3>").text(
        "Humidity: " + response.main.humidity
      );
      var currentWind = $("<h3>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );

      $("#city-info").append(
        CurrentCity,
        currentTemp,
        currentHumidity,
        currentWind
      );
    });
  }
  $("#run-search").on("click", function (event) {
    
    event.preventDefault();
    
    var inputCity = $("#search-city").val().trim();

    
    searchCityWeather(inputCity);
  });
});
