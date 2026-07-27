import "server-only";
import { CompanyEcosystem } from "@/types/company";
import { relationshipProvider } from "./providers/relationshipProvider";

export class CompanyRelationshipService {
  async getEcosystem(symbol: string): Promise<CompanyEcosystem> {
    return relationshipProvider.getRelationships(symbol);
  }
}

export const companyRelationshipService = new CompanyRelationshipService();
