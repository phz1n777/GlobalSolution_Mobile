// screens/LearningScreen.tsx
import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { PALETTE } from "../style/palette";
// Navegação (tabs)
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const TopTabs = createMaterialTopTabNavigator();
// Screens das abas
import TrailsScreen from "./TrailsScreen";
import CoursesScreen from "./CoursesScreen";
import MissionsScreen from "./MissionsScreen";

export default function LearningScreen({ route }: any) {
  const tabRef = useRef<any>(null);

  useEffect(() => {
    const target = route?.params?.goTo;
    if (target === "missions") {
      tabRef.current?.navigate("Missões");
    }
  }, [route?.params?.goTo]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PALETTE.bg }}>
      <TopTabs.Navigator
        ref={tabRef}
        screenOptions={{
          tabBarStyle: { backgroundColor: PALETTE.card },
          tabBarIndicatorStyle: { backgroundColor: PALETTE.primary, height: 3 },
          tabBarLabelStyle: { fontWeight: "900", color: PALETTE.textDark },
        }}
      >
        <TopTabs.Screen name="Trilhas" component={TrailsScreen} />
        <TopTabs.Screen name="Microcursos" component={CoursesScreen} />
        <TopTabs.Screen name="Missões" component={MissionsScreen} />
      </TopTabs.Navigator>
    </SafeAreaView>
  );
}
