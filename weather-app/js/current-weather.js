import weather from "../data/current-weather.js";
import { formatDate } from "../utils/format-data.js";
import { formatTemp } from "../utils/format-data.js";
import { weatherConditionsCodes } from "./constants.js";
import { getCurrentPosition } from "./geolocation.js";

//weatherConditionsCodes[ ]

function setCurrentDate($el) {
  const date = new Date();
  const formattedDate = formatDate(date);
  $el.textContent = formattedDate;
}

function setCurrentCity($el, city) {
  $el.textContent = city;
}

function setCurrentTemp($el, temp) {
  $el.textContent = formatTemp(temp);
}

//day or night time
function solarStatus(sunriseTime, sunsetTime) {
  const currentHours = new Date().getHours(); //metodo para traer la hora en que estamos ahora
  const sunriseHours = sunriseTime.getHours();
  const sunsetHours = sunsetTime.getHours();

  if (currentHours > sunsetHours || currentHours < sunriseHours) {
    return "night";
  }
  return "morning";

  currentHours; //?
}

//template string for day or night name in pictures
function setBackground($el, conditionCode, solarStatus) {
  const weatherType = weatherConditionsCodes[conditionCode];
  const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
  $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;
}

function configCurrentWeather(weather) {
  //date
  const $currentWeatherDate = document.querySelector("#current-weather-date");
  setCurrentDate($currentWeatherDate);

  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  const city = weather.name;
  setCurrentCity($currentWeatherCity, city);

  //temp
  const $currentWeatherTemp = document.querySelector("#current-weather-temp");
  const temp = weather.main.temp;
  setCurrentTemp($currentWeatherTemp, temp);

  //background método setbackground
  const sunriseTime = new Date(weather.sys.sunrise * 1000); //transformar los milisegundos
  const sunsetTime = new Date(weather.sys.sunset * 1000);

  const $app = document.querySelector("#app");
  const conditionCode = String(weather.weather[0].id).charAt(0);
  //esta api cubre 2 tipos de clima por eso cogemos el primero, id con numero 803, convertimos a string
  //y los strings tienen un metodo charAt(0) para coger el primero del id 8 y hacer match con los condition codes
  setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime));
}

export default function currentWeather() {
  //const latlon = getCurrentPosition();

  getCurrentPosition()
  .then((data)=> {
    console.log(data)
  })
  .catch((message)=> {
    console.log(message)
  })
  configCurrentWeather(weather);
  console.log(weather);
}
