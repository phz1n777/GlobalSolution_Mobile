# **SkillUpPlus 2030+**

Plataforma Digital Gamificada com IA • FIAP — Global Solution

---

## **Integrantes**

* **Larissa Estella Gonçalves dos Santos - RM552695**
* **Joseh Gabriel Trimboli Agra - RM553094**
* **Pedro Henrique de Assumção Lima - RM552746**

---

## **Visão Geral**

**SkillUpPlus 2030+** é uma plataforma móvel desenvolvida em **React Native + Expo**, com foco em:

* Aprendizagem contínua
* IA generativa
* Acessibilidade e inclusão
* Gamificação
* Autodesenvolvimento e microtrilhas
* Assistência e automatização
* Perfil profissional evolutivo

A aplicação integra **trilhas, microcursos, missões, badges, assistente inteligente, autoavaliação e um modo de foco**.
Todos os dados do usuário são persistidos localmente com **AsyncStorage**, incluindo sessão, progresso, XP, níveis e trilhas.

---

# **Arquitetura do Projeto**

```
gs/ 

├── README.md 

├── App.tsx 

├── components/ 

│   ├── Avatar.tsx 

│   ├── CustomDrawer.tsx 

│   └── XPBar.tsx 

├── contexts/ 

│   └── FocusContext.tsx 

├── data/ 

│   └── trails.ts 

├── screens/ 

│   ├── AssistScreen.tsx 

│   ├── CourseDetailScreen.tsx 

│   ├── CoursesScreen.tsx 

│   ├── FocusTimerScreen.tsx 

│   ├── HomeScreen.tsx 

│   ├── IncludIAScreen.tsx 

│   ├── LearningScreen.tsx 

│   ├── LoginScreen.tsx 

│   ├── MissionsScreen.tsx 

│   ├── ProfileScreen.tsx 

│   ├── ProgressScreen.tsx 

│   ├── RegisterScreen.tsx 

│   ├── SelfAssessmentScreen.tsx 

│   ├── TrailDetailScreen.tsx 

│   └── TrailsScreen.tsx 

├── style/ 

│   ├── palette.ts 

│   └── styles.ts 

└── utils/ 

     ├── db.ts 

     └── types.ts 

```

---

#  **Principais Funcionalidades**

##  1. **Autenticação**

* Login
* Registro com persistência de dados
* Sessão ativa salva em AsyncStorage

##  2. **Gamificação Completa**

* Sistema de XP
* Níveis dinâmicos
* Barra de progresso (XPBar)
* Badges automáticos via `checkBadges()`
* Linha do tempo com conquistas

## 3. **Aprendizagem**

Três abas principais:

* **Trilhas**
* **Microcursos**
* **Missões**

Com capacidade de:

* Inscrição
* Progresso
* Acompanhamento
* Conclusão
* Recompensas com XP

## 4. **Autoavaliação**

* 5 questões baseadas em competências
* Sistema de pontuação
* Gera recomendações automáticas
* Guarda o histórico no perfil

## 5. **Minha Jornada**

Exibe:

* Trilhas ativas
* Microcursos ativos
* Missões ativas
* Linha do tempo (badges, mentorias, cursos, avaliações)

## 6. **Central Assistida**

* Agendamento de mentorias
* Check-in com XP
* Histórico completo

## 7. **Perfil do Usuário**

* Nome
* Email
* Avatar (imagem personalizada)
* Área de interesse (Picker configurado p/ iOS e Android)

##  8. **Assistente Inteligente (IncludIA)**

* Chat com IA (mock ou API real)
* Acessibilidade e micro-feedbacks
* Resposta automática caso não exista API configurada

## 9. **Modo Foco **

* Pomodoro
* Pausa curta
* Pausa longa
* Timer funcional
* Persistência do estado (focusMode)
* Integração com o contexto global

---

# **Componentes Utilizados**

| Componente                    | Uso no Projeto                         |
| ----------------------------- | -------------------------------------- |
| **View**                      | Containers, layout das telas           |
| **ScrollView**                | Listas longas, cards e feed da jornada |
| **TextInput**                 | Login, registro, pesquisa, formulários |
| **Text**                      | Títulos, labels, descrições            |
| **Button / TouchableOpacity** | Ações e navegação                      |
| **Image**                     | Foto de perfil e ícones                |
| **StyleSheet**                | Estilização modular                    |
| **Picker**                    | Seleção de área do usuário             |
| **Alert**                     | Mensagens de validação                 |
| **Formulários / Telas**       | Login, registro, avaliações            |
| **Persistência AsyncStorage** | Usuário, sessão, trilhas, XP, níveis   |


---

# **Tecnologias utilizadas**

* **React Native + Expo**
* **TypeScript**
* **AsyncStorage** (persistência)
* **React Navigation** (Stack, Drawer, Tabs, TopTabs)
* **React Context API** (FocusContext)
* **Expo Vector Icons**
* **Picker**


