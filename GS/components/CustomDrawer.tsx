// components/CustomDrawer.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { PALETTE } from "../style/palette";
import { styles } from "../style/styles";
import { loadUser, clearActiveSession } from "../utils/db";
import Avatar from "./Avatar";
import { User } from "../utils/types";

export default function CustomDrawerContent(props: any) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar sempre que o drawer abrir
  useEffect(() => {
    const load = async () => {
      const u = await loadUser();
      setUser(u ? { ...u } : null);
    };

    load();

    const unsub = props.navigation.addListener("drawerOpen", load);
    return () => unsub && unsub();
  }, [props.navigation]);

  const handleLogout = async () => {
    await clearActiveSession();
    props.navigation.replace("Login");
  };

  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const nextXP = level * 200;
  const percent = Math.min(100, Math.round((xp / nextXP) * 100));

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: PALETTE.bg }}
    >
      {/* TOPO */}
      <View style={styles.drawerTop}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Avatar uri={user?.profile?.avatar} size={64} />

          <View style={{ flex: 1 }}>
            <Text style={styles.drawerName}>{user?.username}</Text>
            <Text style={styles.drawerEmail}>{user?.email}</Text>
            <Text style={styles.drawerMini}>Nível {level} • {xp} XP</Text>
          </View>
        </View>

        {/* Barra XP */}
        <View style={{ marginTop: 12 }}>
          <View style={styles.progressBg}>
            <View style={[styles.progressFg, { width: `${percent}%` }]} />
          </View>
          <Text style={styles.drawerPercent}>
            {percent}% até o próximo nível ({nextXP} XP)
          </Text>
        </View>
      </View>

      {/* MENU */}
      <View style={{ paddingVertical: 6 }}>
        <DrawerItem
          label="Início"
          icon={() => <Feather name="home" size={20} color={PALETTE.textDark} />}
          onPress={() => props.navigation.navigate("Tabs", { screen: "Home" })}
        />

        <DrawerItem
          label="Aprendizagem"
          icon={() => <Feather name="book-open" size={20} color={PALETTE.textDark} />}
          onPress={() => props.navigation.navigate("Tabs", { screen: "Learning" })}
        />

        <DrawerItem
          label="Minha Jornada"
          icon={() => <Feather name="map" size={20} color={PALETTE.textDark} />}
          onPress={() => props.navigation.navigate("Tabs", { screen: "Journey" })}
        />

        <DrawerItem
          label="Central Assistida"
          icon={() => <Feather name="users" size={20} color={PALETTE.textDark} />}
          onPress={() => props.navigation.navigate("Assist")}
        />
      </View>

      <View style={{ flex: 1 }} />

      {/* SAIR */}
      <View style={{ padding: 12 }}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: "#fff", fontWeight: "900" }}>Sair</Text>
        </TouchableOpacity>
      </View>

    </DrawerContentScrollView>
  );
}
