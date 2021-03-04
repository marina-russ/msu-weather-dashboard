// * 1) User searches a city
      // * city is shown in a search history
      // * user can click on search history to return to a city

// * 2) Pull weather API data from said city
      // ? Display today's data
      // * Display 5-day forecast
      // * Have icon change based on type of weather
      // * Have UV rating color change based on level

const api = {
  key: 'f1955bf6ba835a266ab0e914ca296be6',
  base: 'https://api.openweathermap.org/data/2.5/',
};

let button = document.querySelector('.button');
//! let cityInput = document.querySelector('.input-text');

// * ESTABLISH DATE

// links javascript to html weather data
let city = document.querySelector('.city-name');
let desc = document.querySelector('.city-desc-today');
let temp = document.querySelector('.city-temp-today');
let humid = document.querySelector('.city-humid-today');
let wind = document.querySelector('.city-wind-today');

// sets javascript date & time
let todayDate = document.querySelector('.today-date');
let todayTime = document.querySelector('.today-time');
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1; // array starts at zero
let y = today.getFullYear();
let hh = today.getHours();
let min = today.getMinutes(); 

// formats date & time
let formattedDate = dd + '/' + mm + '/' + y;
console.log(formattedDate);
let formattedTime = hh + ":" + min;
console.log(formattedTime);

// sends fetch request on button click
button.addEventListener('click', function(){
  // FIXME: WHY won't template literal work for the city???
  //! fetch(`${api.base}weather?q=${cityInput}&units=imperial&appid=${api.key}`)

  // * TODAY'S FORECAST

  // fetch request for today's forecast
  fetch(`${api.base}weather?q=Detroit&units=imperial&appid=${api.key}`)
  // converts promise response into JSON object
  .then(response => response.json())
  // transfers API data from JSON object to code
  .then(data => {
    let cityName = data.name;
    let cityDesc = data.weather[0].description;
    let cityTemp = data.main.temp;
    let cityHumid = data.main.humidity;
    let cityWind = data.wind.speed;
      console.log(data);

    city.innerHTML = cityName;
    todayDate.innerHTML = dd + '/' + mm;
    todayTime.innerHTML = formattedTime;
    desc.innerHTML = "Today: " + cityDesc;
    temp.innerHTML = "Temperature: " + cityTemp;
    humid.innerHTML = "Humidity: " + cityHumid;
    wind.innerHTML = "Wind Speed: " + cityWind;
  });

  // * 5-DAY FORECAST

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


  // fetch request for 5-day forecast
  fetch(`${api.base}forecast?q=Detroit&units=imperial&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      let futureTempData1 = data.list[3].main.temp;
      let futureHumidData1 = data.list[3].main.humidity;
      let futureTempData2 = data.list[11].main.temp;
      let futureHumidData2 = data.list[11].main.humidity;
      let futureTempData3 = data.list[19].main.temp;
      let futureHumidData3 = data.list[19].main.humidity;
      let futureTempData4 = data.list[27].main.temp;
      let futureHumidData4 = data.list[27].main.humidity;
      let futureTempData5 = data.list[35].main.temp;
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


//TODO: alert wrong city name
//.catch(err => alert("That's not a city name!"));
});



// ! PROBLEMS TO SOLVE:

// * How do I increase date for 5-day forecast?
// * let day1 = dd+1, let day2 = dd+2, etc?
    // * then would i make an if statement for 30th/31st?


// * How do I round the temperature to an integer?
  // * do I just need to do parseInt()?


