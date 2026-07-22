import {
  NewsArticle,
  FeaturedStory,
  TrendingTopic,
  MostReadArticle,
  MarketBriefItem,
  NewsCategory,
} from "@/types/news";
import {
  featuredStory,
  latestNews,
  trendingTopics,
  mostRead,
  marketBrief,
  newsCategories,
  aiNewsItems,
} from "@/data/news";

export const newsService = {
  getFeaturedStory: (): FeaturedStory => {
    return featuredStory;
  },

  getLatestNews: (): NewsArticle[] => {
    return latestNews;
  },

  getTrendingTopics: (): TrendingTopic[] => {
    return trendingTopics;
  },

  getMostRead: (): MostReadArticle[] => {
    return mostRead;
  },

  getMarketBrief: (): MarketBriefItem[] => {
    return marketBrief;
  },

  getNewsCategories: (): NewsCategory[] => {
    return newsCategories;
  },

  getAINewsItems: (): NewsArticle[] => {
    return aiNewsItems;
  },

  getAllNews: () => {
    return {
      featuredStory,
      latestNews,
      trendingTopics,
      mostRead,
      marketBrief,
      newsCategories,
      aiNewsItems,
    };
  },
};
