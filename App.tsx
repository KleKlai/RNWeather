import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

const StyleView = styled(View);
const StyleText = styled(Text);
const StyleSafeAreaView = styled(SafeAreaProvider);
const StyleTextInput = styled(TextInput);
const StyleTouchableOpacity = styled(TouchableOpacity);

export default function App() {
  const [showSearch, toggleSearch] = useState<boolean>(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const handleLocation = (location) => {
    console.log("Location: ", location);
  };

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
          {location.length > 0 && showSearch ? (
            <StyleView className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-400"
                  : "";
                return (
                  <StyleTouchableOpacity
                    onPress={() => handleLocation(location)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1" +
                      borderClass
                    }
                  >
                    <MapPinIcon size={20} color="gray" />
                    <StyleText className="text-black text-lg ml-2">
                      Davao, Philippines
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
            Davao,
            <StyleText className="text-lg font-semibold text-gray-300">
              Philippines
            </StyleText>
          </StyleText>

          {/* Weather Image */}
          <StyleView className="flex-row justify-center">
            <Image
              source={require("./assets/images/partlycloudy.png")}
              className="w-52 h-52"
            />
          </StyleView>

          <StyleView className="space-y-2">
            <StyleText className="text-center font-bold text-white text-6xl ml-5">
              26&#176;
            </StyleText>
            <StyleText className="text-center text-white text-xl tracking-widest">
              Partly Cloudy
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
                22km
              </StyleText>
            </StyleView>
            <StyleView className="flex-row space-x-2 items-center">
              <Image
                source={require("./assets/icons/drop.png")}
                className="h-6 w-6"
              />
              <StyleText className="text-white font-semibold text-base">
                23%
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
            <StyleView
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("./assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <StyleText className="text-white">Monday</StyleText>
              <StyleText className="text-white text-xl font-semibold">
                26&#176;
              </StyleText>
            </StyleView>
            <StyleView
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("./assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <StyleText className="text-white">Monday</StyleText>
              <StyleText className="text-white text-xl font-semibold">
                26&#176;
              </StyleText>
            </StyleView>
            <StyleView
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("./assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <StyleText className="text-white">Monday</StyleText>
              <StyleText className="text-white text-xl font-semibold">
                26&#176;
              </StyleText>
            </StyleView>
            <StyleView
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
            >
              <Image
                source={require("./assets/images/heavyrain.png")}
                className="h-11 w-11"
              />
              <StyleText className="text-white">Monday</StyleText>
              <StyleText className="text-white text-xl font-semibold">
                26&#176;
              </StyleText>
            </StyleView>
          </ScrollView>
        </StyleView>
      </StyleSafeAreaView>
    </StyleView>
  );
}
