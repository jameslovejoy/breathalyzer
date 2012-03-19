$(document).ready(function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        $.get("/weather/?lat=" + latitude + "&long=" + longitude, function(weatherdata) {
          $.get("/breath/check?temp=" + weatherdata.temp_c + "&humidity=" + weatherdata.humidity, function(seebreath) {
            $("td.location").html(weatherdata.place_name || latitude + " " + longitude);
            $("td.temp").html(weatherdata.temp_f + "&deg;F");
            $("td.humidity").html(weatherdata.humidity + "%");
            $("p.seebreath").html(seebreath).addClass(seebreath.toLowerCase());
            $("div.loading").hide();
          });
        }, 'json');
      });
    }
});