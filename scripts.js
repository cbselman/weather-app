const api = "http://api.weatherapi.com/v1/forecast.json?key=71e495caed744252930201920243105&q=London&days=1&aqi=no&alerts=no";

async function getWeather() {
    let request = await fetch(api);
    let response = await request.json();
    console.log(response);
    
    const {current:today, forecast, location} = response;
    console.log(today);
    const current_text = response?.current?.condition?.text;
    console.log(current_text);
    updateCurrentWeather(today);
}

function updateCurrentWeather(call) {
    let condition_text = call.condition.text;
    let condition_img = "https:" + call.condition.icon;
    let temp = call.temp_f;
    let feels = call.feelslike_f;
    let windSpeed = call.wind_mph;

    document.getElementById("current-condition-text").textContent = condition_text;
    document.getElementById("current-img").setAttribute("src", condition_img);
    document.getElementById("current-temp").textContent = Math.round(temp);
}

getWeather(); 