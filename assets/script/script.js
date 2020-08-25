// GLOBAL VARIABLES
const apiKey = "97d917361d591ae19840f10060b31839";
let cityName = $('.cityName');
let stateNameForm = $('.stateChoice');
const currentDate = moment().format("MMM" + " D, " + "YYYY");
// 5-day forecast variables
let forecastHeader = document.getElementsByClassName('5DayHeader');
let forecastIcon = document.getElementsByClassName('5DayIcon');
let forecastTemp = document.getElementsByClassName('5DayTemp');
let forecastHumid = document.getElementsByClassName('5DayHumid');

// search
// use prepend to keep histroy
// when user clicks search, value is prepended and displayed in history
// if they click on a city in the hitory, set it to form val()


$('#submitBtn').on('click', function (event) {
    event.preventDefault();


    


    // create url with city form value =========== ensure that units are in "imperial"
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName.val() + "&units=imperial&appid=" + apiKey;

    // main AJAX
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
        $('#mainTemp').text("Temperature: " + response.main.temp + " F");

        // Humidity
        $('#mainHumid').text("Humidity: " + response.main.humidity + "%");
        
        // Wind Speed
        $('#mainWind').text("Wind: " + response.wind.speed);

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

            // create HEADER DATES
            // day 1
            let forecastDate = (response.list[5].dt_txt).slice(0, 10);
            forecastHeader[0].textContent = forecastDate;
            // day 2
            let forecastDate2 = (response.list[13].dt_txt).slice(0, 10);
            forecastHeader[1].textContent = forecastDate2;
            // day 3
            let forecastDate3 = (response.list[21].dt_txt).slice(0, 10);
            forecastHeader[2].textContent = forecastDate3;
            // day 4
            let forecastDate4 = (response.list[29].dt_txt).slice(0, 10);
            forecastHeader[3].textContent = forecastDate4;
            // day 5
            let forecastDate5 = (response.list[37].dt_txt).slice(0, 10);
            forecastHeader[4].textContent = forecastDate5;
            
            // create ICONS
            // day 1
            let iconUrl = "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png"
            forecastIcon[0].setAttribute('src', iconUrl);
            // day 2
            let iconUrl2 = "http://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png"
            forecastIcon[1].setAttribute('src', iconUrl2);
            // day 3
            let iconUrl3 = "http://openweathermap.org/img/wn/" + response.list[21].weather[0].icon + "@2x.png"
            forecastIcon[2].setAttribute('src', iconUrl3);
            // day 4
            let iconUrl4 = "http://openweathermap.org/img/wn/" + response.list[29].weather[0].icon + "@2x.png"
            forecastIcon[3].setAttribute('src', iconUrl4);
            // day 5
            let iconUrl5 = "http://openweathermap.org/img/wn/" + response.list[37].weather[0].icon + "@2x.png"
            forecastIcon[4].setAttribute('src', iconUrl5);
            
            // create TEMPERATURES
            // day 1
            let forecastTempResponse = (response.list[5].main.temp);
            forecastTemp[0].textContent = "Temp: " + forecastTempResponse + " F";
            // day 2
            let forecastTempResponse2 = (response.list[13].main.temp);
            forecastTemp[1].textContent = "Temp: " + forecastTempResponse2 + " F";
            // day 3
            let forecastTempResponse3 = (response.list[21].main.temp);
            forecastTemp[2].textContent = "Temp: " + forecastTempResponse3 + " F";
            // day 4
            let forecastTempResponse4 = (response.list[29].main.temp);
            forecastTemp[3].textContent = "Temp: " + forecastTempResponse4 + " F";
            // day 5
            let forecastTempResponse5 = (response.list[37].main.temp);
            forecastTemp[4].textContent = "Temp: " + forecastTempResponse5 + " F";

            // create HUMIDITY
            // day 1
            let forecastHumidityResponse = (response.list[5].main.humidity);
            forecastHumid[0].textContent = "Humidity: " + forecastHumidityResponse + "%";
            // day 2
            let forecastHumidityResponse2 = (response.list[13].main.humidity);
            forecastHumid[1].textContent = "Humidity: " + forecastHumidityResponse2 + "%";
            // day 3
            let forecastHumidityResponse3 = (response.list[21].main.humidity);
            forecastHumid[2].textContent = "Humidity: " + forecastHumidityResponse3 + "%";
            // day 4
            let forecastHumidityResponse4 = (response.list[29].main.humidity);
            forecastHumid[3].textContent = "Humidity: " + forecastHumidityResponse4 + "%";
            // day 5
            let forecastHumidityResponse5 = (response.list[37].main.humidity);
            forecastHumid[4].textContent = "Humidity: " + forecastHumidityResponse5+ "%";

        }).catch(function(error) {
            console.log(error);
        });   
                
        // .catch function for any errors that may occur
    }).catch(function(error) {
        console.log(error);
    });


})
