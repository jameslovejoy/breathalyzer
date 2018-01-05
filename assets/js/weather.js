breathalyzer.weather = {};

breathalyzer.weather.URL = "https://api.forecast.io/forecast/3871e8fde55080cb4e1d4a30e70cfdea/";

breathalyzer.weather.getLatLon = function(lat, lon, callback) {

	var url = breathalyzer.weather.URL + lat + "," + lon + "?units=si";

	$.get(url, function(data) {
			callback(data);
		}, 'jsonp');

};

breathalyzer.weather.getQuery = function(query, callback) {

	var url = breathalyzer.weather.URL + "&q=" + query;

	$.get(url, function(data) {
		callback(data);
	}, 'jsonp');

};