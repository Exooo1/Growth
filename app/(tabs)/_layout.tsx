import {
  BACKGROUND_COLOR_SCREEN,
  COMMON_COLOR_GREEN,
  TEXT_COLOR_GREY,
} from "@/styles/constants/color-cst";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";

interface TimerButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const TimerButton: React.FC<TimerButtonProps> = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -25,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: COMMON_COLOR_GREEN,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: COMMON_COLOR_GREEN,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleTimerPress = () => {
    setIsTimerRunning((prev) => !prev);
    console.log(isTimerRunning ? "stop timer" : "start timer");
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COMMON_COLOR_GREEN,
        tabBarInactiveTintColor: TEXT_COLOR_GREY,
        tabBarStyle: {
          position: "absolute",
          bottom: "6%",
          elevation: 0,
          backgroundColor: "black",
          borderRadius: 100,
          height: 70,
          borderTopWidth: 0,
          marginHorizontal: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          height: 70,
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: "To-Do",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: "",
          tabBarIcon: () => (
            <FontAwesome
              style={{
                color: "black",
                top: 6,
                left: isTimerRunning ? 0 : 3,
              }}
              size={28}
              name={isTimerRunning ? "pause" : "play"}
              color={"black"}
            />
          ),
          tabBarButton: (props) => (
            <TimerButton {...props} onPress={handleTimerPress} />
          ),
        }}
      />
      <Tabs.Screen
        name="management"
        options={{
          title: "Management",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="folder" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
