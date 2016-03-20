breathalyzer.breath = {};

breathalyzer.breath.see = function(temp_c, humidity, callback) {

	$.get("assets/data/chart.json", function(chart) {
		// Tweak formula
		temp_c += 4;
		humidity -= 12;

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