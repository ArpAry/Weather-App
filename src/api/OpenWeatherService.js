const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_URL = "http://api.weatherapi.com/v1/";
// const WEATHER_API_KEY = "257b585967454e4eb3493552240201";

//const WEATHER_API_KEY = "3d92de31ab344650ad9121013240201";

const WEATHER_API_KEY = "3d92de31ab344650ad9121013240201";


const GEO_API_OPTIONS = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export async function fetchWeatherData (lat,lon) {
  // console.log("lat and long",{lat, lon})
  try {
    let [weatherPromise, forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`
      ),
      fetch(
        `${WEATHER_API_URL}forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=no`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();
    const forcastResponse=await forcastPromise.json();
    // console.log({weatherResponse,forcastResponse})
    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCities (input) {
  console.log("check input",input)
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}
