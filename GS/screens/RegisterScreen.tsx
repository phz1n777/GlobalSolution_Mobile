import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StatusBar } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";
import { getUsersDB, saveUsersDB } from "../utils/db";
import { DEFAULT_MISSIONS, User } from "../utils/types";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('Produtividade');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    const db = await getUsersDB();
    const emailNorm = email.trim().toLowerCase();

    if (db.find(u => u.email === emailNorm)) {
      Alert.alert('E-mail já cadastrado');
      setLoading(false);
      return;
    }

    const newUser: User = {
      username: name.trim(),
      email: emailNorm,
      password,
      xp: 0,
      level: 1,
      badges: [],
      missions: DEFAULT_MISSIONS.slice(),
      mentorings: [],
      settings: { focusMode: false },
      profile: { area },
    };

    db.push(newUser);
    await saveUsersDB(db);
    setLoading(false);

    Alert.alert('Conta criada', 'Faça login com seu e-mail e senha.');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar backgroundColor={PALETTE.bg} barStyle="dark-content" />

      <View style={styles.authCenter}>
        <View style={styles.authTop}>
          <Text style={styles.logo}>SkillUpPlus 2030+</Text>
          <Text style={styles.authSubtitle}>Cadastre-se e comece sua jornada</Text>
        </View>

        <ScrollView style={{ width: "100%" }} contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.authCard}>

            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Ex: Ana Silva"
              placeholderTextColor={PALETTE.textMuted}
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="seu@empresa.com"
              placeholderTextColor={PALETTE.textMuted}
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor={PALETTE.textMuted}
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Área de atuação</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={area}
                onValueChange={(v) => setArea(v)}
                style={{
                  width: "100%",
                  color: PALETTE.textDark,       
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

            <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryText}>Criar Conta</Text>
              )}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
