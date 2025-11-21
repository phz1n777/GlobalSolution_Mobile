// screens/TrailsScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { loadUser, saveUser } from "../utils/db";
import { User } from "../utils/types";
import { PALETTE } from "../style/palette";
import { styles } from "../style/styles";

export default function TrailsScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);

  const TRAILS = [
    {
      id: "t1",
      title: "IA & Dados",
      subtitle: "Fundamentos práticos",
      color: PALETTE.primary,
      missions: [
        { id: "m1", title: "IA para iniciantes", xp: 50, desc: "Conceitos práticos" },
        { id: "m2", title: "Prompt engineering", xp: 40, desc: "Prompts eficazes" },
        { id: "m3", title: "Mini projeto", xp: 70, desc: "Classificações simples" },
      ],
    },
    {
      id: "t2",
      title: "Produtividade & Automação",
      subtitle: "Economize tempo",
      color: PALETTE.turquoise,
      missions: [
        { id: "m4", title: "Automação de tarefas", xp: 60, desc: "Automatize processos" },
        { id: "m5", title: "Macros e templates", xp: 30, desc: "Templates úteis" },
      ],
    },
    {
      id: "t3",
      title: "Soft Skills",
      subtitle: "Comunicação e colaboração",
      color: PALETTE.emerald,
      missions: [
        { id: "m6", title: "Feedback eficaz", xp: 40, desc: "Feedback 1:1" },
        { id: "m7", title: "Apresentações claras", xp: 50, desc: "Clareza e objetividade" },
      ],
    },
  ];

  useEffect(() => {
    (async () => setUser(await loadUser()))();
  }, []);

  const enrollTrail = async (trail: any) => {
    const u = await loadUser();
    if (!u) return Alert.alert("Faça login para se inscrever");

    u.profile ??= {};
    u.profile.enrolledTrails ??= {};

    if (!u.profile.enrolledTrails[trail.id]) {
      u.profile.enrolledTrails[trail.id] = {
        startedAt: new Date().toISOString(),
        progress: 0,
        completedMissions: [],
      };
      await saveUser(u);
      setUser(u);
      return Alert.alert("Inscrito", `Você entrou na trilha "${trail.title}"`);
    }
    navigation.navigate("TrailDetail", { trail });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Trilhas</Text>
        <Text style={styles.sectionSubtitle}>
          Escolha uma trilha e avance por microcursos.
        </Text>

        {/* Trilhas em carrossel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
        >
          {TRAILS.map((t) => (
            <TouchableOpacity
              key={t.id}
              onPress={() => navigation.navigate("TrailDetail", { trail: t })}
              style={{
                width: 260,
                marginRight: 12,
                backgroundColor: t.color,
                borderRadius: 12,
                padding: 14,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "900", fontSize: 18 }}>
                {t.title}
              </Text>
              <Text style={{ color: "#fff", marginTop: 8 }}>{t.subtitle}</Text>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "800" }}>
                  {t.missions.length} microcursos
                </Text>

                <TouchableOpacity
                  onPress={() => enrollTrail(t)}
                  style={{
                    backgroundColor: "#ffffff33",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "900" }}>
                    {user?.profile?.enrolledTrails?.[t.id]
                      ? "Abrir"
                      : "Inscrever"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Minhas Trilhas */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Minhas Trilhas</Text>
          <Text style={styles.sectionSubtitle}>
            Trilhas que você iniciou aparecem aqui.
          </Text>

          {!user?.profile?.enrolledTrails ||
          Object.keys(user.profile.enrolledTrails).length === 0 ? (
            <Text style={{ color: PALETTE.textMuted, marginTop: 12 }}>
              Você ainda não iniciou trilhas.
            </Text>
          ) : (
            Object.keys(user.profile.enrolledTrails).map((tid) => {
              const trail = TRAILS.find((x) => x.id === tid);
              const info = user.profile.enrolledTrails[tid];

              return (
                <View
                  key={tid}
                  style={{
                    marginTop: 12,
                    backgroundColor: PALETTE.card,
                    padding: 12,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: PALETTE.border,
                  }}
                >
                  <Text style={{ fontWeight: "800", color: PALETTE.textDark }}>
                    {trail?.title}
                  </Text>
                  <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>
                    {trail?.missions.length} microcursos • Iniciado em{" "}
                    {new Date(info.startedAt).toLocaleDateString()}
                  </Text>

                  <View
                    style={{
                      marginTop: 8,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.smallGhost}
                      onPress={() =>
                        navigation.navigate("TrailDetail", { trail })
                      }
                    >
                      <Text style={{ color: PALETTE.textDark }}>Abrir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
