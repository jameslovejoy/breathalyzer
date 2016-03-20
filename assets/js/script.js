breathalyzer = {};

breathalyzer.init = function() {

	breathalyzer.useBrowserLocation();
	breathalyzer.enableChangeLocation();

};

breathalyzer.useBrowserLocation = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			breathalyzer.weather.getLatLon(latitude, longitude, function(weatherdata) {
				var temp_c = Math.round(weatherdata.currently.temperature);
				var humidity = weatherdata.currently.humidity * 100;

				breathalyzer.breath.see(temp_c, humidity, function(seebreath) {

					breathalyzer.output(weatherdata, seebreath);

				});
			});
		});
	}
};

breathalyzer.useQueryLocation = function(query) {

	breathalyzer.weather.getQuery(query, function(weatherdata) {
		breathalyzer.breath.see(weatherdata, function(seebreath) {
			breathalyzer.output(weatherdata, seebreath);
		})
	});

};

breathalyzer.output = function(weatherdata, seebreath) {

	// Display results
	var temp_f = Math.round(weatherdata.currently.temperature * 9/5 + 32);
	$("td.location").html(Math.round(weatherdata.latitude * 1000)/1000.0 + ", " + Math.round(weatherdata.longitude * 1000)/1000.0);
	$("td.temp").html(temp_f + "&deg;F");
	$("td.humidity").html(weatherdata.currently.humidity * 100 + "%");
	$("p.seebreath").html(seebreath).removeClass("yes no").addClass(seebreath.toLowerCase());
	$("div.loading").hide();

};

breathalyzer.enableChangeLocation = function() {

	var $form = $("#change-location-form");
	var $input = $form.find("input[type='text']");
	var $div = $("div.location");

	$("#change-location").show().on("click", function() {
		$div.hide();
		$form.show();
		$input.select();
	});

	$form.on("submit", function(e) {
		e.preventDefault();

		var query = $input.val();

		if( query != "" ) {
			breathalyzer.useQueryLocation( query );
			$div.show();
			$form.hide();
			$input.blur();
		} else {
			breathalyzer.useBrowserLocation();
		}
	})

};

$(document).ready(function() {

	breathalyzer.init();

});