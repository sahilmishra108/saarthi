import AOSInit from "@/components/AOSInit";
import DashboardView from "./_component/dashboard-view";
import { getIndustryInsights } from "@/actions/dashboard";

export default async function DashboardPage() {
  const insights = await getIndustryInsights();

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      <div className="relative z-10 min-h-screen bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 md:px-12">
          <div className="mb-6 sm:mb-8 text-center" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 text-[--primary]">
              Industry <span className="text-[--accent]">Insights</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[--muted-foreground] max-w-2xl mx-auto">
              Stay updated with the latest trends, salary insights, and career opportunities in your industry
            </p>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/20 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8" data-aos="fade-up" data-aos-delay="200">
            <DashboardView insights={insights} />
          </div>
        </div>
      </div>
    </>
  );
} 