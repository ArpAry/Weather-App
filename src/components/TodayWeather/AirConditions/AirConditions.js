import React from "react";
import ErrorBox from "../../Reusable/ErrorBox";
import AirConditionsItem from "./AirConditionsItem";
import Layout from "../../Reusable/Layout";

const TodayWeatherAirConditions = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";

  // console.log("data from airconditions", data);
  // console.log(data.current.feelslike_c);

  let content = <ErrorBox flex="1" type="error" />;
  // const cloudData =
  if (!noDataProvided)
    content = (
      <>
        <AirConditionsItem
          title="Real Feel"
          // value={`${Math.round(data.main.feels_like)} °C`}
          value={`${Math.round(data.current.feelslike_c)} °C`}
          type="temperature"
        />
        <AirConditionsItem
          title="Wind"
          value={`${data.current.wind_mph} miles/hour`}
          type="wind"
        />
        <AirConditionsItem
          title="Clouds"
          // value={`${Math.round(data.clouds.all)} %`}
          value={`${Math.round(data.current.cloud)} %`}
          type="clouds"
        />
        <AirConditionsItem
          title="Humidity"
          // value={`${Math.round(data.main.humidity)} %`}
          value={`${Math.round(data.current.humidity)} %`}
          type="humidity"
        />
      </>
    );
  return (
    <Layout
      title="AIR CONDITIONS"
      content={content}
      mb="1rem"
      sx={{ marginTop: "2.9rem" }}
    />
  );
};

export default TodayWeatherAirConditions;
