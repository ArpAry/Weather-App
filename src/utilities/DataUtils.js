export function groupBy(key) {
  return function group(array) {
    return array.reduce((acc, obj) => {
      const property = obj[key];
      const { date, ...rest } = obj;
      acc[property] = acc[property] || [];
      acc[property].push(rest);
      return acc;
    }, {});
  };
}

export function getAverage(array, isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(array.reduce((a, b) => a + b, 0) / array.length);
    if (average === 0) {
      average = 0;
    }
  } else average = (array.reduce((a, b) => a + b, 0) / array.length).toFixed(2);

  return average;
}

export function getMostFrequentWeather(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

export const descriptionToIconName = (desc, descriptions_list) => {
  let iconName = descriptions_list.find((item) => item.description === desc);
  if (!iconName) return;
  return iconName.icon || "unknown";
};

export const formateDate = (date, format) => {};

export const getWeekForecastWeather = (response, descriptions_list) => {
  let foreacast_data = [];
  let descriptions_data = [];

  // console.log("repsonse and desciption ", { response, descriptions_list });

  if (
    !response ||
    Object.keys(response).length === 0 ||
    response.cod === "404"
  ) {
    console.log("HERE");
    return [];
  } else
    response?.forecast.forecastday.map((item, idx) => {
      const today = new Date(item.date);
      // console.log("today date for each day", today);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = dd + "-" + mm + "-" + yyyy;
      // console.log(
      //   "response list insde mmap icon pring",
      //   item.day.condition.icon
      // );

      descriptions_data.push({
        description: "item.weather[0].description",
        date: formateDate(item.date, "dd-mm-yyyy"),
      });
      let cloudPercentage = 0;

      item.hour.map((hour, id) => {
        cloudPercentage += hour.cloud;
      });
      cloudPercentage /= 24;
      cloudPercentage = Math.round(cloudPercentage);

      foreacast_data.push({
        date: formattedToday,
        temp: item.day.avgtemp_c,
        humidity: item.day.avghumidity,
        wind: item.day.maxwind_kph,
        clouds: cloudPercentage,
        sunrise: item.astro.sunrise,
        sunset: item.astro.sunset,
        icon: item.day.condition.icon,
      });

      return { idx, item };
    });

  // console.log("after else", foreacast_data);

  return foreacast_data;
};

export const getTodayForecastWeather = (
  response,
  current_date,
  current_datetime
) => {
  let all_today_forecasts = [];

  if (!response || Object.keys(response).length === 0 || response.cod === "404")
    return [];
  else
    response?.list?.slice().map((item) => {
      if (item.dt_txt.startsWith(current_date.substring(0, 10))) {
        if (item.dt > current_datetime) {
          all_today_forecasts.push({
            time: item.dt_txt.split(" ")[1].substring(0, 5),
            icon: item.weather[0].icon,
            temperature: Math.round(item.main.temp) + " °C",
          });
        }
      }
      return all_today_forecasts;
    });

  if (all_today_forecasts.length < 7) {
    return [...all_today_forecasts];
  } else {
    return all_today_forecasts.slice(-6);
  }
};
