"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import NewsFilterBar from "@/components/news/NewsFilterBar";
import FeaturedStory from "@/components/news/FeaturedStory";
import NewsCard from "@/components/news/NewsCard";
import TrendingTopics from "@/components/news/TrendingTopics";
import MostRead from "@/components/news/MostRead";
import NewsletterCard from "@/components/news/NewsletterCard";
import MarketBrief from "@/components/news/MarketBrief";
import { newsService } from "@/services/newsService";

export default function NewsPage() {
  const latestNews = newsService.getLatestNews();
  return (
    <PageLayout>
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Financial News
            </h1>
            <p className="text-lg text-zinc-400">
              Stay ahead with AI-curated global financial news.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <NewsFilterBar />

          {/* Featured Story */}
          <div className="mb-12">
            <FeaturedStory />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Latest News (75%) */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Latest News</h2>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestNews.map((item, index) => (
                  <motion.div
                    key={item.headline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  >
                    <NewsCard
                      headline={item.headline}
                      summary={item.summary}
                      category={item.category}
                      time={item.time}
                      impact={item.impact}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Sidebar (25%) */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <TrendingTopics />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <MostRead />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <NewsletterCard />
              </motion.div>
            </div>
          </div>

          {/* Market Brief Section */}
          <div className="mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Market Brief</h2>
            </motion.div>
            <MarketBrief />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
