import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getWeekDays } from "../../utilities/DatetimeUtils";
import { weatherIcon } from "../../utilities/IconsUtils";
import WeeklyForecastItem from "./WeeklyForecastItem";
import ErrorBox from "../Reusable/ErrorBox";
import UnfedForecastItem from "./UnfedForecastItem";
import DayWeatherDetails from "./DayWeatherDetails";
import Layout from "../Reusable/Layout";

const WeeklyForecast = ({ data }) => {
  // console.log("forecastData weekly", data);
  const forecastDays = getWeekDays();

  const noDataProvided =
    !data ||
    Object.keys(data).length === 0 ||
    !data.list ||
    data.list.length === 0;

  let content = (
    <div style={{ width: "100%" }}>
      <ErrorBox type="error" />
    </div>
  );

  const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  if (!noDataProvided)
    content = (
      <Grid
        item
        container
        display="flex"
        flexDirection="column"
        xs={12}
        gap="4px"
      >
        {data.list.map((item, idx) => {
          // console.log("data.list.map from weekly ", item);

          return (
            <Grid
              item
              key={idx}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                padding: "2px 0 2px",
                background:
                  "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
                borderRadius: "8px",
              }}
            >
              <DayWeatherDetails
                day={item.date + " ( " + forecastDays[idx] + " )"}
                src={item.icon}
                sunrise={item.sunrise}
                sunset={item.sunset}
              />

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeeklyForecastItem
                  type="temperature"
                  value={Math.round(item.temp) + " °C"}
                  color="black"
                />
                <WeeklyForecastItem
                  type="clouds"
                  value={item.clouds + " %"}
                  color="black"
                />
              </Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "31px",
                        color: "rgba(255, 255, 255, .7)",
                        gap: { xs: "3px", sm: "4px", md: "6px" },
                        width: "100%",
                      }}
                    >
                      Sunrise:
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          fontSize: { xs: "12px", sm: "13px" },
                          fontWeight: { xs: "400", sm: "600" },
                          color: "white",
                          fontFamily: "Poppins",
                          lineHeight: 1,
                        }}
                      >
                        {convertTime12to24(item.sunrise)}
                      </Typography>
                    </Box>
                  </div>
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "31px",
                        color: "rgba(255, 255, 255, .7)",
                        gap: { xs: "3px", sm: "4px", md: "6px" },
                        width: "100%",
                      }}
                    >
                      Sunset:
                      <Typography
                        variant="p"
                        component="p"
                        sx={{
                          fontSize: { xs: "12px", sm: "13px" },
                          fontWeight: { xs: "400", sm: "600" },
                          color: "white",
                          fontFamily: "Poppins",
                          lineHeight: 1,
                        }}
                      >
                        {convertTime12to24(item.sunset)}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WeeklyForecastItem
                  type="wind"
                  value={item.wind + " miles/hour"}
                  color="green"
                />
                <WeeklyForecastItem
                  type="humidity"
                  value={item.humidity + " %"}
                  color="green"
                />
              </Grid>
            </Grid>
          );
        })}
        {data.list.length === 5 && (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            sx={{
              padding: "2px 0 2px",
              background:
                "linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%",
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              borderRadius: "8px",
            }}
          >
            <UnfedForecastItem
              day={forecastDays[5]}
              value="NaN"
              src={weatherIcon("unknown.png")}
            />
          </Grid>
        )}
      </Grid>
    );

  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
      mb=".8rem"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem 0 0",
      }}
    />
  );
};

export default WeeklyForecast;
