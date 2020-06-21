const adviceButton = document.getElementById('advice');
let city = 'kiev';

const API_URL = 'https://api.weatherbit.io/v2.0/';
const API_KEY = '02fd99f29107456e914006fff00a5b9c';
const BASE_URL = `${API_URL}current?city=${city}&key=${API_KEY}`;

function getCurrentWeather(url) {
  return fetch(url)
    .then(resp => resp.json())
    .then(weatherData => {
      const div = document.querySelector('.host');
      const weather = {};
      weatherData.data.filter(details => {
        weather.city = details.city_name;
        weather.date = details.ob_time
          .split(' ')[0]
          .split('-')
          .reverse()
          .join('.');
        weather.day = getWeekday(details.ob_time);
        weather.icon = srcIcon(details.weather.icon);
        weather.tempFeel = details.app_temp.toFixed(0);
        weather.description = details.weather.description;
        weather.temp = details.temp.toFixed(0);
      });
      const forecast = 
            `<h3>You are in ${weather.city}</h3>
             <div>Today is ${weather.day} ${weather.date}</div>
             ${weather.temp != weather.tempFeel ? `<div>${weather.temp}&deg;C</div>` : ''}
             <div class='weatherIcon'><img src=${weather.icon}></div>
             <div>Feels like ${weather.tempFeel}&deg;C</div>
             <h2 class='forecast'>It's time to have a cup of ${weather.temp && weather.temp > 25 ? `ice latte` : `coffee`}!</h2>
            `;
      div.innerHTML = forecast;
      if (adviceButton.textContent === 'Get coffeine forecast :)')
        adviceButton.textContent = 'Get next coffeine forecast :)';
    }).then(
  () => console.log('All ok - we get weather'),
  () => console.error('Failed response'),
);
}

const srcIcon = icon =>
  `https://www.weatherbit.io/static/img/icons/${icon}.png`;

const getWeekday = datetime => {
  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let date = new Date(datetime).getDay();
  return weekday[date];
};

adviceButton.addEventListener('click', ev => {
  ev.preventDefault();
  getCurrentWeather(BASE_URL);
})
