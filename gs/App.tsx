import 'react-native-gesture-handler';
import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator, FlatList, StatusBar} from 'react-native';
import { styles, journeyStyles, focusTimerStyles } from "./style/styles";
import { PALETTE } from "./style/palette";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import MissionsScreen from "./screens/MissionsScreen";
import IncludIAScreen from "./screens/IncludIAScreen";
import AssistScreen from "./screens/AssistScreen";
import ProfileScreen from "./screens/ProfileScreen";
import FocusTimerScreen from "./screens/FocusTimerScreen";
import SelfAssessmentScreen from "./screens/SelfAssessmentScreen"
import LearningScreen from "./screens/LearningScreen"
import CoursesScreen from "./screens/CoursesScreen"
import CourseDetailScreen from "./screens/CourseDetailScreen"
import TrailsScreen from "./screens/TrailsScreen";
import TrailDetailScreen from "./screens/TrailDetailScreen";
import ProgressScreen from "./screens/ProgressScreen"
import { getUsersDB, saveUsersDB, loadUser, saveUser, checkBadges, setActiveSession, getActiveSession, clearActiveSession, ALL_BADGES, XP_BADGES, LEVEL_BADGES } from "./utils/db";
import { User, Mission, DEFAULT_MISSIONS } from "./utils/types";
import Avatar from "./components/Avatar";
import XPBar from "./components/XPBar";
import CustomDrawerContent from "./components/CustomDrawer";
import { FocusContext } from "./contexts/FocusContext";
import { TRAILS_DATA } from "./data/trails";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTabs = createMaterialTopTabNavigator();

/* ---------- Minha Jornada (com trilhas + microcursos + missões) ---------- */
function JourneyScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = navigation.addListener("focus", async () => {
      const u = await loadUser();
      setUser(u);
    });
    return unsub;
  }, [navigation]);

  if (!user) {
    return (
      <SafeAreaView style={journeyStyles.center}>
        <ActivityIndicator size="large" color={PALETTE.primary} />
      </SafeAreaView>
    );
  }
  const SAFE_TRAILS = (global as any).TRAILS_DATA || (typeof TRAILS_DATA !== "undefined" ? TRAILS_DATA : null);
  const SAFE_COURSES = (global as any).COURSES_DATA || (typeof COURSES_DATA !== "undefined" ? COURSES_DATA : null);

  // -------- TRILHAS ATIVAS --------
  const activeTrails = user.profile?.enrolledTrails || {};
  const trailsList = Object.entries(activeTrails).map(([tid, info]: any) => {
    const trailInfo = SAFE_TRAILS ? SAFE_TRAILS[tid] : null;
    return {
      id: tid,
      title: trailInfo?.title || info?.title || `Trilha ${tid}`,
      progress: info.progress || 0,
      // total tenta várias propriedades para compatibilidade com diferentes formatos
      total: trailInfo?.steps?.length || trailInfo?.missions?.length || info?.totalSteps || 0,
      meta: trailInfo || null,
    };
  });

  // -------- MICROCURSOS ATIVOS --------
  const activeCourses = user.profile?.enrolledCourses || user.profile?.enrolled || {};
  const microcoursesList = Object.entries(activeCourses).map(([cid, info]: any) => {
    const cInfo = SAFE_COURSES ? SAFE_COURSES[cid] : null;
    return {
      id: cid,
      title: info?.title || cInfo?.title || `Curso ${cid}`,
      progress: info.progress || 0,
      total: cInfo?.totalSteps || info?.totalSteps || 1,
      meta: cInfo || null,
    };
  });

  // -------- MISSÕES ATIVAS --------
  const missionList = user.missions || [];

  // -------- LINHA DO TEMPO (badges + mentorings) --------
  const timeline = [
    ...(user.badges || []).map((bId: string) => {
      const b = ALL_BADGES[bId] || { title: bId, icon: "🏆" };
      return { date: new Date().toISOString(), title: `Badge: ${b.title}`, type: "badge" };
    }),
    ...(user.mentorings || []).map((m: any) => ({
      title: `Check-in realizado com ${m.mentor}`,
      date: m.date || new Date().toISOString(),
      type: "mentoring",
    })),
  ];

  return (
    <SafeAreaView style={journeyStyles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER */}
        <View style={journeyStyles.headerBox}>
          <Text style={journeyStyles.headerTitle}>Minha Jornada</Text>
          <Text style={journeyStyles.headerSubtitle}>
            Trilhas, microcursos, missões e sua linha do tempo.
          </Text>
        </View>

        {/* TRILHAS */}
        <View style={journeyStyles.card}>
          <Text style={journeyStyles.sectionTitle}>Trilhas Ativas</Text>
          {trailsList.length === 0 ? (
            <Text style={journeyStyles.emptyText}>Nenhuma trilha ativa.</Text>
          ) : (
            trailsList.map((t) => (
              <View key={t.id} style={journeyStyles.itemBox}>
                <View style={{ flex: 1 }}>
                  <Text style={journeyStyles.itemTitle}>{t.title}</Text>
                  <Text style={journeyStyles.itemSub}>
                    Progresso: {t.progress}/{t.total}
                  </Text>
                </View>

                <TouchableOpacity
                  style={journeyStyles.button}
                  onPress={() => {
                    const trailObj = t.meta || { id: t.id, title: t.title, steps: [] };
                    navigation.navigate("TrailDetail", { trail: trailObj });
                  }}
                >
                  <Text style={journeyStyles.buttonText}>Ver trilha</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* MICROCURSOS */}
        <View style={journeyStyles.card}>
          <Text style={journeyStyles.sectionTitle}>Microcursos Ativos</Text>
          {microcoursesList.length === 0 ? (
            <Text style={journeyStyles.emptyText}>Nenhum microcurso em andamento.</Text>
          ) : (
            microcoursesList.map((c) => (
              <View key={c.id} style={journeyStyles.itemBox}>
                <View style={{ flex: 1 }}>
                  <Text style={journeyStyles.itemTitle}>{c.title}</Text>
                  <Text style={journeyStyles.itemSub}>
                    Progresso: {c.progress}/{c.total}
                  </Text>
                </View>

                <TouchableOpacity
                  style={journeyStyles.button}
                  onPress={() => {
                    const courseObj = c.meta || { id: c.id, title: c.title, steps: [] };
                    navigation.navigate("CourseDetail", { course: courseObj });
                  }}
                >
                  <Text style={journeyStyles.buttonText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* MISSÕES */}
        <View style={journeyStyles.card}>
          <Text style={journeyStyles.sectionTitle}>Missões Ativas</Text>
          {missionList.length === 0 ? (
            <Text style={journeyStyles.emptyText}>Nenhuma missão disponível.</Text>
          ) : (
            missionList.map((m: any) => (
              <View key={m.id} style={journeyStyles.itemBox}>
                <View style={{ flex: 1 }}>
                  <Text style={journeyStyles.itemTitle}>{m.title}</Text>
                  <Text style={journeyStyles.itemSub}>
                    {m.cat} • +{m.xp} XP
                  </Text>
                </View>

                <TouchableOpacity
                  style={journeyStyles.button}
                  onPress={() => navigation.navigate("MissionDetail", { mission: m })}
                >
                  <Text style={journeyStyles.buttonText}>Ver missão</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* TIMELINE */}
        <View style={journeyStyles.card}>
          <Text style={journeyStyles.sectionTitle}>Linha do Tempo</Text>
          {timeline.length === 0 ? (
            <Text style={journeyStyles.emptyText}>
              Sua jornada está vazia — conclua missões ou microcursos.
            </Text>
          ) : (
            timeline.map((t, idx) => (
              <View key={idx} style={journeyStyles.timelineItem}>
                <View style={journeyStyles.timelineDot} />
                <View style={{ flex: 1 }}>
                  <Text style={journeyStyles.timelineTitle}>{t.title}</Text>
                  <Text style={journeyStyles.timelineDate}>
                    {new Date(t.date).toLocaleString()}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* navigation */

function HomeTabs() {
  return (
    <Tab.Navigator
  screenOptions={{
    headerShown: false,
    tabBarStyle: { 
      backgroundColor: PALETTE.card, 
      height: 80, 
      paddingBottom: 20, 
      borderTopColor: PALETTE.border 
    },
    tabBarActiveTintColor: PALETTE.primary,
    tabBarInactiveTintColor: PALETTE.textMuted,
    tabBarLabelStyle: { fontWeight: '700', fontSize: 12 }
  }}
>

  {/* Home */}
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      title: 'Início',
      tabBarIcon: ({ color, size }) => (
        <Feather name="home" size={22} color={color} />
      )
    }}
  />

  {/* Learning */}
  <Tab.Screen
    name="Learning"
    component={LearningScreen}
    options={{
      title: 'Aprendizagem',
      tabBarIcon: ({ color }) => (
        <Feather name="book-open" size={22} color={color} />
      )
    }}
  />

  {/* Autoavaliação */}
  <Tab.Screen
    name="Assess"
    component={SelfAssessmentScreen}
    options={{
      title: 'Autoavaliação',
      tabBarIcon: ({ color }) => (
        <Feather name="edit-3" size={22} color={color} />
      )
    }}
  />

  {/* Jornada */}
  <Tab.Screen
    name="Journey"
    component={JourneyScreen}
    options={{
      title: 'Jornada',
      tabBarIcon: ({ color }) => (
        <Feather name="map" size={22} color={color} />
      )
    }}
  />

  {/* Perfil */}
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      title: 'Perfil',
      tabBarIcon: ({ color }) => (
        <Feather name="user" size={22} color={color} />
      )
    }}
  />

</Tab.Navigator>

  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: PALETTE.card },
        headerTintColor: PALETTE.textDark,
        headerTitleStyle: { fontWeight: '900' },
      }}
    >
      {/* Telas principais dentro das Tabs */}
      <Drawer.Screen
        name="Tabs"
        component={HomeTabs}
        options={{ title: "SkillUpPlus 2030+" }}
      />

      {/* IncludIA */}
      <Drawer.Screen
        name="IncludIA"
        component={IncludIAScreen}
        options={{ title: "IncludIA" }}
      />

      {/* Assistência */}
      <Drawer.Screen
        name="Assist"
        component={AssistScreen}
        options={{ title: "Central Assistida" }}
      />

      {/* Perfil (já existe Profile dentro das Tabs → renomeamos corretamente) */}
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Perfil" }}
      />
    </Drawer.Navigator>
  );
}


/* Root App */
export default function App(): JSX.Element {
  const [loadingStart, setLoadingStart] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [focusOn, setFocusOn] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getActiveSession();
      setInitialRoute(session ? 'MainDrawer' : 'Login');
      const u = await loadUser();
      if (u && u.settings && u.settings.focusMode) setFocusOn(true);
      setLoadingStart(false);
    })();
  }, []);

  if (loadingStart || !initialRoute) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={PALETTE.primary} />
      </SafeAreaView>
    );
  }

  return (
    <FocusContext.Provider value={{ focusOn, setFocusOn }}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator initialRouteName={initialRoute!} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} />
        <Stack.Screen name="IncludIA" component={IncludIAScreen} />
        <Stack.Screen name="TrailDetail" component={TrailDetailScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <Stack.Screen name="FocusTimer" component={FocusTimerScreen} />
        <Stack.Screen name="SelfAssessment" component={SelfAssessmentScreen} />
        <Stack.Screen name="Courses" component={CoursesScreen} />
      </Stack.Navigator>

      </NavigationContainer>
    </FocusContext.Provider>
  );
}


