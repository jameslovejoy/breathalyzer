class WeatherController < ApplicationController
  def index
    if params[:lat] && params[:long]
      lat, long = URI.escape(params[:lat]), URI.escape(params[:long])
      response = Net::HTTP.get(URI.parse("http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&lat=#{lat}&lng=#{long}"))
      results = ActiveSupport::JSON.decode(response)
      if results && results["postalCodes"]
        place_name = %Q{#{results["postalCodes"][0]["placeName"]}, #{results["postalCodes"][0]["adminCode1"]}}
        location = results["postalCodes"][0]["postalCode"]
      end

    # Accepts city name or ZIP code
    elsif params[:location]
      location = URI.escape params[:location]
      if location.to_i.to_s == location # ZIP Code
        response = Net::HTTP.get(URI.parse("http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&postalcode=#{location}&country=US"))
      else
        response = Net::HTTP.get(URI.parse("http://ws.geonames.org/findNearbyPostalCodesJSON?formatted=true&placename=#{location}&country=US"))
      end

      results = ActiveSupport::JSON.decode(response)
      if results && results["postalCodes"]
        place_name = %Q{#{results["postalCodes"][0]["placeName"]}, #{results["postalCodes"][0]["adminCode1"]}}
      else
        place_name = "Bad Location"
      end

    # Default
    else
      place_name = "San Francisco, CA"
      location = URI.escape(place_name)
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
