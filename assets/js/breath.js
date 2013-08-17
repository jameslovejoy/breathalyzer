breathalyzer.breath = {};

breathalyzer.breath.see = function(weatherdata, callback) {

	$.get("assets/data/chart.json", function(chart) {
		var temp_c = Math.round(weatherdata.main.temp);
		var humidity = weatherdata.main.humidity;

		// Tweak formula
		temp_c += 3;
		humidity -= 10;

		callback(chart[temp_c] && chart[temp_c][humidity] ? "YES" : "NO");
	});

};