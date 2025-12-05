export type Category = 'Mídia Social' | 'Apostas' | 'Streaming' | 'Adulto' | 'Notícias' | 'Personalizada';

export type AccessRule = {
  id: string;
  target: string;
  category: 'Social Media' | 'Gambling' | 'Streaming' | 'Adult' | 'News' | 'Custom';
  action: 'allow' | 'block' | 'limit';
  enabled: boolean;
};

export type NetworkLog = {
  id: string;
  timestamp: string;
  sourceIp: string;
  destination: string;
  status: 'allowed' | 'blocked';
  ruleId?: string;
};

export type RuleSuggestion = {
  id: string;
  description: string;
  basedOn: string;
  rule: Omit<AccessRule, 'id' | 'enabled'>;
};
