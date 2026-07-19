import PageLayout from "@/components/layout/PageLayout";

export default function NewsPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            News
          </h1>
          <p className="text-lg text-zinc-400">
            AI-powered financial news and insights.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
