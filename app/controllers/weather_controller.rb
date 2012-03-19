class WeatherController < ApplicationController
  def index
    if params[:lat] && params[:long]
      response = Net::HTTP.get(URI.parse("http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&lat=#{params[:lat]}&lng=#{params[:long]}"))
      results = ActiveSupport::JSON.decode(response)
      if results && results["postalCodes"]
        place_name = results["postalCodes"][0]["placeName"]
        location = results["postalCodes"][0]["postalCode"]
      end
    elsif params[:location]
      location = URI.escape params[:location]
    end

    weatherboy = Weatherboy.new(location)
    @weather = weatherboy.current
    respond_to do |format|
      format.html
      format.json { render :text => {:humidity   => @weather.relative_humidity.to_i,
                                     :temp_c     => @weather.temp_c,
                                     :temp_f     => @weather.temp_f,
                                     :place_name => place_name}.to_json }
    end
  end
end
