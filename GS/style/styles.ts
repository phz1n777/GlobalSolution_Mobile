import { StyleSheet } from "react-native";
import { PALETTE } from "./palette";

/*style geral*/
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bg },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: PALETTE.bg },
  authContainer: { flex: 1, backgroundColor: PALETTE.bg, alignItems: "center", paddingTop: 40 },
  authTop: { alignItems: "center", marginBottom: 20 },
  logo: { color: PALETTE.primary, fontSize: 36, fontWeight: "900" },
  authSubtitle: { color: PALETTE.textMuted, marginTop: 6 },
  authCard: { width: "92%", backgroundColor: PALETTE.card, padding: 18, borderRadius: 14, borderWidth: 1, borderColor: PALETTE.border },

  label: { color: PALETTE.textDark, fontWeight: "800", fontSize: 12 },
  input: { backgroundColor: PALETTE.inputBg, borderRadius: 10, padding: 12, marginTop: 6, color: PALETTE.textDark, borderWidth: 1, borderColor: PALETTE.border },

  primaryBtn: { backgroundColor: PALETTE.primary, padding: 12, borderRadius: 12, alignItems: "center", marginTop: 14 },
  primaryText: { color: "#fff", fontWeight: "900" },

  ghostBtn: { marginTop: 12, alignItems: "center" },
  ghostText: { color: PALETTE.textMuted, fontWeight: "700" },

  authCenter: { flex: 1, justifyContent: "center", alignItems: "center", width: "100%", paddingHorizontal: 20, marginTop: 10 },

  /* Hero */
  hero: { backgroundColor: PALETTE.card, padding: 18, borderBottomLeftRadius: 14, borderBottomRightRadius: 14, borderWidth: 1, borderColor: PALETTE.border },
  heroTitle: { color: PALETTE.textDark, fontSize: 20, fontWeight: "900" },
  heroSubtitle: { color: PALETTE.textMuted, marginTop: 6 },

  /* Dashboard */
  dashboardCard: { margin: 10, padding: 10, borderRadius: 14, backgroundColor: PALETTE.card, borderWidth: 1, borderColor: PALETTE.border },
  cardHead: { color: PALETTE.primary, fontWeight: "900", marginBottom: 6 },

  /* Card generico*/
  card: { marginHorizontal: 16, marginTop: 12, backgroundColor: PALETTE.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: PALETTE.border },

  section: { marginTop: 12, paddingHorizontal: 8 },
  sectionTitle: { fontSize: 16, color: PALETTE.primary, fontWeight: "900", marginBottom: 8, paddingHorizontal: 6 },

  missionCard: { backgroundColor: PALETTE.card, padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: PALETTE.border },
  missionTitle: { fontWeight: "900", color: PALETTE.textDark },
  missionMeta: { color: PALETTE.textMuted, fontSize: 12, marginTop: 4 },
  missionDesc: { color: PALETTE.textMuted, marginTop: 6 },

  smallGhost: { backgroundColor: PALETTE.bg, padding: 12, borderRadius: 12, marginTop: 14, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: PALETTE.border },

  /* Grid */
  bottomGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 4 },
  gridBtn: { width: "48%", backgroundColor: PALETTE.primary, padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 8 },
  gridIcon: { fontSize: 28 },
  gridText: { color: "#fff", fontWeight: "900", marginTop: 8 },

  /* XP Bar */
  progressBg: { height: 10, backgroundColor: "#F0F6FA", borderRadius: 8, overflow: "hidden", marginTop: 8, borderWidth: 1, borderColor: PALETTE.border },
  progressFg: { height: 10, backgroundColor: PALETTE.turquoise, borderRadius: 8 },

  xpHeader: { color: PALETTE.textDark, fontWeight: "900" },
  xpHeaderSmall: { color: PALETTE.textMuted, fontWeight: "700" },
  xpFooter: { color: PALETTE.textMuted, marginTop: 6, fontSize: 12 },

  /* Drawer */
  drawerTop: { padding: 16, borderBottomWidth: 1, borderBottomColor: PALETTE.border },
  drawerName: { color: PALETTE.textDark, fontWeight: "900", fontSize: 16 },
  drawerEmail: { color: PALETTE.textMuted, marginTop: 4 },
  drawerMini: { color: PALETTE.textMuted, marginTop: 6 },
  drawerPercent: { color: PALETTE.textMuted, marginTop: 6 },

  logoutBtn: { backgroundColor: "#c53030", padding: 12, borderRadius: 10, alignItems: "center" },

  missionBlock: { flexDirection: "row", alignItems: "center", padding: 12, marginHorizontal: 16, marginVertical: 8, borderRadius: 12, backgroundColor: PALETTE.card, borderWidth: 1, borderColor: PALETTE.border },
  circleBtn: { backgroundColor: PALETTE.primary, width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },

  formCard: { margin: 16, padding: 12, borderRadius: 12, backgroundColor: PALETTE.card, borderWidth: 1, borderColor: PALETTE.border },

  badge: { width: 110, height: 90, borderRadius: 12, backgroundColor: PALETTE.card, marginRight: 12, alignItems: "center", justifyContent: "center", padding: 8 },

  pickerWrap: { backgroundColor: PALETTE.card, borderRadius: 10, marginTop: 6, borderWidth: 1, borderColor: PALETTE.border },

  headerSmall: { padding: 12, marginTop: 8 },
  headerSmallTitle: { color: PALETTE.textDark, fontWeight: "900", fontSize: 22 },
  headerSmallDesc: { color: PALETTE.textMuted, marginTop: 4 },
});

/* JOURNEY SCREEN STYLES */
export const journeyStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: PALETTE.bg },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerBox: { paddingHorizontal: 16, paddingTop: 16, marginBottom: 6 },
  headerTitle: { fontSize: 26, fontWeight: "900", color: PALETTE.textDark },
  headerSubtitle: { fontSize: 15, color: PALETTE.textMuted, marginTop: 4 },

  card: { backgroundColor: "#FFF", borderRadius: 18, padding: 16, marginHorizontal: 16, marginTop: 16, borderWidth: 1, borderColor: "#E7E7E7" },

  sectionTitle: { fontSize: 18, fontWeight: "900", color: PALETTE.primary, marginBottom: 12 },

  itemBox: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#EAEAEA", flexDirection: "row", alignItems: "center" },

  itemTitle: { fontSize: 16, fontWeight: "900", color: PALETTE.textDark },
  itemSub: { fontSize: 14, color: PALETTE.textMuted, marginTop: 6 },

  button: { backgroundColor: PALETTE.primary, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 10 },
  buttonText: { color: "#FFF", fontWeight: "800" },

  emptyText: { color: PALETTE.textMuted, fontStyle: "italic" },

  timelineItem: { flexDirection: "row", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#EEE" },

  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: PALETTE.primary, marginRight: 12, marginTop: 6 },

  timelineTitle: { fontWeight: "900", color: PALETTE.textDark },
  timelineDate: { fontSize: 12, color: PALETTE.textMuted, marginTop: 4 },
});
