import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/OpenWeatherService';

const Search = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState(null);

  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);
    console.log("ip valu ",inputValue);
    console.log(citiesList)
    if( inputValue.length > 0 && citiesList.data.length == 0)
    {

      citiesList.data = ["No City Found "];
    }
    return { 
      options: citiesList.data.map((city) => {

        if( city == "No City Found ")
        {
            return {value :"OH No ! ", label:"Please Enter Valid City "}
        }
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };
  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600}
      value={searchValue}
      onChange={onChangeHandler}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
