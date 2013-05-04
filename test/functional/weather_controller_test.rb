require 'test_helper'

class WeatherControllerTest < ActionController::TestCase
  test "index no params" do
    get :index, format: :json
    assert_response :success
    response = JSON.parse(@response.body)

    assert_not_nil response["humidity"]
    assert_not_nil response["temp_c"]
    assert_not_nil response["temp_f"]
    assert_not_nil response["place_name"]
    assert_equal "San Francisco, CA", response["place_name"]
  end

  test "index lat long" do
    get :index, lat: '37.80804124352837', long: '-122.26918945331106', format: :json
    assert_response :success
    response = JSON.parse(@response.body)

    assert_not_nil response["humidity"]
    assert_not_nil response["temp_c"]
    assert_not_nil response["temp_f"]
    assert_not_nil response["place_name"]
    assert_equal "Oakland, CA", response["place_name"]
  end

  test "index location city name" do
    get :index, location: "Muskego", format: :json
    assert_response :success
    response = JSON.parse(@response.body)

    assert_not_nil response["humidity"]
    assert_not_nil response["temp_c"]
    assert_not_nil response["temp_f"]
    assert_not_nil response["place_name"]
    assert_equal "Muskego, WI", response["place_name"]
  end

  test "index location zip code" do
    get :index, location: "22201", format: :json
    assert_response :success
    response = JSON.parse(@response.body)

    assert_not_nil response["humidity"]
    assert_not_nil response["temp_c"]
    assert_not_nil response["temp_f"]
    assert_not_nil response["place_name"]
    assert_equal "Arlington, VA", response["place_name"]
  end

  test "index location bad location" do
    get :index, location: "999999", format: :json
    assert_response :success
    response = JSON.parse(@response.body)

    assert_equal 0, response["humidity"]
    assert_nil response["temp_c"]
    assert_nil response["temp_f"]
    assert_not_nil response["place_name"]
    assert_equal "Bad Location", response["place_name"]
  end
end
