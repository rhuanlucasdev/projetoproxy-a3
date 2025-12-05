import type { AccessRule, NetworkLog, RuleSuggestion } from './types';

export const mockRules: AccessRule[] = [
  { id: 'rule-1', target: 'facebook.com', category: 'Social Media', action: 'block', enabled: true },
  { id: 'rule-2', target: 'youtube.com', category: 'Streaming', action: 'limit', enabled: true },
  { id: 'rule-3', target: 'pokerstars.com', category: 'Gambling', action: 'block', enabled: true },
  { id: 'rule-4', target: 'cnn.com', category: 'News', action: 'allow', enabled: true },
  { id: 'rule-5', target: 'x.com', category: 'Social Media', action: 'block', enabled: false },
  { id: 'rule-6', target: 'netflix.com', category: 'Streaming', action: 'block', enabled: true },
];

export const mockLogs: NetworkLog[] = [
  { id: 'log-1', timestamp: new Date(Date.now() - 2000).toISOString(), sourceIp: '192.168.1.10', destination: 'google.com', status: 'allowed' },
  { id: 'log-2', timestamp: new Date(Date.now() - 5000).toISOString(), sourceIp: '192.168.1.12', destination: 'facebook.com', status: 'blocked', ruleId: 'rule-1' },
  { id: 'log-3', timestamp: new Date(Date.now() - 8000).toISOString(), sourceIp: '192.168.1.10', destination: 'youtube.com', status: 'allowed', ruleId: 'rule-2' },
  { id: 'log-4', timestamp: new Date(Date.now() - 12000).toISOString(), sourceIp: '192.168.1.15', destination: 'pokerstars.com', status: 'blocked', ruleId: 'rule-3' },
  { id: 'log-5', timestamp: new Date(Date.now() - 15000).toISOString(), sourceIp: '192.168.1.10', destination: 'bing.com', status: 'allowed' },
];

export const mockSuggestions: RuleSuggestion[] = [
  {
    id: 'sug-1',
    description: 'Bloquear o acesso ao TikTok para melhorar a produtividade.',
    basedOn: 'Alto uso de tiktok.com durante o horário de trabalho.',
    rule: { target: 'tiktok.com', category: 'Social Media', action: 'block' }
  },
  {
    id: 'sug-2',
    description: 'Limitar o acesso ao Reddit a 1 hora por dia.',
    basedOn: 'Uso moderado e consistente de reddit.com.',
    rule: { target: 'reddit.com', category: 'Social Media', action: 'limit' }
  }
];

export const mockChartData = {
  accessOverTime: [
    { name: 'Segunda', permitido: 4000, bloqueado: 240 },
    { name: 'Terça', permitido: 3000, bloqueado: 139 },
    { name: 'Quarta', permitido: 2000, bloqueado: 980 },
    { name: 'Quinta', permitido: 2780, bloqueado: 390 },
    { name: 'Sexta', permitido: 1890, bloqueado: 480 },
    { name: 'Sábado', permitido: 2390, bloqueado: 380 },
    { name: 'Domingo', permitido: 3490, bloqueado: 430 },
  ],
  topBlockedCategories: [
    { name: 'Mídia Social', value: 1250, fill: 'var(--color-chart-1)' },
    { name: 'Apostas', value: 980, fill: 'var(--color-chart-2)' },
    { name: 'Adulto', value: 750, fill: 'var(--color-chart-3)' },
    { name: 'Streaming', value: 480, fill: 'var(--color-chart-4)' },
    { name: 'Outros', value: 300, fill: 'var(--color-chart-5)' },
  ],
  trafficComposition: [
     { name: 'Permitido', value: 88, fill: 'var(--color-chart-1)' },
     { name: 'Bloqueado', value: 12, fill: 'var(--color-chart-2)' },
  ]
};
