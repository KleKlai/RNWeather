import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { theme } from "./theme";
import { debounce } from "lodash";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";
import { fetchLocation, fetchWeatherForecast } from "./api/weather";
import { weatherImages } from "./constant";

const StyleView = styled(View);
const StyleText = styled(Text);
const StyleSafeAreaView = styled(SafeAreaProvider);
const StyleTextInput = styled(TextInput);
const StyleTouchableOpacity = styled(TouchableOpacity);

// Define the type for each location object
type Location = {
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  region: string;
  url: string;
};

export default function App() {
  const [showSearch, toggleSearch] = useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState<Location[]>([]);
  const [weather, setWeather] = useState<any>({});

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocation({ cityName: value }).then((data) => {
        setSearchLocation(data);
        // console.log(`Handle Search Location UseState ~ Result: `, location)
      });
    }
  };

  const handleLocation = (loc: any) => {
    setSearchLocation([]);
    toggleSearch(false);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeather(data);
      console.log("Received Forecast: ", data);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    fetchWeatherForecast({
      cityName: "Davao",
      days: "7",
    }).then((data) => {
      setWeather(data);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []); // Prevent real time text from changing, it will wait 1200 seconds

  const { current, location } = weather;

  return (
    <StyleView className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("./assets/images/bg.png")}
        className="absolute h-full w-full"
      />

      <StyleSafeAreaView className="flex flex-1">
        <StyleView
          style={{ height: "7%" }}
          className="mx-4 mt-24 relative z-50"
        >
          <StyleView
            className="flex-row justify-end items-center rounded-full pl-4"
            style={{
              backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {showSearch ? (
              <StyleTextInput
                onChangeText={handleTextDebounce}
                placeholder="Search City"
                placeholderTextColor={"lightgray"}
                className="h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}

            <StyleTouchableOpacity
              onPress={() => toggleSearch(!showSearch)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </StyleTouchableOpacity>
          </StyleView>
          {searchLocation.length > 0 && showSearch ? (
            <StyleView className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {searchLocation.map((loc, index) => {
                let showBorder = index + 1 != searchLocation.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <StyleTouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <MapPinIcon size={20} color="gray" />
                    <StyleText className="text-black text-lg ml-2">
                      {loc?.name}, {loc?.country}
                    </StyleText>
                  </StyleTouchableOpacity>
                );
              })}
            </StyleView>
          ) : null}
        </StyleView>

        {/* Forecast */}
        <StyleView className="mx-4 flex justify-around flex-1 mb-2">
          <StyleText className="text-white text-center text-2xl font-bold">
            {location?.name},
            <StyleText className="text-lg font-semibold text-gray-300">
              {" " + location?.country}
            </StyleText>
          </StyleText>

          {/* Weather Image */}
          <StyleView className="flex-row justify-center">
            <Image
              source={weatherImages[current?.condition?.text]}
              className="w-52 h-52"
            />
          </StyleView>

          <StyleView className="space-y-2">
            <StyleText className="text-center font-bold text-white text-6xl ml-5">
              {current?.temp_c}&#176;
            </StyleText>
            <StyleText className="text-center text-white text-xl tracking-widest">
              {current?.condition?.text}
            </StyleText>
          </StyleView>

          {/* Other Stats */}
          <StyleView className="flex-row justify-between mx-4">
            <StyleView className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/icons/wind.png")}
                className="h-6 w-6"
              />
              <StyleText className="text-white font-semibold text-base">
                {current?.wind_kph}km
              </StyleText>
            </StyleView>
            <StyleView className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <StyleText className="text-white font-semibold text-base">
                {current?.humidity}%
              </StyleText>
            </StyleView>
            <StyleView className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/icons/sun.png")}
                className="h-6 w-6"
              />
              <StyleText className="text-white font-semibold text-base">
                6:04 AM
              </StyleText>
            </StyleView>
          </StyleView>
        </StyleView>

        {/* forecast */}
        <StyleView className="mb-2 space-y-3">
          <StyleView className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size={22} color="white" />
            <StyleText className="text-white text-base">
              Daily Forecast
            </StyleText>
          </StyleView>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {/* Loop forecast array */}
            {weather?.forecast?.forecastday?.map((item, index) => {
              let date = new Date(item.date);
              let options = { weekday: "long" };
              let dayName = date.toLocaleDateString("en-US", options);
              dayName = dayName.split(",")[0];
              return (
                <StyleView
                  key={index}
                  className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                  style={{ backgroundColor: theme.bgWhite(0.15) }}
                >
                  <Image
                    source={weatherImages[item?.day?.condition?.text]}
                    className="h-11 w-11"
                  />
                  <StyleText className="text-white">{dayName}</StyleText>
                  <StyleText className="text-white text-xl font-semibold">
                    {item?.day?.avgtemp_c}&#176;
                  </StyleText>
                </StyleView>
              );
            })}
          </ScrollView>
        </StyleView>
      </StyleSafeAreaView>
    </StyleView>
  );
}
