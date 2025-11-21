// screens/CourseDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { loadUser, saveUser } from "../utils/db";
import { User } from "../utils/types";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";

export default function CourseDetailScreen({ route }: any) {
  const { course } = route.params;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const u = await loadUser();
      setUser(u);
    })();
  }, []);

  const markStep = async () => {
    const u = await loadUser();
    if (!u) return Alert.alert("Faça login para acompanhar progresso");

    u.profile ??= {};
    u.profile.enrolled ??= {};

    const e = u.profile.enrolled[course.id] ?? { progress: 0 };
    e.progress = Math.min(course.steps, (e.progress || 0) + 1);

    u.profile.enrolled[course.id] = e;

    await saveUser(u);
    setUser(u);

    Alert.alert("Progresso salvo", `Passo ${e.progress}/${course.steps}`);
  };

  const progress = user?.profile?.enrolled?.[course.id]?.progress || 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: PALETTE.textDark }}>
          {course.title}
        </Text>
        <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>
          {course.steps} passos • {course.duration} min
        </Text>

        {/* STEPS */}
        <View style={{ marginTop: 12 }}>
          {Array.from({ length: course.steps }).map((_, i) => (
            <View
              key={i}
              style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 6,
                  backgroundColor: i < progress ? PALETTE.emerald : PALETTE.border,
                  marginRight: 8,
                }}
              />
              <Text style={{ color: PALETTE.textDark }}>
                Passo {i + 1} – {i < progress ? "Concluído" : "Pendente"}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.primaryBtn, { marginTop: 18 }]}
          onPress={markStep}
        >
          <Text style={styles.primaryText}>Marcar próximo passo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
