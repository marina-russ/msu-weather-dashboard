// maybe also add feature that shows weather alerts? 

// ***** DATES
// ! for 5-day forecast, get format as SUN MAR 07
// this is a shortcut so I don't have to add luxon. to the beginning of everything
let DateTime = luxon.DateTime; 

// defines JS variables for luxon
let today = DateTime.local();
let f = {month: 'long', day: '2-digit'};
let m = today.get('monthShort');
let w = today.get('weekday');
// displays today's date
let dateOutput = document.getElementById('today-date');
dateOutput.textContent = "Today: " + today.toLocaleString(f, m, w);
console.log("date output", dateOutput);
// day 1
let dateOutputDay1 = document.querySelector('.day1');
let day1 = DateTime.now().plus({ days: 1});
dateOutputDay1.textContent = day1.toLocaleString(f, m, w);
// day 2
let dateOutputDay2 = document.querySelector('.day2');
let day2 = DateTime.now().plus({ days: 2 });
dateOutputDay2.textContent = day2.toLocaleString(f, m, w);
// day 3
let dateOutputDay3 = document.querySelector('.day3');
let day3 = DateTime.now().plus({ days: 3 });
dateOutputDay3.textContent = day3.toLocaleString(f, m, w);
// day 4
let dateOutputDay4 = document.querySelector('.day4');
let day4 = DateTime.now().plus({ days: 4 });
dateOutputDay4.textContent = day4.toLocaleString(f, m, w);
// day 5
let dateOutputDay5 = document.querySelector('.day5');
let day5 = DateTime.now().plus({ days: 5 });
dateOutputDay5.textContent = day5.toLocaleString(f, m, w);

// ***** ACCESS API
const api = {
  key: 'f1955bf6ba835a266ab0e914ca296be6',
  base: 'https://api.openweathermap.org/data/2.5/',
};
let button = document.querySelector('#search-button');

// ***** GET WEATHER INFO FROM API
const generateWeatherInfo = function (userInput) {
  // *** TODAY'S FORECAST API
  // sends fetch request for today's forecast; converts promise response data into JSON objects; transfers API data from JSON objects to new javascript variables
  fetch(`${api.base}weather?q=${userInput}&units=imperial&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      // links javascript to API data
      let cityName = data.name;
      let cityTemp = parseInt(data.main.temp);
      let cityHumid = data.main.humidity;
      let cityWind = data.wind.speed;
      let cityDesc = data.weather[0].description;
      let cityIcon = data.weather[0].icon;
      console.log("Today's weather: ", data);
      // links javascript to HTML elements
      let city = document.querySelector('#city-name');
      let temp = document.querySelector('#city-temp-today');
      let humid = document.querySelector('#city-humid-today');
      let wind = document.querySelector('#city-wind-today');
      let desc = document.querySelector('#city-desc-today');
      let icon = document.querySelector('.city-icon-today');
      // replaces javascript HTML element content with javascript API data
      city.innerHTML = cityName;
      icon.innerHTML = `<img src="assets/icons/${cityIcon}.png" class="city-icon-today"></img>`;
      temp.innerHTML = "Temperature: " + cityTemp + "°F";
      humid.innerHTML = "Humidity: " + cityHumid + "%";
      wind.innerHTML = `<b>Wind Speed</b>: ${cityWind} MPH`;
      desc.innerHTML = "Today: " + cityDesc;
      // lets us access lat+lon outside of this fxn, required for UV Index API to be successfully fetched further below
      let cityLat = data.coord.lat;
      let cityLon = data.coord.lon;
      let geolocation = {
        lat: cityLat,
        lon: cityLon
      };
      
      // *** 5-DAY FORECAST API
      // sends fetch request for 5-day forecast
      fetch(`${api.base}forecast?q=${userInput}&units=imperial&appid=${api.key}`)
        .then(response => response.json())
        .then(data => {
          // links javascript to API data
          // day 1
          let futureTempData1 = parseInt(data.list[3].main.temp);
          let futureHumidData1 = data.list[3].main.humidity;
          let futureDescData1 = data.list[3].weather[0].description;
          // day 2
          let futureTempData2 = parseInt(data.list[11].main.temp);
          let futureHumidData2 = data.list[11].main.humidity;
          let futureDescData2 = data.list[11].weather[0].description;
          // day 3
          let futureTempData3 = parseInt(data.list[19].main.temp);
          let futureHumidData3 = data.list[19].main.humidity;
          let futureDescData3 = data.list[19].weather[0].description;
          // day 4
          let futureTempData4 = parseInt(data.list[27].main.temp);
          let futureHumidData4 = data.list[27].main.humidity;
          let futureDescData4 = data.list[27].weather[0].description;
          // day 5
          let futureTempData5 = parseInt(data.list[35].main.temp);
          let futureHumidData5 = data.list[35].main.humidity;
          let futureDescData5 = data.list[35].weather[0].description;
          ////let futureIconData5 = data.list[35].weather[0].icon;
          console.log("5 day forecast: ", data);
          // links javascript to HTML elements
          // day 1
          let futureTemp1 = document.querySelector('.future-temp-day1');
          let futureHumid1 = document.querySelector('.future-humid-day1');
          let futureDesc1 = document.querySelector('.future-desc-day1');
          // day 2
          let futureTemp2 = document.querySelector('.future-temp-day2');
          let futureHumid2 = document.querySelector('.future-humid-day2');
          let futureDesc2 = document.querySelector('.future-desc-day2');
          // day 3
          let futureTemp3 = document.querySelector('.future-temp-day3');
          let futureHumid3 = document.querySelector('.future-humid-day3');
          let futureDesc3 = document.querySelector('.future-desc-day3');
          // day 4
          let futureTemp4 = document.querySelector('.future-temp-day4');
          let futureHumid4 = document.querySelector('.future-humid-day4');
          let futureDesc4 = document.querySelector('.future-desc-day4');
          // day 5
          let futureTemp5 = document.querySelector('.future-temp-day5');
          let futureHumid5 = document.querySelector('.future-humid-day5');
          let futureDesc5 = document.querySelector('.future-desc-day5');
          // replaces javascript HTML element content with javascript API data
          // day 1
          futureTemp1.innerHTML = "Temperature: " + futureTempData1 + "°F";
          futureHumid1.innerHTML = "Humidity: " + futureHumidData1 + "%";
          futureDesc1.innerHTML = "Forecast: " + futureDescData1;
          // day 2
          futureTemp2.innerHTML = "Temperature: " + futureTempData2 + "°F";
          futureHumid2.innerHTML = "Humidity: " + futureHumidData2 + "%";
          futureDesc2.innerHTML = "Forecast: " + futureDescData2;
          // day 3
          futureTemp3.innerHTML = "Temperature: " + futureTempData3 + "°F";
          futureHumid3.innerHTML = "Humidity: " + futureHumidData3 + "%";
          futureDesc3.innerHTML = "Forecast: " + futureDescData3;
          // day 4
          futureTemp4.innerHTML = "Temperature: " + futureTempData4 + "°F";
          futureHumid4.innerHTML = "Humidity: " + futureHumidData4 + "%";
          futureDesc4.innerHTML = "Forecast: " + futureDescData4;
          // day 5
          futureTemp5.innerHTML = "Temperature: " + futureTempData5 + "°F";
          futureHumid5.innerHTML = "Humidity: " + futureHumidData5 + "%";
          futureDesc5.innerHTML = "Forecast: " + futureDescData5;

          // ******** ICONS
          // links javascript to API data
          let futureIconData1 = data.list[3].weather[0].icon;
          let futureIconData2 = data.list[11].weather[0].icon;
          let futureIconData3 = data.list[19].weather[0].icon;
          let futureIconData4 = data.list[27].weather[0].icon;
          let futureIconData5 = data.list[35].weather[0].icon;
          ////console.log("futureIconData1: ", futureIconData1);
          ////console.log("futureIconData2: ", futureIconData2);
          // links javascript to HTML elements
          let futureIcon1 = document.querySelector('.future-icon-day1');
          let futureIcon2 = document.querySelector('.future-icon-day2');
          let futureIcon3 = document.querySelector('.future-icon-day3');
          let futureIcon4 = document.querySelector('.future-icon-day4');
          let futureIcon5 = document.querySelector('.future-icon-day5');
          ////console.log("futureIcon1: ", futureIcon1);
          ////console.log("futureIcon2: ", futureIcon2);
          // replaces javascript HTML element content with javascript API data
          futureIcon1.innerHTML = `<img src="assets/icons/${futureIconData1}.png" class="future-icon-day1"></img>`;
          futureIcon2.innerHTML = `<img src="assets/icons/${futureIconData2}.png" class="future-icon-day2"></img>`;
          futureIcon3.innerHTML = `<img src="assets/icons/${futureIconData3}.png" class="future-icon-day3"></img>`;
          futureIcon4.innerHTML = `<img src="assets/icons/${futureIconData4}.png" class="future-icon-day4"></img>`;
          futureIcon5.innerHTML = `<img src="assets/icons/${futureIconData5}.png" class="future-icon-day5"></img>`;

          // ***** UV INDEX API
          // sends fetch request for UV index
          fetch(`${api.base}onecall?lat=${geolocation.lat}&lon=${geolocation.lon}&exclude={minutely}&units=imperial&appid=${api.key}`)
            .then(response => response.json())
            .then(data => {
              // links javascript to API data
              let uvIndex = data.current.uvi;
              // links javascript to HTML elements
              let cityUVIndex = document.querySelector('#city-uvi-today');
              // replaces javascript HTML element content with javascript API data
              cityUVIndex.innerHTML = `<p id="city-uvi-today">UV Index: <span id="uvi-badge" class="badge rounded-pill">${uvIndex}</span></p>`;

                // UVI levels
                if (uvIndex <= 2) {
                  document.querySelector('.badge').style.backgroundColor = '#198754';
                  // green, 1-2, 
                } else if (uvIndex <= 5) {
                  document.querySelector('.badge').style.backgroundColor = '#ffc107';
                  document.querySelector('.badge').style.Color = '#000';
                  //yellow, 3-5, ; want .text-dark added
                } else if (uvIndex <= 7) {
                  document.querySelector('.badge').style.backgroundColor = '#fd7e14';
                  document.querySelector('.badge').style.Color = '#000';
                  //orange, 6-7, ; want .text-dark added
                } else if (uvIndex <= 10) {
                  document.querySelector('.badge').style.backgroundColor = '#dc3545';
                  //red, 8-10, 
                } else if (uvIndex > 10) {
                  document.querySelector('.badge').style.backgroundColor = '#6f42c1';
                  //purple, 11, 
                }
            });
        });
    });

  //TODO: alert for wrong city names
  //.catch(err => alert("That's not a city name!"));
};

// ***** LIST CITIES AS BUTTONS
// sends fetch request on button click

button.addEventListener('click', function () {
  const userInput = document.querySelector('#input-text').value;
  document.querySelector('#input-text').value = '';
  generateWeatherInfo(userInput);

  //create button
  let buttonCity = document.createElement('li');
  buttonCity.setAttribute('class', 'city-list-item list-group-item');
  buttonCity.setAttribute('data-city', `${userInput}`)
  buttonCity.innerHTML = userInput;

    //! max said that it needs data-key attribute
  
  //add button to the page
  document.querySelector('#search-list').append(buttonCity);

  document.querySelector('#search-list').addEventListener("click", function() {
    generateWeatherInfo(`${data-city}`);
  });
});