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
				breathalyzer.breath.see(weatherdata, function(seebreath) {

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
	var temp_f = Math.round(weatherdata.main.temp * 9/5 + 32);
	$("td.location").html(weatherdata.name || latitude + " " + longitude);
	$("td.temp").html(temp_f + "&deg;F");
	$("td.humidity").html(weatherdata.main.humidity + "%");
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