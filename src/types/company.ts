export interface Company {
  symbol: string;
  name: string;
  exchange: string;
  country: string;
  sector: string;
  industry: string;
  marketCap: string;
  price: string;
  change: string;
  changePercent: string;
  description: string;
  website: string;
  ceo: string;
  employees: string;
  headquarters: string;
}

export interface CompanyMetric {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface CompanyStat {
  label: string;
  value: string;
  icon?: string;
}
