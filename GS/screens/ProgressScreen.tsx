// screens/ProgressScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { loadUser } from "../utils/db";
import { User } from "../utils/types";
import { ALL_BADGES } from "../utils/db";
import { PALETTE } from "../style/palette";
import { styles } from "../style/styles";

export default function ProgressScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const u = await loadUser();
      setUser(u);
    })();
  }, []);

  /*  TIMELINE  */
  const timeline = [
    ...(user?.mentorings || []).map((m: any) => ({
      date: m.date,
      title: `Mentoria: ${m.mentor}`,
    })),

    ...(user?.badges || []).map((bId: string) => {
      const b = ALL_BADGES[bId] || { title: bId, icon: "🏆" };
      return {
        date: new Date().toISOString(),
        title: `Badge: ${b.title}`,
      };
    }),

    ...(user?.profile?.enrolled
      ? Object.entries(user.profile.enrolled).map(([cid, info]: any) => ({
          date: info.startedAt || new Date().toISOString(),
          title: `Microcurso iniciado: ${cid}`,
        }))
      : []),

    ...(user?.profile?.assessment
      ? [
          {
            date: user.profile.assessment.date,
            title: `Autoavaliação (score ${user.profile.assessment.score})`,
          },
        ]
      : []),
  ].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  /* XP & LEVEL */
  const xp = user?.xp || 0;
  const level = user?.level || 1;
  const next = level * 200;
  const percent = Math.min(
    100,
    Math.round(((xp % next) / next) * 100)
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "900",
            color: PALETTE.textDark,
          }}
        >
          Progresso & Linha do Tempo
        </Text>

        <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>
          Acompanhe sua evolução, XP e atividades recentes.
        </Text>

        {/* XP CARD */}
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
            Nível {level} • {xp} XP
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
                width: `${percent}%`,
                backgroundColor: PALETTE.turquoise,
              }}
            />
          </View>

          <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>
            {percent}% até o próximo nível ({next} XP)
          </Text>
        </View>

        {/* TIMELINE */}
        <View style={{ marginTop: 16 }}>
          {timeline.length === 0 ? (
            <Text style={{ color: PALETTE.textMuted }}>
              Sem atividades recentes.
            </Text>
          ) : (
            timeline.map((t: any, idx: number) => (
              <View
                key={idx}
                style={{
                  marginTop: 12,
                  backgroundColor: PALETTE.card,
                  padding: 12,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: PALETTE.border,
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    color: PALETTE.textDark,
                  }}
                >
                  {t.title}
                </Text>

                <Text
                  style={{
                    color: PALETTE.textMuted,
                    marginTop: 6,
                  }}
                >
                  {new Date(t.date).toLocaleString()}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
