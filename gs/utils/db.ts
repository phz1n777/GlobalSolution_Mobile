// utils/db.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./types";

// 🔑 keys
const USERS_DB_KEY = '@skillupplus_users_db';
const SESSION_KEY = '@skillupplus_session';

// Buscar todos os usuários
export async function getUsersDB(): Promise<User[]> {
  const raw = await AsyncStorage.getItem(USERS_DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

// Salvar banco de usuários
export async function saveUsersDB(users: User[]) {
  await AsyncStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

// Criar sessão ativa
export async function setActiveSession(email: string) {
  await AsyncStorage.setItem(SESSION_KEY, email);
}

// Buscar sessão ativa
export async function getActiveSession(): Promise<string | null> {
  return await AsyncStorage.getItem(SESSION_KEY);
}

// Remover sessão
export async function clearActiveSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

// Carregar usuário logado
export async function loadUser(): Promise<User | null> {
  const email = await getActiveSession();
  if (!email) return null;
  const db = await getUsersDB();
  return db.find((u) => u.email === email) || null;
}

// Salvar usuário atualizado
export async function saveUser(updatedUser: User) {
  if (!updatedUser?.email) return;
  const db = await getUsersDB();
  const idx = db.findIndex((u) => u.email === updatedUser.email);
  if (idx > -1) {
    db[idx] = updatedUser;
    await saveUsersDB(db);
  }
}

// Badge rules
export const LEVEL_BADGES = [
  { id: "lvl_bronze", title: "Bronze", icon: "🥉", desc: "Atingiu 200 XP." },
  { id: "lvl_silver", title: "Prata", icon: "🥈", desc: "Atingiu 800 XP." },
  { id: "lvl_gold", title: "Ouro", icon: "🥇", desc: "Atingiu 2000 XP." },
];

export const XP_BADGES = [
  { xp: 100, badge: { id: "xp_100", title: "Primeiros Passos", icon: "🌟", desc: "Alcançou 100 XP totais." }},
  { xp: 300, badge: { id: "xp_300", title: "Prodígio Digital", icon: "💡", desc: "Alcançou 500 XP totais." }},
  { xp: 700, badge: { id: "xp_700", title: "Dominante da Plataforma", icon: "🔥", desc: "Alcançou 1000 XP totais." }},
  { xp: 1500, badge: { id: "xp_1500", title: "Lenda da Produtividade", icon: "👑", desc: "Alcançou 2500 XP totais!" }},
];

export const ALL_BADGES: Record<string, any> = {
  ...LEVEL_BADGES.reduce((acc, b) => ({ ...acc, [b.id]: b }), {}),
  ...XP_BADGES.reduce((acc, x) => ({ ...acc, [x.badge.id]: x.badge }), {}),
};

// Aplicar regras de badges no usuário
export async function checkBadges(u: User): Promise<User> {
  if (!u.badges) u.badges = [];

  const xp = u.xp || 0;

  // BADGES DE NÍVEL
  if (xp >= 200 && !u.badges.includes("lvl_bronze")) u.badges.push("lvl_bronze");
  if (xp >= 500 && !u.badges.includes("lvl_silver")) u.badges.push("lvl_silver");
  if (xp >= 1000 && !u.badges.includes("lvl_gold")) u.badges.push("lvl_gold");

  // BADGES POR XP
  for (const entry of XP_BADGES) {
    if (xp >= entry.xp && !u.badges.includes(entry.badge.id)) {
      u.badges.push(entry.badge.id);
    }
  }

  return u;
}
