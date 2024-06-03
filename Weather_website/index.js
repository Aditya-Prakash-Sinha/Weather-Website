var inputvalue = document.querySelector("#cityinput");
var btn = document.querySelector("#add");
var city = document.querySelector("#cityoutput");
var description = document.querySelector("#description");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var apik = "f9445dc70238092bb5761f6b7c49f81e";

function conversion(val) {
    return (val - 273.15).toFixed(2); 
}


function getWeatherEmoji(weatherDescription, temperature) {
    if (weatherDescription.includes("rain")) {
        return "🌧️"; 
    } else if (weatherDescription.includes("cloud")) {
        return "☁️"; 
    } else {
       
        if (temperature < 10) {
            return "❄️"; 
        } else if (temperature > 30) {
            return "☀️"; 
        } else {
            return "🌡️"; 
        }
    }
}

btn.addEventListener('click', function() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
        .then(res => res.json()) 

        .then(data => {
            var nameval = data['name'];
            var descrip = data['weather'][0] ['description'];
            var temperature = data['main']['temp'];
            var wndspeed = data['wind']['speed'];

            city.innerHTML = `Weather of  <span> ${ nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${getWeatherEmoji(descrip, conversion(temperature))} ${conversion(temperature)} °C</span>`; 
            description.innerHTML = `Sky Conditions: <span>${descrip}</span>`;
            wind.innerHTML = `Wind Speed: <span>${wndspeed} km/h</span>`;
        })
        .catch(err => alert('You entered an incorrect city name'));
});
