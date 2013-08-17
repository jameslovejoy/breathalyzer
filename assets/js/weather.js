breathalyzer.weather = {};

breathalyzer.weather.URL = "http://api.openweathermap.org/data/2.5/weather?units=metric";

breathalyzer.weather.getLatLon = function(lat, lon, callback) {

	var url = breathalyzer.weather.URL + "&lat=" + lat + "&lon=" + lon;

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