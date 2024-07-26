const api = "http://api.weatherapi.com/v1/forecast.json?key=71e495caed744252930201920243105&q=Paris&days=4&aqi=no&alerts=no";

async function getWeather() {
    let request = await fetch(api);
    let response = await request.json();
    console.log(response);
    
    const {current:today, forecast, location} = response;
    updateCurrentWeather(today, forecast);
    updateForecastWeather(forecast);
}

function updateCurrentWeather(current, forecast) {
    let currentElements ={
        "condition-text": current.condition.text, 
        "condition-icon": current.condition.icon, 
        "current-temp": current.temp_f, 
        "feelslike": current.feelslike_f, 
        "windspeed": current.wind_mph,
        "maxtemp": forecast.forecastday[0].day.maxtemp_f,
        "mintemp": forecast.forecastday[0].day.mintemp_f
    }

    updateElements(currentElements, "current");
}

function updateForecastWeather(forecast) {
    forecast.forecastday.forEach((forecastday, index) => {
        if (index != 0) {
            const forecastElements = {
                "date": getDay(forecastday.date),
                "maxtemp": forecastday.day.maxtemp_f,
                "mintemp": forecastday.day.mintemp_f,
                "condition-icon": forecastday.day.condition.icon,
                "daily-chance-of-rain": forecastday.daily_chance_of_rain
            }

            updateElements(forecastElements, `forecast-${index}`)
        }
    })
}

function updateElements(elements, parentElement) {
    const parent = document.getElementById(parentElement);
    if (parent == null) {
        throw new Error("Parent element not found");
    }
    for (let i in elements) {
        const element = parent.querySelector("." + i);
        const value = elements[i];

        if (isNaN(parseFloat(value))) {
            if (element instanceof HTMLImageElement) {
                element.setAttribute("src", "https://" + value);
            } else {
            element.textContent=value;
            }
        } else {
            element.textContent = Math.round(value);
        }
    } 
}

function getDay(dow) {
    const today = new Date(dow).getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[today];
}

getWeather(); 