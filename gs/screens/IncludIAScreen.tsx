// screens/IncludIAScreen.tsx
import React, { useState, useRef, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { styles } from "../style/styles";
import { PALETTE } from "../style/palette";

import { FocusContext } from "../contexts/FocusContext";

const API_URL = ""; // deixe vazio para usar mock

export default function IncludIAScreen() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text:
        "Olá! Eu sou IncludIA — posso ajudar com adaptação de textos, sugestões de acessibilidade e micro-feedbacks.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const flatRef = useRef<any>(null);
  const { focusOn } = useContext(FocusContext);

  const push = (sender: string, text: string) =>
    setMessages((prev) => [...prev, { sender, text }]);

  const mockReply = (txt: string) =>
    txt.length < 40
      ? "Sugestão rápida: Simplifique este trecho e use verbos ativos."
      : "Sugestão (demo): Reescreva parágrafos longos em listas e acrescente subtítulos.";

  const send = async () => {
    const txt = input.trim();
    if (!txt) return;

    push("user", txt);
    setInput("");
    setLoading(true);

    try {
      if (!API_URL) {
        await new Promise((r) => setTimeout(r, 600));
        push("ai", mockReply(txt));
      } else {
        const resp = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: txt }),
        });
        const data = await resp.json();
        push("ai", data?.reply || JSON.stringify(data).slice(0, 300));
      }
    } catch {
      push("ai", "Erro ao conectar com a IA.");
    } finally {
      setLoading(false);
      setTimeout(() => flatRef.current?.scrollToEnd?.({ animated: true }), 150);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, focusOn && styles.focusModeBackground]}
    >
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.headerSmallTitle}>IncludIA — Assistente</Text>

        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View
              style={[
                styles.chatRow,
                item.sender === "user" ? styles.chatUser : styles.chatAI,
              ]}
            >
              <Text style={{ color: PALETTE.textDark }}>{item.text}</Text>
            </View>
          )}
          style={{ flex: 1, marginVertical: 12 }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={input}
            onChangeText={setInput}
            placeholder={focusOn ? "Modo foco ativo..." : "Digite sua pergunta"}
            editable={!loading}
            placeholderTextColor={PALETTE.textMuted}
          />

          <TouchableOpacity
            style={[styles.primaryBtn, { marginLeft: 8 }]}
            onPress={send}
            disabled={loading}
          >
            <Text style={styles.primaryText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
