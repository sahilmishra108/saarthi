import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";
import AOSInit from "@/components/AOSInit";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      <div className="relative z-10 min-h-screen bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-8 px-6 md:px-12">
          <div className="mb-8 text-center" data-aos="fade-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[--primary]">
              Interview <span className="text-[--accent]">Preparation</span>
            </h1>
            <p className="text-xl text-[--muted-foreground] max-w-2xl mx-auto">
              Master your interviews with AI-powered practice and real-time feedback
            </p>
          </div>
          <div className="space-y-8" data-aos="fade-up" data-aos-delay="200">
            <StatsCards assessments={assessments} />
            <PerformanceChart assessments={assessments} />
            <QuizList assessments={assessments} />
          </div>
        </div>
      </div>
    </>
  );
}
