const api = "https://api.weatherapi.com/v1/current.json?key=71e495caed744252930201920243105&q=Paris";

async function getWeather() {
    let request = await fetch(api);
    let response = await request.json();

    const current_text = response?.current?.condition?.text;
    console.log(current_text);
}

getWeather();