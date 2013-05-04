$(document).ready(function() {
    var checkBreath = function(weatherdata) {
      $.get("/breath/check?temp=" + weatherdata.temp_c + "&humidity=" + weatherdata.humidity, function(seebreath) {
        $("td.location").html(weatherdata.place_name || latitude + " " + longitude);
        $("td.temp").html(weatherdata.temp_f + "&deg;F");
        $("td.humidity").html(weatherdata.humidity + "%");
        $("p.seebreath").html(seebreath).removeClass("yes no").addClass(seebreath.toLowerCase());
        $("div.loading").hide();
      });
    };

    $("#change-location").on("click", function() {
      $(this).parent("div").hide();

      var form = $("#change-location-form");
      var input = form.find("input[type='text']");

      form.show();
      input.focus();
    });

    $("#geolocate").on("click", function() {
      useBrowserLocation();
    });

    var useQueryLocation = function(location) {
      $.get("/weather/?location=" + location, function(weatherdata) {
        checkBreath(weatherdata);
      }, 'json');
    };

    var useBrowserLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;

          $.get("/weather/?lat=" + latitude + "&long=" + longitude, function(weatherdata) {
            checkBreath(weatherdata);
          }, 'json');
        });
      }
    };

    var $custom_location = $("#customLocation");

    if( $custom_location.text() != "" ) {
      useQueryLocation( $custom_location.text() );
    } else {
      useBrowserLocation();
    }

});