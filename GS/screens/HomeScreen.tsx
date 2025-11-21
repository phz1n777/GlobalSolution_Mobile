import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, StatusBar, } from "react-native";
import { loadUser } from "../utils/db";
import { DEFAULT_MISSIONS, User } from "../utils/types";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";
import { Feather } from "@expo/vector-icons";
import XPBar from "../components/XPBar";

export default function HomeScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário quando a tela for focada
  useEffect(() => {
    const unsub = navigation.addListener("focus", async () =>
      setUser(await loadUser())
    );
    return unsub;
  }, [navigation]);

  // Ajustar statusbar
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
  }, []);

  if (!user)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );

  const firstName = user.username.split(" ")[0];
  const xp = user.xp || 0;
  const level = user.level || 1;

  // recomendações da IA
  const recommendations = DEFAULT_MISSIONS.filter(
    (m) =>
      m.cat.includes(user.profile?.area) || m.cat === "Produtividade"
  ).slice(0, 3);

  const nav = (screen: string, params?: any) =>
    navigation.navigate(screen, params);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Olá, {firstName}! 👋</Text>
          <Text style={styles.heroSubtitle}>
            Aprenda, pratique e evolua com experiências interativas e gamificação.
          </Text>
        </View>

        <View style={styles.dashboardCard}>
          <Text style={styles.cardHead}>Progresso</Text>
          <XPBar xp={xp} level={level} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações</Text>

          {recommendations[0] && (
            <View style={styles.missionCard}>
              <Text style={styles.missionTitle}>{recommendations[0].title}</Text>
              <Text style={styles.missionMeta}>
                {recommendations[0].cat} • +{recommendations[0].xp} XP
              </Text>
              <Text style={styles.missionDesc}>
                {recommendations[0].desc}
              </Text>

              <View style={{ alignItems: "flex-end", marginTop: 8 }}>
                <TouchableOpacity
                  style={styles.smallGhost}
                  onPress={() => nav("Tabs", { screen: "Missions" })}
                >
                  <Text style={{ color: PALETTE.textDark }}>Ver Missões</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso Rápido</Text>

          <View style={styles.bottomGrid}>
            <QuickBtn
              icon="map"
              label="Missões"
              onPress={() =>
                nav("Tabs", {
                  screen: "Learning",
                  params: { open: "missions" },
                })
              }
            />

            <QuickBtn
              icon="message-square"
              label="Autoavaliação"
              onPress={() => nav("SelfAssessment")}
            />

            <QuickBtn
              icon="users"
              label="Assist."
              onPress={() => nav("Assist")}
            />

            <QuickBtn
              icon="user"
              label="Perfil"
              onPress={() => nav("Profile")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickBtn({
  icon,
  label,
  onPress,
}: {
  icon: any;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.gridBtn} onPress={onPress}>
      <Feather name={icon} size={28} color={PALETTE.textDark} />
      <Text style={styles.gridText}>{label}</Text>
    </TouchableOpacity>
  );
}
