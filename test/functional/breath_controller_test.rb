require 'test_helper'

class BreathControllerTest < ActionController::TestCase
  test "index" do
    get :index
    assert_response :success
  end

  test "check" do
    get :check, temp: 10, humidity: 80
    assert_response :success
    assert_equal "YES", @response.body

    get :check, temp: 25, humidity: 80
    assert_response :success
    assert_equal "NO", @response.body

    # Missing humidity (sets to 0)
    get :check, temp: 10
    assert_response :success
    assert_equal "NO", @response.body

    # Missing temp (sets to 0)
    get :check, humidity: 80
    assert_response :success
    assert_equal "YES", @response.body
  end
end
