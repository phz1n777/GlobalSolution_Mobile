// screens/FocusTimerScreen.tsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";

import { FocusContext } from "../contexts/FocusContext";
import { PALETTE } from "../style/palette";
import { focusTimerStyles } from "../style/styles";

export default function FocusTimerScreen({ navigation }: any) {
  const { focusOn, setFocusOn } = useContext(FocusContext);

  const TIMER_MAP = { pomodoro: 25 * 60, short: 5 * 60, long: 15 * 60 };
  const [mode, setMode] = useState<keyof typeof TIMER_MAP>("pomodoro");
  const [time, setTime] = useState(TIMER_MAP.pomodoro);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<any>(null);

  // troca modo
  useEffect(() => {
    setTime(TIMER_MAP[mode]);
    clearInterval(intervalRef.current);
  }, [mode]);

  // timer
  useEffect(() => {
    clearInterval(intervalRef.current);

    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatted = `${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
    time % 60
  ).padStart(2, "0")}`;

  const changeMode = (m: keyof typeof TIMER_MAP) => {
    setMode(m);
    setRunning(false);
    setTime(TIMER_MAP[m]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: PALETTE.bg }}>
      <View style={focusTimerStyles.container}>

        {/* SAIR */}
        <TouchableOpacity
          style={focusTimerStyles.exitBtn}
          onPress={() => {
            setRunning(false);
            setFocusOn(false);
            navigation.goBack();
          }}
        >
          <Text style={{ color: PALETTE.primary, fontWeight: "900", fontSize: 16 }}>
            Sair do foco
          </Text>
        </TouchableOpacity>

        {/* MODOS */}
        <View style={focusTimerStyles.modesRow}>
          {(["pomodoro", "short", "long"] as const).map((m) => (
            <TouchableOpacity
              key={m}
              style={[
                focusTimerStyles.modeBtn,
                mode === m && focusTimerStyles.modeBtnActive,
              ]}
              onPress={() => changeMode(m)}
            >
              <Text
                style={[
                  focusTimerStyles.modeText,
                  mode === m && focusTimerStyles.modeTextActive,
                ]}
              >
                {m === "pomodoro"
                  ? "Pomodoro"
                  : m === "short"
                  ? "Pausa curta"
                  : "Pausa longa"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TIMER */}
        <Text style={focusTimerStyles.timer}>{formatted}</Text>

        {/* BOTÕES */}
        <View style={focusTimerStyles.controls}>
          <TouchableOpacity
            style={focusTimerStyles.startBtn}
            onPress={() => setRunning((r) => !r)}
          >
            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>
              {running ? "pause" : "start"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={focusTimerStyles.iconBtn}
            onPress={() => {
              setRunning(false);
              setTime(TIMER_MAP[mode]);
            }}
          >
            <Text style={focusTimerStyles.icon}>↻</Text>
          </TouchableOpacity>

          <TouchableOpacity style={focusTimerStyles.iconBtn}>
            <Text style={focusTimerStyles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
