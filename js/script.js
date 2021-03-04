// * 1) User searches a city
      // * city is shown in a search history
      // * user can click on search history to return to a city

// * 2) Pull weather API data from said city
      // ? Display today's data
      // ? Display 5-day forecast
      // * Display 8/16, 8/17, 8/18 etc
      // * Have icon change based on type of weather
      // * Have UV rating color change based on level

// TODO: add feature that shows weather alerts? 

const api = {
  key: 'f1955bf6ba835a266ab0e914ca296be6',
  base: 'https://api.openweathermap.org/data/2.5/',
};

let button = document.querySelector('.button');
let input = document.querySelector('.input-text');

// * ESTABLISH DATE

// links javascript to html elements on weather
let city = document.querySelector('.city-name');
let desc = document.querySelector('.city-desc-today');
let temp = document.querySelector('.city-temp-today');
let humid = document.querySelector('.city-humid-today');
let wind = document.querySelector('.city-wind-today');
let uvi = document.querySelector('.city-uv-today');

// sets javascript date
let todayDate = document.querySelector('.today-date');
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; // array starts at zero
let y = today.getFullYear();
// formats date & time
let formattedDate = dd + '/' + mm + '/' + y;
console.log(formattedDate);

// sends fetch request on button click
button.addEventListener('click', function(){
  // FIXME: WHY won't template literal work for the city???
  //! fetch(`${api.base}weather?q=${cityInput}&units=imperial&appid=${api.key}`)

  // * TODAY'S FORECAST

  // sends fetch request for today's forecast; converts promise response into JSON object; transfers API data from JSON object to code
  fetch(`${api.base}weather?q=Detroit&units=imperial&appid=${api.key}`)
  .then(response => response.json())
  .then(data => {
    let cityName = data.name;
    let cityDesc = data.weather[0].description;
    let cityTemp = data.main.temp;
    let cityHumid = data.main.humidity;
    let cityWind = data.wind.speed;
    
    let cityLat = data.coord.lat;
    let cityLon = data.coord.lon;

    //! how do i return values outside this fxn? is this right?
    let lat = latitude;
    let lon = longitude

    console.log(data);

    //replaces inner HTML with API data
    todayDate.innerHTML = dd + '/' + mm;
    city.innerHTML = cityName;
    desc.innerHTML = "Today: " + cityDesc;
    temp.innerHTML = "Temperature: " + parseInt(cityTemp) + "°F";
    humid.innerHTML = "Humidity: " + cityHumid + "%";
    wind.innerHTML = `<b>Wind Speed</b>: ${cityWind} MPH`
  });

  // * 5-DAY FORECAST

  // links javascript to html
  let futureTemp1 = document.querySelector('.future-temp-day1');
  let futureHumid1 = document.querySelector('.future-humid-day1');
  let futureTemp2 = document.querySelector('.future-temp-day2');
  let futureHumid2 = document.querySelector('.future-humid-day2');
  let futureTemp3 = document.querySelector('.future-temp-day3');
  let futureHumid3 = document.querySelector('.future-humid-day3');
  let futureTemp4 = document.querySelector('.future-temp-day4');
  let futureHumid4 = document.querySelector('.future-humid-day4');
  let futureTemp5 = document.querySelector('.future-temp-day5');
  let futureHumid5 = document.querySelector('.future-humid-day5');

  // sends fetch request for 5-day forecast
    // FIXME: WHY won't template literal work for the city???
  fetch(`${api.base}forecast?q=Detroit&units=imperial&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      let futureTempData1 = parseInt(data.list[3].main.temp);
      let futureHumidData1 = data.list[3].main.humidity;
      let futureTempData2 = parseInt(data.list[11].main.temp);
      let futureHumidData2 = data.list[11].main.humidity;
      let futureTempData3 = parseInt(data.list[19].main.temp);
      let futureHumidData3 = data.list[19].main.humidity;
      let futureTempData4 = parseInt(data.list[27].main.temp);
      let futureHumidData4 = data.list[27].main.humidity;
      let futureTempData5 = parseInt(data.list[35].main.temp);
      let futureHumidData5 = data.list[35].main.humidity;
      console.log(data);

      futureTemp1.innerHTML = "Temperature: " + futureTempData1 + "°F";
      futureHumid1.innerHTML = "Humidity: " + futureHumidData1 + "%";
      futureTemp2.innerHTML = "Temperature: " + futureTempData2 + "°F";
      futureHumid2.innerHTML = "Humidity: " + futureHumidData2 + "%";
      futureTemp3.innerHTML = "Temperature: " + futureTempData3 + "°F";
      futureHumid3.innerHTML = "Humidity: " + futureHumidData3 + "%";
      futureTemp4.innerHTML = "Temperature: " + futureTempData4 + "°F";
      futureHumid4.innerHTML = "Humidity: " + futureHumidData4 + "%";
      futureTemp5.innerHTML = "Temperature: " + futureTempData5 + "°F";
      futureHumid5.innerHTML = "Humidity: " + futureHumidData5 + "%";
  });

//TODO: alert for wrong city names
//.catch(err => alert("That's not a city name!"));
});

//TODO: if statements for UV index & weather icons
// info on UV index:
// https://www.epa.gov/sunsafety/uv-index-scale-0

// * UV INDEX
// TODO: need to pull lat/lon from Today's Forecast fetch request

fetch(`${api.base}onecall?lat=${lat}&lon=${lon}&exclude={minutely}&units=imperial&appid=${api.key}`)
  .then(response => response.json())
  .then(data => {
    let uvIndex = data.list[4].uvi.value //"current" is 5th item in array
    uvIndex.innerHTML = document.getElementsByClassName("city-uvi-today");
  });

// ? UVI levels and <span> badge colors to use:

/*
green, 1-2, #198754
yellow, 3-5, #ffc107; want .text-dark added
orange, 6-7, #fd7e14; want .text-dark added
red, 8-10, #dc3545
purple, 11, #6f42c1
*/

// ! PROBLEMS TO SOLVE:

// ! How do I increase date for 5-day forecast?
// ! let day1 = dd+1, let day2 = dd+2, etc?
// ! dd++ will also run into below issue
    // ! then would i make an if statement for 30th/31st?

// * SEARCH FOR A CITY
      // * city is shown in a search history
      // * user can click on search history to return to a city

// create an array to store search history
let searchHistoryArray = [];
// display search history in <ul> list
let searchList = document.getElementById('search-list'); // <ul>

// * Event listener to set localStorage
// stops page reload on submit, passes input value to lookupCity(), then empties the input search field
input.addEventListener('submit', function(event) {
  event.preventDefault();
  setLocalStorage(input);
  input.value = '';
});

// * sets localStorage
// places input value into the fetch API link??
// saves to local storage; finally pass array to renderHistory() so that it can be shown on screen
function setLocalStorage() {
  searchHistoryArray.push(input);
  // do not need to use JSON.stringify here because user input is already a string
  localStorage.setItem('citySearchHistory', searchHistoryArray)
  renderHistory(searchHistoryArray);
};

// * gets localStorage
// grab cityHistory value. if value exists, parse back into array, send to render
function getLocalStorage() {
  const cityHistory = localStorage.getItem('searchHistoryArray');
    if (cityHistory) {
      searchHistoryList = JSON.parse(cityHistory);
      renderHistory(searchHistoryList);
    }
}

// * displays search history in a list
function renderHistory() {
  // clears existing <ul> so we don't duplicate stuff, then forEach()
  searchList.innerHTML = '';
  
  // runs through each item, creates new <li>, then appends to <ul>
  searchHistoryArray.forEach(function() {
    const liNewEl = document.createElement('li');
    liNewEl.innerHTML = `
    <li class="list-group-item search-city">${historyListCityName}</li>
    `;
//! define hLCN; also need to add <a> or something to innerHTML so a click searches again for city
    searchList.append(liNewEl);
  }); 
}

// * use search history to search info for a city again

// ! TODO








