import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_components/resume-builder";
import AOSInit from "@/components/AOSInit";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      <div className="relative z-10 min-h-screen bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-6 sm:py-8 px-4 sm:px-6 md:px-12">
          <div className="mb-6 sm:mb-8 text-center" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 text-[--primary]">
              Resume <span className="text-[--accent]">Builder</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[--muted-foreground] max-w-2xl mx-auto">
              Create a professional resume that stands out with our AI-powered builder
            </p>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/20 shadow-2xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8" data-aos="fade-up" data-aos-delay="200">
            <ResumeBuilder initialContent={resume?.content} />
          </div>
        </div>
      </div>
    </>
  );
}