class BreathController < ApplicationController
  def index
    
  end

  def check
    temp = params[:temp].to_i
    humidity = params[:humidity].to_i

    # Tweak the formula
    temp += 3
    humidity -= 10

    result = (CHART[temp] && CHART[temp][humidity]) ? "YES" : "NO"
    render :text => result
  end

end
