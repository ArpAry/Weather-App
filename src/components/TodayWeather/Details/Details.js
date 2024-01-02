import React from "react";
import { Grid } from "@mui/material";
import { getDayMonthFromDate } from "../../../utilities/DatetimeUtils";
import { weatherIcon } from "../../../utilities/IconsUtils";
import ErrorBox from "../../Reusable/ErrorBox";
import CityDateDetail from "./CityDateDetail";
import TemperatureWeatherDetail from "./TemperatureWeatherDetail";
import WeatherIconDetail from "./WeatherIconDetail";
import Layout from "../../Reusable/Layout";

const dayMonth = getDayMonthFromDate();

const Details = ({ data }) => {
  const noDataProvided =
    !data || Object.keys(data).length === 0 || data.cod === "404";
  console.log("data from details", data);

  console.log("current data ", data.current.feelslike_c);
  let content = <ErrorBox flex="1" type="error" />;

  if (!noDataProvided)
    content = (
      <>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <CityDateDetail city={data.city} date={dayMonth} />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            height: "80px",
          }}
        >
          <TemperatureWeatherDetail
            temperature={data.current.feelslike_c}
            // description={data.weather[0].description}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
          }}
        >
          <WeatherIconDetail
            // src={weatherIcon(`${data.current.condition.icon}`)}
            src={data.current.condition.icon}
          />
        </Grid>
      </>
    );

  return <Layout title="CURRENT WEATHER" content={content} />;
};

export default Details;
