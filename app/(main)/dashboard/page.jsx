import AOSInit from "@/components/AOSInit";
import DashboardView from "./_component/dashboard-view";
import { getIndustryInsights } from "@/actions/dashboard";
import DashboardClient from "./_component/dashboard-client";

export default async function DashboardPage() {
  const insights = await getIndustryInsights();

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      <div className="relative z-10 min-h-screen bg-background/80 backdrop-blur-sm pt-4 sm:pt-6">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <DashboardClient insights={insights} />
        </div>
      </div>
    </>
  );
} 