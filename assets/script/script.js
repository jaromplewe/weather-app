// GLOBAL VARIABLES
const apiKey = "97d917361d591ae19840f10060b31839";
let cityNameForm = $('.cityName');
let stateNameForm = $('.stateChoice');
// search
// use prepend to keep histroy
// when user clicks search, value is prepended and displayed in history
// if they click on a city in the hitory, set it to form val()

$('#submitBtn').on('click', function (event) {
    event.preventDefault();


    // create url with city form value
    let cityName = cityNameForm.val();
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    // AJAX
    $.ajax({
        url: queryURL,
        method: "GET"
        // .then run the function to append everything to the page -------- might have to use moment.js
    }).then(function(response) {

        // main card
            // city and date in an h2 el
            
            // temperature in a p el
            // Humidity in a p el
            // Wind Speed in a p el
            // UV Index in a p el

        // .catch function for any errors that may occur
    }).catch(function(error) {
        console.log(error);
    });


})




        
        // 5-day forecast
            // 5 cards with the folowing info:
                // date header
                // emoji for weather
                // Temp
                // Humidity

// !!!!!don't forget to ignoreDefault for the submit button!!!!