let tempValue;

const form = document.querySelector("form");
const locationInput = form.querySelector("#location");
const submitButton = form.querySelector('[type = "submit"]');

const template = document.querySelector(".template");
const locationDOM = template.querySelector(".location");
const tempDOM = template.querySelector(".temp");
const fOrCButton = template.querySelector(".f-c");

form.addEventListener("submit", findTheWeather);
fOrCButton.addEventListener("click", fOrC);

async function render(location) {
    const data = await getWeather(location);
    locationDOM.textContent = data.name;
    tempValue = data.temp;
    tempDOM.textContent = tempValue;
    fOrC();
}

function findTheWeather(e) {
    e.preventDefault();

    const location = locationInput.value;
    render(location);
}

// ==========================================================================================
async function getWeather(place) {
    try {
        const weatherApi = await fetch(getApiURL(place));
        console.log(weatherApi.status);
        if (weatherApi.status > 400) {
            throw Error("Not Found");
        }
        const weatherJson = await weatherApi.json();
        const dataRequired = {
            name: weatherJson.name,
            temp: weatherJson.main.temp,
            maxTemp: weatherJson.main.temp_max,
            minTemp: weatherJson.main.temp_min,
            weatherDesc: weatherJson.weather[0].main,
        };
        console.log(dataRequired);
        return dataRequired;
    } catch (error) {
        console.log(error);
    }
}
function getApiURL(place) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=33a490f464acd7346f824280d84f16de`;
    return url;
}
function kToC(k) {
    return k - 273.15;
}
function fOrC() {
    if (true) {
        tempDOM.textContent = Math.round(kToC(tempValue));
        console.log(tempValue);
    }
}
