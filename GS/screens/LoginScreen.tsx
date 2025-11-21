import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";
import { getUsersDB, getActiveSession, setActiveSession } from "../utils/db";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getActiveSession();
      if (session) navigation.replace('MainDrawer');
    })();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Preencha email e senha');
      return;
    }
    setLoading(true);

    const db = await getUsersDB();
    const u = db.find(x => x.email === email.trim().toLowerCase());

    if (!u || u.password !== password) {
      Alert.alert('Login inválido', 'E-mail ou senha incorretos.');
      setLoading(false);
      return;
    }

    await setActiveSession(u.email);
    setLoading(false);
    navigation.replace('MainDrawer');
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <StatusBar backgroundColor={PALETTE.bg} barStyle="dark-content" />

      <View style={styles.authCenter}>
        <View style={styles.authTop}>
          <Text style={styles.logo}>SkillUpPlus 2030+</Text>
          <Text style={styles.authSubtitle}>Aprendizado Gamificado • Inclusão • Desenvolvimento</Text>
        </View>

        <View style={styles.authCard}>
          <Text style={styles.label}>Email</Text>
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

          <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.ghostText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
