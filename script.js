$(document).ready(function () {
  function searchCityWeather(cityname) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityname +
      "&appid=3f40f6c653ada73b131b1bb93e6ed9c3";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      var CurrentCity = $("<h1>").text(response.name);
      var currentTemp = $("<h3>").text("Temperature: " + response.main.temp);

      var currentHumidity = $("<h3>").text(
        "Humidity: " + response.main.humidity + "%"
      );
      var currentWind = $("<h3>").text(
        "Wind Speed: " + response.wind.speed + " MPH"
      );
      var grabLat = response.coord.lat;
      var grabLon = response.coord.lon;
      var queryURL1 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        grabLat +
        "&lon=" +
        grabLon +
        "&exclude=hourly, minutely&appid=3f40f6c653ada73b131b1bb93e6ed9c3";

      $.ajax({
        url: queryURL1,
        method: "GET",
      }).then(function (response) {
        console.log(response);

        var uVindex = $("<h3>").text("UV Index: " + response.current.uvi);

        var dayOne = $("<p>").text("Temperature: " + response.daily[1].temp.day);
        var dayTwo = $("<p>").text("Temperature: " + response.daily[2].temp.day);
        var dayThree = $("<p>").text("Temperature: " + response.daily[3].temp.day);
        var dayFour = $("<p>").text("Temperature: " + response.daily[4].temp.day);
        var dayFive = $("<p>").text("Temperature: " + response.daily[5].temp.day);
        var dayOneH = $("<p>").text("Humidity: " + response.daily[1].humidity + "%");
        var dayTwoH = $("<p>").text("Humidity: " + response.daily[2].humidity + "%");
        var dayThreeH = $("<p>").text("Humidity: " + response.daily[3].humidity + "%");
        var dayFourH = $("<p>").text("Humidity: " + response.daily[4].humidity + "%");
        var dayFiveH = $("<p>").text("Humidity: " + response.daily[5].humidity + "%");

        $("#day-one").append(dayOne, dayOneH);
        $("#day-two").append(dayTwo, dayTwoH);
        $("#day-three").append(dayThree, dayThreeH);
        $("#day-four").append(dayFour, dayFourH);
        $("#day-five").append(dayFive, dayFiveH);
        $("#city-info").append(
          CurrentCity,
          currentTemp,
          currentHumidity,
          currentWind,
          uVindex
        );
      });
    });
  }

  function clear() {
    $("#city-info").empty();
    $(".card-text").empty();
  }
  $("#run-search").on("click", function (event) {
    event.preventDefault();
    clear();

    var inputCity = $("#search-city").val().trim();

    searchCityWeather(inputCity);
  });
});
