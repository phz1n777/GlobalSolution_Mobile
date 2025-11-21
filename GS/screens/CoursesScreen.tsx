// screens/CoursesScreen.tsx
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { loadUser, saveUser } from "../utils/db";
import { User } from "../utils/types";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";

export default function CoursesScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);

  const [courses] = useState([
    { id: "c1", title: "IA para Iniciantes", steps: 3, duration: 45, tag: "IA" },
    { id: "c2", title: "Microautomação no Trabalho", steps: 4, duration: 60, tag: "Produtividade" },
    { id: "c3", title: "Sustentabilidade Prática", steps: 2, duration: 30, tag: "Sustentabilidade" },
  ]);

  useEffect(() => {
    (async () => {
      const u = await loadUser();
      setUser(u);
    })();
  }, []);

  const enroll = async (c: any) => {
    const u = await loadUser();
    if (!u) return Alert.alert("Faça login para se inscrever");

    u.profile ??= {};
    u.profile.enrolled ??= {};

    u.profile.enrolled[c.id] = {
      title: c.title,
      steps: c.steps,
      duration: c.duration,
      progress: 0,
      startedAt: new Date().toISOString(),
    };

    await saveUser(u);
    setUser(u);
    Alert.alert("Inscrito", `Você foi inscrito em "${c.title}"`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "900", color: PALETTE.textDark }}>
          Trilhas e Microcursos
        </Text>
        <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>
          Cursos curtos, feitos para aprender rápido.
        </Text>

        {courses.map((c) => (
          <View
            key={c.id}
            style={{
              marginTop: 12,
              backgroundColor: PALETTE.card,
              padding: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: PALETTE.border,
            }}
          >
            <Text style={{ fontWeight: "900", color: PALETTE.textDark }}>{c.title}</Text>
            <Text style={{ color: PALETTE.textMuted, marginTop: 4 }}>
              {c.steps} passos • {c.duration} min • {c.tag}
            </Text>

            <View style={{ flexDirection: "row", marginTop: 8, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={styles.smallGhost}
                onPress={() => navigation.navigate("CourseDetail", { course: c })}
              >
                <Text style={{ color: PALETTE.textDark }}>Abrir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.primaryBtn, { marginLeft: 8 }]}
                onPress={() => enroll(c)}
              >
                <Text style={styles.primaryText}>Inscrever</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
