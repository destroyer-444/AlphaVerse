import PageLayout from "@/components/layout/PageLayout";

export default function CompaniesPage() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Companies
          </h1>
          <p className="text-lg text-zinc-400">
            Company profiles and analysis.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
