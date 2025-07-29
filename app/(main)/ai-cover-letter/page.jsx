import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";
import AOSInit from "@/components/AOSInit";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      <div className="relative z-10 min-h-screen bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto py-8 px-6 md:px-12">
          <div className="mb-8 text-center" data-aos="fade-up">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[--primary]">
              AI Cover <span className="text-[--accent]">Letters</span>
            </h1>
            <p className="text-xl text-[--muted-foreground] max-w-2xl mx-auto mb-8">
              Generate compelling cover letters tailored to your target roles
            </p>
            <Link href="/ai-cover-letter/new">
              <Button className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300 font-bold px-8 py-3">
                <Plus className="h-5 w-5 mr-2" />
                Create New Cover Letter
              </Button>
            </Link>
          </div>
          <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/20 shadow-2xl rounded-3xl p-8" data-aos="fade-up" data-aos-delay="200">
            <CoverLetterList coverLetters={coverLetters} />
          </div>
        </div>
      </div>
    </>
  );
}