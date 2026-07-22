import { Company } from "@/types/company";
import { companies, getCompany as getCompanyData, getAllCompanies as getAllCompaniesData } from "@/data/company";

export const companyService = {
  getCompany: (symbol?: string): Company | undefined => {
    return getCompanyData(symbol);
  },

  getAllCompanies: (): Company[] => {
    return getAllCompaniesData();
  },

  findCompanyByName: (name: string): Company | undefined => {
    return Object.values(companies).find(
      (company) => company.name.toLowerCase() === name.toLowerCase()
    );
  },

  searchCompanies: (query: string): Company[] => {
    const lowerQuery = query.toLowerCase();
    return Object.values(companies).filter(
      (company) =>
        company.name.toLowerCase().includes(lowerQuery) ||
        company.symbol.toLowerCase().includes(lowerQuery) ||
        company.sector.toLowerCase().includes(lowerQuery) ||
        company.industry.toLowerCase().includes(lowerQuery)
    );
  },

  getCompaniesBySector: (sector: string): Company[] => {
    return Object.values(companies).filter(
      (company) => company.sector.toLowerCase() === sector.toLowerCase()
    );
  },

  getCompaniesByIndustry: (industry: string): Company[] => {
    return Object.values(companies).filter(
      (company) => company.industry.toLowerCase() === industry.toLowerCase()
    );
  },

  getCompaniesByCountry: (country: string): Company[] => {
    return Object.values(companies).filter(
      (company) => company.country.toLowerCase() === country.toLowerCase()
    );
  },
};
