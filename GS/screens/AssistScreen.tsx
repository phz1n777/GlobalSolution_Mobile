// screens/AssistScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";
import { User } from "../utils/types";
import { loadUser, saveUser, checkBadges } from "../utils/db";

export default function AssistScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [mentor, setMentor] = useState("");
  const [notes, setNotes] = useState("");

  // atualiza usuário toda vez que a tela abre
  useEffect(() => {
    const unsub = navigation.addListener("focus", async () =>
      setUser(await loadUser())
    );
    return unsub;
  }, [navigation]);

  // ---------- AÇÕES ----------
  const schedule = async () => {
    if (!mentor.trim()) return Alert.alert("Informe o nome do mentor");

    const u = await loadUser();
    if (!u) return;

    const entry = {
      id: `c_${Date.now()}`,
      mentor: mentor.trim(),
      notes,
      date: new Date().toISOString(),
    };

    u.mentorings = [...(u.mentorings || []), entry];
    await saveUser(u);

    setUser(u);
    setMentor("");
    setNotes("");

    Alert.alert("Agendado", `Mentoria com ${entry.mentor} marcada.`);
  };

  const doCheckIn = async (c: any) => {
    const u = await loadUser();
    if (!u) return;

    u.xp = (u.xp || 0) + 15;
    const updated = await checkBadges(u);

    await saveUser(updated);
    setUser(updated);

    Alert.alert("Check-in realizado", "+15 XP");
  };

  const cancel = async (id: string) => {
    const u = await loadUser();
    if (!u) return;

    u.mentorings = (u.mentorings || []).filter((x) => x.id !== id);
    await saveUser(u);

    setUser(u);
  };

  // ---------- LOADING ----------
  if (!user)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={PALETTE.primary} />
      </SafeAreaView>
    );

  const mentorings = user.mentorings || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* CABEÇALHO */}
        <View style={styles.headerSmall}>
          <Text style={styles.headerSmallTitle}>Central Assistida</Text>
          <Text style={styles.headerSmallDesc}>
            Agende mentorias e realize check-ins.
          </Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.card}>
          <Text style={styles.label}>Nome do mentor</Text>
          <TextInput
            style={styles.input}
            value={mentor}
            onChangeText={setMentor}
            placeholder="Ex: Ana — Inovação"
            placeholderTextColor={PALETTE.textMuted}
          />

          <Text style={[styles.label, { marginTop: 10 }]}>
            Observações (opcional)
          </Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Pontos a tratar"
            placeholderTextColor={PALETTE.textMuted}
          />

          <TouchableOpacity style={styles.primaryBtn} onPress={schedule}>
            <Text style={styles.primaryText}>Agendar Check-in</Text>
          </TouchableOpacity>
        </View>

        {/* LISTA DE CHECK-INS */}
        <View style={styles.card}>
          <Text style={styles.cardHead}>Meus Check-ins</Text>

          {mentorings.length === 0 ? (
            <Text style={styles.cardText}>Nenhum check-in agendado.</Text>
          ) : (
            mentorings.map((c) => (
              <View key={c.id} style={styles.checkRow}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", color: PALETTE.textDark }}>
                    {c.mentor}
                  </Text>
                  <Text style={{ color: PALETTE.textMuted, fontSize: 12 }}>
                    {new Date(c.date).toLocaleString()}
                  </Text>

                  {c.notes ? (
                    <Text style={{ marginTop: 6, color: PALETTE.textMuted }}>
                      {c.notes}
                    </Text>
                  ) : null}
                </View>

                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    style={styles.smallGhost}
                    onPress={() => doCheckIn(c)}
                  >
                    <Text style={{ color: PALETTE.textDark }}>Realizar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.smallGhost, { marginTop: 6 }]}
                    onPress={() => cancel(c.id)}
                  >
                    <Text style={{ color: PALETTE.textDark }}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
