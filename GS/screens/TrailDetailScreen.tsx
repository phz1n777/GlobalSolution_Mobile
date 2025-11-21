// screens/TrailDetailScreen.tsx
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { loadUser, saveUser } from "../utils/db";
import { checkBadges } from "../utils/db";
import { User } from "../utils/types";
import { PALETTE } from "../style/palette";
import { styles } from "../style/styles";

export default function TrailDetailScreen({ route, navigation }: any) {
  const { trail } = route.params;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => setUser(await loadUser()))();
  }, []);

  const completeMission = async (m: any) => {
    const u = await loadUser();
    if (!u) return Alert.alert("Faça login");

    u.profile ??= {};
    u.profile.enrolledTrails ??= {};

    const t = u.profile.enrolledTrails[trail.id] ?? {
      startedAt: new Date().toISOString(),
      progress: 0,
      completedMissions: [],
    };

    t.completedMissions ??= [];

    if (t.completedMissions.includes(m.id))
      return Alert.alert("Missão já concluída");

    t.completedMissions.push(m.id);
    t.progress++;

    u.xp = (u.xp || 0) + m.xp;

    await checkBadges(u);
    u.profile.enrolledTrails[trail.id] = t;

    await saveUser(u);
    setUser(u);

    Alert.alert("Missão concluída", `+${m.xp} XP`);
  };

  const progress =
    user?.profile?.enrolledTrails?.[trail.id]?.progress || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.headerSmallTitle}>{trail.title}</Text>
        <Text style={styles.headerSmallDesc}>{trail.subtitle}</Text>

        {/* Progresso */}
        <View
          style={{
            marginTop: 12,
            backgroundColor: PALETTE.card,
            padding: 12,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: PALETTE.border,
          }}
        >
          <Text style={{ fontWeight: "900", color: PALETTE.textDark }}>
            Progresso: {progress}/{trail.missions.length}
          </Text>

          <View
            style={{
              marginTop: 8,
              height: 12,
              backgroundColor: PALETTE.focusOverlay,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: 12,
                width: `${Math.round(
                  (progress / trail.missions.length) * 100
                )}%`,
                backgroundColor: PALETTE.turquoise,
              }}
            />
          </View>
        </View>

        {/* Missões */}
        <View style={{ marginTop: 16 }}>
          {trail.missions.map((m: any) => (
            <View
              key={m.id}
              style={{
                marginTop: 12,
                backgroundColor: PALETTE.card,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: PALETTE.border,
              }}
            >
              <Text style={{ fontWeight: "800", color: PALETTE.textDark }}>
                {m.title}
              </Text>
              <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>
                {m.desc}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={styles.smallGhost}
                  onPress={() =>
                    navigation.navigate("CourseDetail", { course: m })
                  }
                >
                  <Text style={{ color: PALETTE.textDark }}>Abrir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryBtn, { marginLeft: 8 }]}
                  onPress={() => completeMission(m)}
                >
                  <Text style={styles.primaryText}>Concluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
