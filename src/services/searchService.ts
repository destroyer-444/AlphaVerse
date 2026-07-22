import { Company } from "@/types/company";
import { NewsArticle } from "@/types/news";
import { MarketCard } from "@/types/market";
import { companyService } from "./companyService";
import { newsService } from "./newsService";
import { marketService } from "./marketService";

export interface SearchResult {
  type: "company" | "news" | "market";
  id: string;
  title: string;
  subtitle?: string;
  url: string;
}

export const searchService = {
  searchMarkets: async (query: string): Promise<MarketCard[]> => {
    const lowerQuery = query.toLowerCase();
    const allMarkets = await marketService.getAllMarkets();
    
    const results: MarketCard[] = [];
    
    allMarkets.majorIndices.forEach((market) => {
      if (market.name.toLowerCase().includes(lowerQuery)) {
        results.push(market);
      }
    });
    
    allMarkets.currencies.forEach((currency) => {
      if (currency.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          name: currency.name,
          flag: "",
          price: currency.price,
          change: currency.change,
          isPositive: currency.isPositive,
        });
      }
    });
    
    allMarkets.commodities.forEach((commodity) => {
      if (commodity.name.toLowerCase().includes(lowerQuery)) {
        results.push({
          name: commodity.name,
          flag: "",
          price: commodity.price,
          change: commodity.change,
          isPositive: commodity.isPositive,
        });
      }
    });
    
    allMarkets.crypto.forEach((crypto) => {
      if (crypto.name.toLowerCase().includes(lowerQuery) || crypto.symbol.toLowerCase().includes(lowerQuery)) {
        results.push({
          name: crypto.name,
          flag: "",
          price: crypto.price,
          change: crypto.change,
          isPositive: crypto.isPositive,
        });
      }
    });
    
    return results;
  },

  searchCompanies: (query: string): Company[] => {
    return companyService.searchCompanies(query);
  },

  searchNews: (query: string): NewsArticle[] => {
    const lowerQuery = query.toLowerCase();
    const allNews = newsService.getAllNews();
    
    const results: NewsArticle[] = [];
    
    allNews.latestNews.forEach((article) => {
      if (
        article.headline.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push(article);
      }
    });
    
    allNews.aiNewsItems.forEach((article) => {
      if (
        article.headline.toLowerCase().includes(lowerQuery) ||
        article.summary.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery)
      ) {
        results.push(article);
      }
    });
    
    return results;
  },

  searchAll: async (query: string): Promise<SearchResult[]> => {
    const results: SearchResult[] = [];

    const companies = companyService.searchCompanies(query);
    companies.forEach((company) => {
      results.push({
        type: "company",
        id: company.symbol,
        title: company.name,
        subtitle: company.symbol,
        url: `/companies/${company.symbol}`,
      });
    });

    const news = searchService.searchNews(query);
    news.forEach((article, index) => {
      results.push({
        type: "news",
        id: `news-${index}`,
        title: article.headline,
        subtitle: article.category,
        url: "/news",
      });
    });

    const markets = await searchService.searchMarkets(query);
    markets.forEach((market, index) => {
      results.push({
        type: "market",
        id: `market-${index}`,
        title: market.name,
        subtitle: market.price,
        url: "/markets",
      });
    });

    return results;
  },
};
