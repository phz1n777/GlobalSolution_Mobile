// screens/SelfAssessmentScreen.tsx
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { loadUser, saveUser } from "../utils/db";
import { User } from "../utils/types";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";

export default function SelfAssessmentScreen({ navigation }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const questions = [
    { id: 'q1', text: 'Conforto com ferramentas digitais (0-5)' },
    { id: 'q2', text: 'Conhecimento básico em IA (0-5)' },
    { id: 'q3', text: 'Habilidade de comunicação (0-5)' },
    { id: 'q4', text: 'Interesse em sustentabilidade (0-5)' },
    { id: 'q5', text: 'Aptidão para automação / scripts (0-5)' },
  ];

  useEffect(() => {
    (async () => {
      const u = await loadUser();
      setUser(u);
      setResponses(u?.profile?.assessment?.responses || {});
    })();
  }, []);

  const saveAssessment = async () => {
    if (!user) return Alert.alert('Faça login para salvar a autoavaliação');
    const score = Object.values(responses).reduce((s,n) => s + (Number(n)||0), 0);
    user.profile = user.profile || {};
    const avg = score / Object.keys(responses).length;
    const inferred = {
      iaLevel: (responses['q2'] || 0),
      digitalComfort: (responses['q1'] || 0),
      communication: (responses['q3'] || 0),
    };
    user.profile.assessment = { responses, score, avg, inferred, date: new Date().toISOString() };
    const recs: string[] = [];
    if (inferred.iaLevel <= 2) recs.push('IA para iniciantes');
    if (inferred.iaLevel >= 3) recs.push('Trilha IA & Dados');
    if (inferred.digitalComfort <= 2) recs.push('Trilha Produtividade & Automação');
    if (inferred.communication <= 2) recs.push('Trilha Soft Skills');
    user.profile.recommendations = recs;
    await saveUser(user);
    setUser(user);
    Alert.alert('Autoavaliação salva', `Recomendações: ${recs.join(', ')}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: '900', color: PALETTE.textDark }}>Autoavaliação de Competências</Text>
        <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>Responda rapidamente (0 = nunca, 5 = sempre)</Text>
        {questions.map(q => (
          <View key={q.id} style={{ marginTop: 12, backgroundColor: PALETTE.card, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: PALETTE.border }}>
            <Text style={{ color: PALETTE.textDark, fontWeight: '700' }}>{q.text}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {[0,1,2,3,4,5].map(v => (
                <TouchableOpacity key={v} style={{ marginRight: 8, padding: 8, borderRadius: 8, borderWidth: 1, borderColor: responses[q.id] === v ? PALETTE.primary : PALETTE.border, backgroundColor: responses[q.id] === v ? PALETTE.primary : PALETTE.card }} onPress={() => setResponses(prev => ({ ...prev, [q.id]: v }))}>
                  <Text style={{ color: responses[q.id] === v ? '#fff' : PALETTE.textDark }}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={[styles.primaryBtn, { marginTop: 16 }]} onPress={saveAssessment}>
          <Text style={styles.primaryText}>Salvar Autoavaliação</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: '900', color: PALETTE.textDark }}>Recomendações</Text>
          <Text style={{ color: PALETTE.textMuted, marginTop: 8 }}>Com base na sua última avaliação, recomendamos trilhas curtas em:</Text>
          <View style={{ marginTop: 12 }}>
            <View style={{ padding: 10, backgroundColor: PALETTE.card, borderRadius: 8, borderWidth:1, borderColor: PALETTE.border }}>
              <Text style={{ fontWeight: '800', color: PALETTE.primary }}>IA para iniciantes</Text>
              <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>Micro-trilha 3 passos • 45min</Text>
            </View>
            <View style={{ marginTop: 8, padding: 10, backgroundColor: PALETTE.card, borderRadius: 8, borderWidth:1, borderColor: PALETTE.border }}>
              <Text style={{ fontWeight: '800', color: PALETTE.turquoise }}>Produtividade com automação</Text>
              <Text style={{ color: PALETTE.textMuted, marginTop: 6 }}>Micro-trilha 4 passos • 60min</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}