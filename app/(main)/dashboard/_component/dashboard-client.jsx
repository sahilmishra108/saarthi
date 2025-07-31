"use client";

import { useTranslation } from "@/hooks/useTranslation";
import DashboardView from "./dashboard-view";

export default function DashboardClient({ insights }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-6 sm:mb-8 text-center" data-aos="fade-up">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 text-[--primary]">
          {t("dashboard.title")} <span className="text-[--accent]">{t("dashboard.subtitle")}</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[--muted-foreground] max-w-2xl mx-auto px-2">
          Stay updated with the latest trends, salary insights, and career opportunities in your industry
        </p>
      </div>
      <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/20 shadow-2xl rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8" data-aos="fade-up" data-aos-delay="200">
        <DashboardView insights={insights} />
      </div>
    </>
  );
} 