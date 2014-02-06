breathalyzer.breath = {};

breathalyzer.breath.see = function(weatherdata, callback) {

	$.get("assets/data/chart.json", function(chart) {
		var temp_c = Math.round(weatherdata.main.temp);
		var humidity = weatherdata.main.humidity;

		// Tweak formula
		temp_c += 3;
		humidity -= 10;

		var result = chart[temp_c] && chart[temp_c][humidity];
		var string_response;

		if(temp_c < 0) {
			string_response = "YES";
		} else {
			string_response = result ? "YES" : "NO";
		}

		callback(string_response);
	});

};