$(document).ready(function () {
  function searchCityWeather(cityname) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityname +
      "&units=imperial&appid=3f40f6c653ada73b131b1bb93e6ed9c3";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      let today = moment().format("MMMM Do YYYY");
      console.log(today);
      let tomorrow = moment().add(1, "days").format("L");
      console.log(tomorrow);
      let tomorrow2 = moment().add(2, "days").format("L");
      console.log(tomorrow2);
      let tomorrow3 = moment().add(3, "days").format("L");
      console.log(tomorrow3);
      let tomorrow4 = moment().add(4, "days").format("L");
      console.log(tomorrow4);
      let tomorrow5 = moment().add(5, "days").format("L");
      console.log(tomorrow5);

      var CurrentCity = $("<h1>").text(response.name + ": " + today);
      var currentTemp = $("<h3>").text(
        "Temperature: " + response.main.temp + "°F"
      );

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
        "&exclude=hourly, minutely&units=imperial&appid=3f40f6c653ada73b131b1bb93e6ed9c3";

      $.ajax({
        url: queryURL1,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var uVindex = $("<h3>").text("UV Index: " + response.current.uvi);
        var getIcon = response.daily[2].weather[0].icon;
        var getURL = "http://openweathermap.org/img/w/" + getIcon + ".png"
        var dayOne = $("<p>").text("Temperature: " + response.daily[1].temp.day + "°F " + "Humidity: " + response.daily[1].humidity + "%");
        var dayTwo = $("<p>").text("Temperature: " + response.daily[2].temp.day + "°F " + "Humidity: " + response.daily[2].humidity + "%");
        var dayThree = $("<p>").text("Temperature: " + response.daily[3].temp.day + "°F " + "Humidity: " + response.daily[3].humidity + "%");
        var dayFour = $("<p>").text("Temperature: " + response.daily[4].temp.day + "°F " + "Humidity: " + response.daily[4].humidity + "%");
        var dayFive = $("<p>").text("Temperature: " + response.daily[5].temp.day + "°F " + "Humidity: " + response.daily[5].humidity + "%");
        $("#date-one").append(tomorrow);
        $("#date-two").append(tomorrow2);
        $("#date-three").append(tomorrow3);
        $("#date-four").append(tomorrow4);
        $("#date-five").append(tomorrow5);
        $("#day-one").append(dayOne);
        $("#day-two").append(dayTwo);
        $("#day-three").append(dayThree);
        $("#day-four").append(dayFour);
        $("#day-five").append(dayFive);
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
    $(".card-header").empty();
  }
  $("#run-search").on("click", function (event) {
    event.preventDefault();
    clear();

    var inputCity = $("#search-city").val().trim();

    searchCityWeather(inputCity);
  });
});
