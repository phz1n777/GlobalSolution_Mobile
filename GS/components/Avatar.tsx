import React from "react";
import { Image } from "react-native";
import { PALETTE } from "../style/palette";

export default function Avatar({ uri, size = 64 }: { uri?: string; size?: number }) {
  return (
    <Image
      source={{
        uri:
          uri ||
          "https://img.freepik.com/vetores-gratis/cute-rabbit-stretching-yoga-cartoon-vector-icon-ilustracao-esporte-animal-vector-plano-isolado_138676-11390.jpg?w=740&q=80" }}
      style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 2, borderColor: PALETTE.primary}}
    />
  );
}
