import React from "react";
import { View, Text } from "react-native";
import { styles } from "../style/styles";

export default function XPBar({
  xp = 0,
  level = 1,
  style = {},
}: {
  xp?: number;
  level?: number;
  style?: any;
}) {
  const next = level * 200;
  const percent = Math.min(100, Math.round(((xp % next) / next) * 100));

  return (
    <View style={[{ width: "100%" }, style]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.xpHeader}>Nível {level}</Text>
        <Text style={styles.xpHeaderSmall}>{xp} XP</Text>
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progressFg, { width: `${percent}%` }]} />
      </View>

      <Text style={styles.xpFooter}>
        {percent}% até o próximo nível ({next} XP)
      </Text>
    </View>
  );
}
