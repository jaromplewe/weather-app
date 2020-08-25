// GLOBAL VARIABLES
const apiKey = "97d917361d591ae19840f10060b31839";
let cityName = $('.cityName');
let stateNameForm = $('.stateChoice');
const currentDate = moment().format("MMM" + " D, " + "YYYY");

// search
// use prepend to keep histroy
// when user clicks search, value is prepended and displayed in history
// if they click on a city in the hitory, set it to form val()


$('#submitBtn').on('click', function (event) {
    event.preventDefault();


    // create url with city form value =========== ensure that units are in "imperial"
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName.val() + "&units=imperial&appid=" + apiKey;

    // AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
        // .then run the function to append everything to the page -------- might have to use moment.js
    }).then(function(response) {
        // console.log(response)

        // MAIN CARD
        // city and date in an h2 el
        $('#cityDateDis').text(response.name + " - " + currentDate);
        
        // temperature
        $('#mainTemp').text("Temperature: " + response.main.temp);

        // Humidity
        $('#mainHumid').text("Humidity: " + response.main.humidity);
        
        // Wind Speed
        $('#mainWind').text("wind: " + response.wind.speed);

        // UV Index
        // set lat and lon and create UV index URL
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        let uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
        // GET and append UV index to the main card
        $.ajax({
            url: uvUrl,
            method: "GET"
        }).then(function(response) {
            $('#mainUV').text(response.value);
        }).catch(function(error) {
            console.log(error);
        });


        // 5-DAY FORECAST
        // create url for 5-day forecast
        let forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName.val() + "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: forecastUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            // date header
            let next5DaysArr = [2, 10, 18, 26, 34];
            for (let i=0; i<next5DaysArr.length; i++) {
                let dateString = (response.list[i].dt_txt).slice(0, 10);
                console.log(dateString);
            }
            // emoji for weather
            // Temp
            // Humidity
        }).catch(function(error) {
            console.log(error);
        });
        
                
                
        // .catch function for any errors that may occur
    }).catch(function(error) {
        console.log(error);
    });


})




        
        

// !!!!!don't forget to ignoreDefault for the submit button!!!!