// screens/MissionsScreen.tsx
import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { loadUser, saveUser, checkBadges } from "../utils/db";
import { Mission, User } from "../utils/types";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";

export default function MissionsScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [adding, setAdding] = useState("");
  const [filter, setFilter] = useState("Todas");

  // Carrega usuário sempre que a tela é focada
  useEffect(() => {
    const unsub = navigation.addListener("focus", async () =>
      setUser(await loadUser())
    );
    return unsub;
  }, [navigation]);

  if (!user)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );

  /* ADICIONAR MISSÃO */
  const addMission = async () => {
    if (!adding.trim()) return Alert.alert("Digite título");

    const newM: Mission = {
      id: `m_${Date.now()}`,
      title: adding.trim(),
      xp: 30,
      cat: "Personalizada",
      desc: "Missão criada pelo colaborador",
    };

    const updated = { ...user, missions: [newM, ...(user.missions || [])] };

    await saveUser(updated);
    setUser(updated);
    setAdding("");
  };

  /* CONCLUIR MISSÃO */
  const complete = async (m: Mission) => {
    let updated = { ...user };

    updated.xp = (updated.xp || 0) + m.xp;
    updated = await checkBadges(updated);

    const nextLevelXP = (updated.level || 1) * 200;
    if (updated.xp >= nextLevelXP) {
      updated.level = (updated.level || 1) + 1;
      Alert.alert("Parabéns!", `Você subiu para o nível ${updated.level}!`);
    }

    updated.missions = updated.missions?.filter((x) => x.id !== m.id);

    await saveUser(updated);
    setUser(updated);

    Alert.alert("Missão concluída", `Você concluiu: ${m.title}\n+${m.xp} XP`);
  };

  /* FILTRAGEM DE MISSÕES */
  const missions = user.missions || [];
  const categories = ["Todas", ...new Set(missions.map((m) => m.cat))];
  const visible =
    filter === "Todas" ? missions : missions.filter((m) => m.cat === filter);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* HEADER */}
        <View style={styles.headerSmall}>
          <Text style={styles.headerSmallTitle}>Mapa de Missões</Text>
          <Text style={styles.headerSmallDesc}>
            Missões pensadas para seu desenvolvimento.
          </Text>
        </View>

        {/* FILTRO */}
        <View style={styles.filterRow}>
          <Picker
            selectedValue={filter}
            onValueChange={setFilter}
            style={{
              color: PALETTE.textDark,
              backgroundColor: "#fff",
              width: "100%",
            }}
            itemStyle={{ color: PALETTE.textDark, fontSize: 16 }}
            dropdownIconColor={PALETTE.textDark}
          >
            {categories.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        {/* LISTA DE MISSÕES */}
        {visible.map((m) => (
          <View key={m.id} style={styles.missionBlock}>
            <View style={{ flex: 1 }}>
              <Text style={styles.missionTitle}>{m.title}</Text>
              <Text style={styles.missionMeta}>
                {m.cat} • +{m.xp} XP
              </Text>
              <Text style={styles.missionDesc}>{m.desc}</Text>
            </View>

            <TouchableOpacity
              style={styles.circleBtn}
              onPress={() => complete(m)}
            >
              <Text style={{ color: "#fff", fontWeight: "900" }}>✓</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* ADICIONAR MISSÃO */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Adicionar missão</Text>

          <TextInput
            style={styles.input}
            value={adding}
            onChangeText={setAdding}
            placeholder="Título da missão..."
            placeholderTextColor={PALETTE.textMuted}
          />

          <TouchableOpacity style={styles.primaryBtn} onPress={addMission}>
            <Text style={styles.primaryText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
