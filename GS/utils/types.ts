// utils/types.ts

export type Mission = {
  id: string;
  title: string;
  xp: number;
  cat: string;
  desc: string;
};

export type Badge = {
  id: string;
  title: string;
  icon: string;
  desc: string;
};

export type User = {
  username: string;
  email: string;
  password?: string;
  xp?: number;
  level?: number;
  badges?: string[];
  missions?: Mission[];
  mentorings?: any[];
  settings?: any;
  profile?: any;
};

export const DEFAULT_MISSIONS: Mission[] = [
  { id: 'm1', title: 'Adaptar relatório para leitores de tela', xp: 50, cat: 'Acessibilidade', desc: 'Transforme um relatório com headings, alt-text e estrutura semântica.' },
  { id: 'm2', title: 'Microautomação: salvar 1 tarefa manual', xp: 60, cat: 'Produtividade', desc: 'Automatize uma pequena tarefa (ex: planilha, e-mail repetitivo).' },
  { id: 'm3', title: 'Rodar sessão de feedback 1:1', xp: 40, cat: 'Soft Skills', desc: 'Realize um feedback estruturado com colega (5 min preparação).' },
  { id: 'm4', title: 'Desenvolver um mini-projeto sustentável', xp: 80, cat: 'Sustentabilidade', desc: 'Proponha uma ação para reduzir desperdício no seu setor.' },
  { id: 'm5', title: 'Criar prompt personalizado de IA', xp: 45, cat: 'IA & Dados', desc: 'Crie um prompt eficaz para uma tarefa real do trabalho.' },

  { id: 'm6', title: 'Converter documento para leitura inclusiva', xp: 55, cat: 'Acessibilidade', desc: 'Aplique estrutura semântica, contraste e navegação via teclado.' },

  { id: 'm7', title: 'Organizar fluxo de trabalho com Kanban', xp: 40, cat: 'Produtividade', desc: 'Monte um quadro Kanban para gerenciar suas tarefas da semana.' },

  { id: 'm8', title: 'Criar mini-dashboard de métricas', xp: 70, cat: 'IA & Dados', desc: 'Use planilha ou ferramenta de BI para visualizar indicadores pessoais.' },

  { id: 'm9', title: 'Treinar comunicação clara em 3 minutos', xp: 30, cat: 'Soft Skills', desc: 'Grave ou apresente uma explicação objetiva sobre um tema técnico.' },

  { id: 'm10', title: 'Melhorar onboarding digital', xp: 65, cat: 'Inclusão Digital', desc: 'Desenvolva um material simples para ensinar um processo digital.' },

  { id: 'm11', title: 'Reduzir 10% do tempo em um processo', xp: 80, cat: 'Produtividade', desc: 'Identifique um processo lento e proponha uma melhoria.' },

  { id: 'm12', title: 'Criar guia de diversidade e respeito', xp: 50, cat: 'Inclusão', desc: 'Escreva um mini-guia com boas práticas para inclusão no ambiente de trabalho.' },

  { id: 'm13', title: 'Aplicar checklist de acessibilidade em site/app', xp: 55, cat: 'Acessibilidade', desc: 'Avalie um site e identifique problemas de contraste ou navegação.' },

  { id: 'm14', title: 'Criar automação simples com IA', xp: 65, cat: 'IA & Dados', desc: 'Use IA para automatizar um resumo, e-mail ou rotina.' },

  { id: 'm15', title: 'Prática de empatia: escuta ativa', xp: 35, cat: 'Soft Skills', desc: 'Realize uma conversa onde você escuta sem interromper e toma notas.' },

  { id: 'm16', title: 'Desafio de sustentabilidade: 1 dia eco-friendly', xp: 40, cat: 'Sustentabilidade', desc: 'Reduza uso de plástico, energia ou papel durante um dia.' },

  { id: 'm17', title: 'Criar modelo de resposta rápida com IA', xp: 45, cat: 'Produtividade', desc: 'Crie respostas automáticas ou templates usando IA generativa.' },

  { id: 'm18', title: 'Melhorar processo de colaboração no time', xp: 50, cat: 'Soft Skills', desc: 'Sugira uma melhoria no fluxo de comunicação interna.' },

  { id: 'm19', title: 'Refatorar material complexo em algo simples', xp: 60, cat: 'Inclusão Digital', desc: 'Transforme um conteúdo difícil em texto simples e acessível.' },
];