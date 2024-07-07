var searchField = document.querySelector("#searchtxt");
let wData;
let displayCurrentLocationStatus = true;
let userLocation = {};
navigator.geolocation.getCurrentPosition(getPosition);

function getPosition(position) {
    userLocation.lat = position.coords.latitude;
    userLocation.lon = position.coords.longitude;
    displayCurrentLocationStatus = true;
    getWeatherData();
}

var getCurrentLocBtn = document.querySelector("#currentLocBtn");
getCurrentLocBtn.addEventListener("click", getMyPosition);
function getMyPosition(){
    navigator.geolocation.getCurrentPosition(getPosition);
}

searchField.addEventListener("keyup", getWeatherData);
async function getWeatherData() {
    let Response;
    if (userLocation.lat && userLocation.lon & displayCurrentLocationStatus) {
        Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bcf7518618aa4bb4aa2115432240507&days=3&q=${userLocation.lat},${userLocation.lon}`);
        displayCurrentLocationStatus = false;
    } else {
        Response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bcf7518618aa4bb4aa2115432240507&days=3&q=${searchField.value}`);
    }

    if (Response.ok) {
        wData = await Response.json();
        displayTodayData();
        displayOtherData();
    } else {
        console.error('Failed to fetch weather data:', Response.status);
    }
    
}

var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//today
var todayDay = document.querySelector(".today .forecast-header .day");
var todayDate = document.querySelector(".today .forecast-header .date");
var locName = document.querySelector(".today .forecast-body .location");
var deg = document.querySelector(".today .forecast-body .degree");
var skyIcon = document.querySelector(".today .forecast-body .sky-icon");
var sky = document.querySelector(".today .forecast-body .sky");


//next day
var nextDay = document.querySelector(".next .forecast-header .day");
var nextSkyIcon = document.querySelector(".next .forecast-body .sky-icon");
var nextDeg = document.querySelector(".next .forecast-body .degree");
var nextMin_Deg = document.querySelector(".next .forecast-body .min-degree");
var nextSky = document.querySelector(".next .forecast-body .sky");

//last day
var lastDay = document.querySelector(".last .forecast-header .day");
var lastSkyIcon = document.querySelector(".last .forecast-body .sky-icon");
var lastDeg = document.querySelector(".last .forecast-body .degree");
var lastMin_Deg = document.querySelector(".last .forecast-body .min-degree");
var lastSky = document.querySelector(".last .forecast-body .sky");


function displayTodayData() {
    var currentTime = new Date(`${wData.forecast.forecastday[0].date}`)
    // header
    todayDay.innerHTML = `${dayNames[currentTime.getDay()]}`;
    todayDate.innerHTML = `${currentTime.getDate()}${monthNames[currentTime.getMonth()]}`;
    //body
    locName.innerHTML = `${wData.location.name}`;
    deg.innerHTML = `${wData.current.temp_c}<sup>o</sup>C`;
    skyIcon.innerHTML = `<img src="https:${wData.current.condition.icon}" alt="">`;
    sky.innerHTML = `${wData.current.condition.text}`;
}

function displayOtherData(){
    //**next**//
    var nextDayTime = new Date(`${wData.forecast.forecastday[1].date}`)
    //header
    nextDay.innerHTML = `${dayNames[nextDayTime.getDay()]}`;
    //body
    nextSkyIcon.innerHTML = `<img src="https:${wData.forecast.forecastday[1].day.condition.icon}" alt="">`;
    nextDeg.innerHTML = `${wData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C`;
    nextMin_Deg.innerHTML = `${wData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>`;
    nextSky.innerHTML = `${wData.forecast.forecastday[1].day.condition.text}`;

    //**last**//
    var lastDayTime = new Date(`${wData.forecast.forecastday[2].date}`)
    //header
    lastDay.innerHTML = `${dayNames[lastDayTime.getDay()]}`;
    //body
    lastSkyIcon.innerHTML = `<img src="https:${wData.forecast.forecastday[2].day.condition.icon}" alt="">`;
    lastDeg.innerHTML = `${wData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C`;
    lastMin_Deg.innerHTML = `${wData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>`;
    lastSky.innerHTML = `${wData.forecast.forecastday[2].day.condition.text}`;
}
