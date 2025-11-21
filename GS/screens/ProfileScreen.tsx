// screens/ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";
import Avatar from "../components/Avatar";
import { User } from "../utils/types";
import { loadUser, saveUser, ALL_BADGES } from "../utils/db";

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [area, setArea] = useState("Produtividade");

  useEffect(() => {
    (async () => {
      const u = await loadUser();
      setUser(u);
      if (u) {
        setName(u.username);
        setArea(u.profile?.area || "Produtividade");
      }
    })();
  }, []);

  const save = async () => {
    if (!name.trim()) return Alert.alert("Nome inválido");

    const u = await loadUser();
    if (!u) return;

    u.username = name.trim();
    u.profile = u.profile || {};
    u.profile.area = area;

    await saveUser(u);
    setUser(u);
    setEditing(false);
    Alert.alert("Perfil salvo");
  };

  if (!user)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* HEADER */}
        <View style={styles.headerSmall}>
          <Text style={styles.headerSmallTitle}>Perfil</Text>
          <Text style={styles.headerSmallDesc}>Informações do colaborador</Text>
        </View>

        {/* CARD DE PERFIL */}
        <View style={styles.card}>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Avatar uri={user.profile?.avatar} size={80} />

            <View style={{ flex: 1 }}>
              {!editing ? (
                <>
                  <Text
                    style={{
                      fontWeight: "900",
                      fontSize: 18,
                      color: PALETTE.textDark,
                    }}
                  >
                    {user.username}
                  </Text>
                  <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>
                    {user.email}
                  </Text>
                  <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>
                    Área: {user.profile?.area || "—"}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.label}>Nome</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                  />

                  <Text></Text>

                  <Text style={styles.label}>Área</Text>
                  <View style={styles.pickerWrap}>
                    <Picker
                      selectedValue={area}
                      onValueChange={(v) => setArea(v)}
                      style={{
                        color: PALETTE.textDark,
                        backgroundColor: "#fff",
                        width: "100%",
                      }}
                      itemStyle={{
                        color: PALETTE.textDark,
                        fontSize: 16,
                      }}
                      dropdownIconColor={PALETTE.textDark}
                    >
                      <Picker.Item label="Produtividade" value="Produtividade" />
                      <Picker.Item label="Acessibilidade" value="Acessibilidade" />
                      <Picker.Item label="Sustentabilidade" value="Sustentabilidade" />
                      <Picker.Item label="Soft Skills" value="Soft Skills" />
                      <Picker.Item label="IA & Dados" value="IA & Dados" />
                    </Picker>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* BOTÕES */}
          <View style={{ marginTop: 12 }}>
            {!editing ? (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.primaryText}>Editar perfil</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.primaryBtn} onPress={save}>
                  <Text style={styles.primaryText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.ghostBtn, { marginTop: 8 }]}
                  onPress={() => setEditing(false)}
                >
                  <Text style={styles.ghostText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* BADGES */}
        <View style={styles.card}>
          <Text style={styles.cardHead}>Conquistas - Badges</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 12 }}
            style={{ marginTop: 12 }}
          >
            {(user.badges || []).length === 0 ? (
              <Text style={styles.cardText}>Sem badges ainda</Text>
            ) : (
              (user.badges || []).map((b) => {
                const info = ALL_BADGES[b] || { title: b, icon: "🏆" };
                return (
                  <View
                    key={b}
                    style={[
                      styles.badge,
                      {
                        marginRight: 12,
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 22 }}>{info.icon}</Text>

                    <Text
                      style={{
                        fontWeight: "800",
                        marginTop: 6,
                        fontSize: 12,
                        textAlign: "center",
                        width: 80,
                      }}
                    >
                      {info.title}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
