import { Company } from "@/types/company";

export interface ICompanyDataProvider {
  getCompany(symbol: string, fallback: Company): Promise<Company | undefined>;
}
