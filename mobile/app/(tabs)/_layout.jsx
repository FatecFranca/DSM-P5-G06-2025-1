import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/components/HapticTab";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#e9edc9",
        tabBarInactiveTintColor: "#e9edc9",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: "#accbde",
            width: "100%",
            borderTopColor: "transparent",
            borderTopWidth: 0,
          },
        }),
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <Ionicons size={28} name="home" color={color} />
            ) : (
              <Ionicons size={28} name="home-outline" color={color} />
            ),
          title: "Início",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesome size={26} name="user" color={color} />
            ) : (
              <FontAwesome size={26} name="user-o" color={color} />
            ),
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
