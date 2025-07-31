'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, Briefcase, UserCheck, ShieldCheck, Menu, X, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Github, Star, Users, TrendingUp, Award } from "lucide-react";
import AOSInit from "@/components/AOSInit";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import QuoteOfTheDay from "@/components/quote-of-the-day";
import { useTranslation } from "@/hooks/useTranslation";

export default function LandingPage() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effects
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all scroll-fade-in elements
    const fadeElements = document.querySelectorAll('.scroll-fade-in');
    fadeElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <AOSInit />
      <div className="grid-background fixed inset-0 z-0 parallax-bg" />
      
      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[--background]/90 border-b border-[--accent]/20 shadow-lg header-scroll transition-all duration-500 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_30px_0_rgba(255,215,0,0.4)] transition-all duration-500 transform group-hover:scale-110">
                <span className="text-[--primary-foreground] font-bold text-2xl">S</span>
              </div>
              <span className="text-3xl font-bold text-[--primary] group-hover:text-[--accent] transition-colors duration-500 tracking-tight">{t("header.brand")}</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300 hover:scale-105">Features</Link>
              <Link href="#quote" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300 hover:scale-105">Quote</Link>
              <Link href="#analytics" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300 hover:scale-105">Analytics</Link>
              <Link href="#testimonials" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300 hover:scale-105">Testimonials</Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" className="text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 font-medium transition-all duration-300">
                    {t("header.signIn")}
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] hover:from-[--primary] hover:to-[--accent] shadow-lg hover:shadow-[0_0_30px_0_rgba(255,215,0,0.3)] transition-all duration-500 font-bold transform hover:scale-105">
                    {t("header.industryInsights")}
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] hover:from-[--primary] hover:to-[--accent] shadow-lg hover:shadow-[0_0_30px_0_rgba(255,215,0,0.3)] transition-all duration-500 font-bold transform hover:scale-105">
                    {t("home.hero.cta")}
                  </Button>
                </Link>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[--accent]/20">
              <nav className="flex flex-col space-y-4">
                <Link href="#features" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t("home.features.title")}</Link>
                <Link href="#quote" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300" onClick={() => setIsMenuOpen(false)}>Quote</Link>
                <Link href="#analytics" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t("home.analytics.title")}</Link>
                <Link href="#testimonials" className="text-[--foreground] hover:text-[--accent] font-medium transition-all duration-300" onClick={() => setIsMenuOpen(false)}>{t("home.testimonials.title")}</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-[--accent]/20">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="ghost" className="w-full text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 font-medium justify-start transition-all duration-300">
                        {t("header.signIn")}
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] hover:from-[--primary] hover:to-[--accent] shadow-lg font-bold transition-all duration-300">
                        {t("header.industryInsights")}
                      </Button>
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link href="/dashboard">
                      <Button className="w-full bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] hover:from-[--primary] hover:to-[--accent] shadow-lg font-bold transition-all duration-300">
                        {t("home.hero.cta")}
                      </Button>
                    </Link>
                  </SignedOut>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full min-h-[80vh] flex items-center bg-background relative z-10 pt-16 sm:pt-20 md:pt-24 scroll-fade-in">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20 py-16 sm:py-20 md:py-28 max-w-7xl">
          <div className="flex-1 text-center lg:text-left" data-aos="fade-right">
                         <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-yellow-500/20 border border-yellow-400/30 text-yellow-300 text-sm font-medium mb-6">
               <Star className="w-4 h-4 mr-2" />
               Trusted by 10,000+ professionals worldwide
             </div>
                         <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 sm:mb-8 text-center lg:text-left leading-tight tracking-tight bg-gradient-to-r from-white via-blue-100 to-yellow-200 bg-clip-text text-transparent" style={{letterSpacing: '-0.02em', lineHeight: '1.1'}}>
               {t("home.hero.title")}
             </h1>
             <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left font-normal leading-relaxed" style={{lineHeight: '1.6'}}>
               {t("home.hero.subtitle")}
             </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 justify-center lg:justify-start">
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] font-bold shadow-xl hover:shadow-[0_0_40px_0_rgba(255,215,0,0.3)] hover:from-[--primary] hover:to-[--accent] transition-all duration-500 rounded-full transform hover:scale-105">
                    {t("header.industryInsights")} <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button size="lg" className="px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] font-bold shadow-xl hover:shadow-[0_0_40px_0_rgba(255,215,0,0.3)] hover:from-[--primary] hover:to-[--accent] transition-all duration-500 rounded-full transform hover:scale-105">
                    {t("home.hero.cta")} <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </SignInButton>
              </SignedOut>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-10 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl border-2 border-[--accent] text-[--accent] font-bold rounded-full hover:bg-[--accent]/10 hover:border-[--accent]/60 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>
                         <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 text-sm text-gray-400">
               <div className="flex items-center">
                 <Users className="w-4 h-4 mr-2 text-yellow-400" />
                 <span>10K+ Users</span>
               </div>
               <div className="flex items-center">
                 <TrendingUp className="w-4 h-4 mr-2 text-yellow-400" />
                 <span>95% Success Rate</span>
               </div>
               <div className="flex items-center">
                 <Award className="w-4 h-4 mr-2 text-yellow-400" />
                 <span>Industry Leader</span>
               </div>
             </div>
          </div>
                     <div className="flex-1 flex justify-center items-center relative w-full max-w-xl lg:max-w-2xl xl:max-w-3xl" data-aos="fade-left">
             <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-r from-[--accent]/20 to-[--primary]/20 rounded-[2rem] lg:rounded-[3rem] xl:rounded-[4rem] blur-3xl transform scale-110"></div>
               <Image 
                 src="/banner.png" 
                 width={800} 
                 height={600} 
                 alt="Professional Banner" 
                 className="relative rounded-[2rem] lg:rounded-[3rem] xl:rounded-[4rem] shadow-2xl border-2 border-[--accent]/30 object-cover w-full h-auto transform hover:scale-105 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(255,215,0,0.25)]" 
                 priority 
               />
             </div>
           </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="w-full py-20 sm:py-24 md:py-32 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
                     <div className="text-center mb-16">
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
               {t("home.features.title")}
             </h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Everything you need to accelerate your career growth and achieve your professional goals
             </p>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 max-w-6xl mx-auto">
            <FeatureCard icon={<BarChart2 className="w-10 h-10" />} title={t("home.features.analytics")} desc="Advanced analytics and insights to track your career progress and identify growth opportunities." dataAosDelay={100} />
            <FeatureCard icon={<Briefcase className="w-10 h-10" />} title={t("home.features.resume")} desc="AI-powered resume builder that creates compelling, ATS-optimized resumes tailored to your industry." dataAosDelay={200} />
            <FeatureCard icon={<UserCheck className="w-10 h-10" />} title={t("home.features.interview")} desc="Comprehensive interview preparation with real-time feedback and personalized coaching." dataAosDelay={300} />
            <FeatureCard icon={<ShieldCheck className="w-10 h-10" />} title="Enterprise Security" desc="Bank-level security with end-to-end encryption to protect your sensitive career data." dataAosDelay={400} />
          </div>
        </div>
      </section>

      {/* QUOTE OF THE DAY */}
      <section id="quote" className="w-full py-20 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                     <div className="text-center mb-12" data-aos="fade-up">
             <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
               Daily <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Inspiration</span>
             </h2>
             <p className="text-xl text-gray-300">
               Start your day with motivation and wisdom from industry leaders
             </p>
           </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <QuoteOfTheDay />
          </div>
        </div>
      </section>

      {/* VISUAL ANALYTICS WIDGETS */}
      <section id="analytics" className="w-full py-20 sm:py-24 md:py-32 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
                     <div className="text-center mb-16">
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
               {t("home.analytics.title")}
             </h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Real-time insights and data-driven recommendations to optimize your career strategy
             </p>
           </div>
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center justify-center">
            <Card className="bg-gradient-to-br from-[--primary]/90 to-[--background] border-none shadow-2xl rounded-3xl p-10 sm:p-12 md:p-16 flex-1 flex flex-col items-center justify-center w-full max-w-sm lg:max-w-[400px] transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_0_rgba(31,38,135,0.3)]" style={{boxShadow:'0 20px 60px 0 rgba(31, 38, 135, 0.25)'}} data-aos="zoom-in">
              <CardContent className="flex flex-col items-center">
                <DonutChart percent={82} label="Profile Completion" />
                <span className="text-lg sm:text-xl font-semibold text-[--muted-foreground] mt-6">Profile Completion</span>
                <span className="text-4xl sm:text-5xl font-extrabold text-[--accent] mt-2 tracking-tight">82%</span>
              </CardContent>
            </Card>
            <div className="flex flex-col gap-8 sm:gap-10 flex-1 w-full max-w-sm lg:max-w-none">
              <KPIWidget icon={<BarChart2 className="w-8 h-8 sm:w-9 sm:h-9 text-[--primary-foreground]" />} label="Applications Sent" value="37" accentBg="from-[--accent] to-[--primary]" dataAosDelay={100} />
              <div className="h-4" />
              <KPIWidget icon={<UserCheck className="w-8 h-8 sm:w-9 sm:h-9 text-[--primary-foreground]" />} label="Interview Success" value="78%" accentBg="from-[--accent] to-[--primary]" dataAosDelay={200} />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="w-full py-20 sm:py-24 md:py-32 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
                     <div className="text-center mb-16">
             <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
               {t("home.testimonials.title")}
             </h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Hear from professionals who have transformed their careers with SAARTHI
             </p>
           </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard
              image="https://randomuser.me/api/portraits/men/32.jpg"
              quote="This platform gave me the edge I needed. The analytics and AI coaching are a game-changer for my career."
              name="Alex Johnson"
              role="Senior Product Manager, Microsoft"
              delay={100}
            />
            <TestimonialCard
              image="https://randomuser.me/api/portraits/women/44.jpg"
              quote="The resume builder and interview prep tools are top-notch. I landed my dream job in weeks!"
              name="Priya Patel"
              role="Marketing Director, Global Corp"
              delay={200}
            />
            <TestimonialCard
              image="https://randomuser.me/api/portraits/men/67.jpg"
              quote="SAARTHI's career insights helped me make informed decisions and accelerate my professional growth."
              name="David Chen"
              role="Software Engineer, Google"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-20 sm:py-24 md:py-32 relative scroll-fade-in" data-aos="fade-up">
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/95 to-[--card]/95 border border-[--accent]/20 shadow-2xl rounded-3xl p-10 sm:p-12 md:p-16">
            <div className="text-center space-y-8 sm:space-y-10">
              <div className="space-y-4 sm:space-y-6">
                                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight">
                   {t("home.cta.title")}
                 </h2>
                 <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                   {t("home.cta.subtitle")}
                 </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <SignedIn>
                  <Link href="/dashboard" passHref>
                    <Button
                      size="lg"
                      className="h-14 px-8 sm:px-10 bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] font-bold hover:from-[--primary] hover:to-[--accent] transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_0_rgba(255,215,0,0.3)] transform hover:scale-105 rounded-full"
                    >
                      {t("header.industryInsights")}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      size="lg"
                      className="h-14 px-8 sm:px-10 bg-gradient-to-r from-[--accent] to-[--primary] text-[--primary] font-bold hover:from-[--primary] hover:to-[--accent] transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_0_rgba(255,215,0,0.3)] transform hover:scale-105 rounded-full"
                    >
                      {t("home.cta.button")}
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-gradient-to-b from-[--background]/90 to-[--card]/90 border-t border-[--accent]/30 backdrop-blur-xl relative z-10 scroll-fade-in">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
            {/* Company Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center shadow-lg">
                  <span className="text-[--primary-foreground] font-bold text-2xl">S</span>
                </div>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t("header.brand")}</span>
              </div>
                             <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-sm">
                 {t("home.hero.subtitle")}
               </p>
              <div className="flex space-x-4 sm:space-x-5">
                <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_25px_0_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:scale-110">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_25px_0_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_25px_0_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:scale-110">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <Link href="#" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_25px_0_rgba(255,215,0,0.4)] transition-all duration-300 transform hover:scale-110">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-6 sm:space-y-8">
                             <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Product</h3>
              <div className="space-y-3 sm:space-y-4">
                                 <Link href="#features" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">{t("home.features.title")}</Link>
                 <Link href="#analytics" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">{t("home.analytics.title")}</Link>
                 <Link href="#pricing" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">Pricing</Link>
                 <Link href="/dashboard" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">{t("header.industryInsights")}</Link>
                 <Link href="/api" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">API</Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6 sm:space-y-8">
                             <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Company</h3>
              <div className="space-y-3 sm:space-y-4">
                                 <Link href="/about" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">About Us</Link>
                 <Link href="/careers" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">Careers</Link>
                 <Link href="/blog" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">Blog</Link>
                 <Link href="/press" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">Press</Link>
                 <Link href="/partners" className="block text-base sm:text-lg text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">Partners</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
                             <h3 className="text-lg sm:text-xl font-bold text-yellow-400">Contact</h3>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center space-x-3 sm:space-x-4">
                                     <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                                     <span className="text-base sm:text-lg text-gray-300">hello@saarthi.com</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                                     <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                                     <span className="text-base sm:text-lg text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                                     <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                                     <span className="text-base sm:text-lg text-gray-300">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[--accent]/20 mt-12 sm:mt-16 pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                         <div className="text-sm sm:text-base text-gray-400">
               © 2024 {t("header.brand")}. All rights reserved.
             </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-6 sm:gap-8 text-sm sm:text-base">
                             <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-all duration-300">Privacy Policy</Link>
               <Link href="/terms" className="text-gray-400 hover:text-yellow-400 transition-all duration-300">Terms of Service</Link>
               <Link href="/cookies" className="text-gray-400 hover:text-yellow-400 transition-all duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function HeroVisual() {
  // Abstract SVG visual for hero section
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 md:w-80 md:h-80">
      <circle cx="160" cy="160" r="140" fill="#22304a" fillOpacity="0.08" />
      <circle cx="160" cy="160" r="100" fill="#22304a" fillOpacity="0.13" />
      <circle cx="160" cy="160" r="60" fill="#22304a" fillOpacity="0.18" />
    </svg>
  );
}

function FeatureCard({ icon, title, desc, dataAosDelay }) {
  return (
    <Card
      className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/30 shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:border-[--accent] hover:shadow-[0_8px_32px_0_rgba(255,215,0,0.15)] group"
      style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}
      data-aos="zoom-in"
      data-aos-delay={dataAosDelay}
    >
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="mb-4 sm:mb-5 flex items-center justify-center">
            <span className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] shadow-lg group-hover:shadow-[0_0_24px_0_rgba(124,58,237,0.25)]">
              {React.cloneElement(icon, { className: 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[--primary-foreground]' })}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[--accent] mb-2 tracking-tight drop-shadow-sm">{title}</h3>
          <p className="text-sm sm:text-base text-[--foreground]/90 leading-relaxed font-medium drop-shadow-sm">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DonutChart({ percent, label }) {
  // SVG donut chart with gradient stroke and drop shadow
  const radius = 50; // Reduced from 60 for better mobile fit
  const stroke = 12; // Reduced from 14 for better mobile fit
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={radius * 2} height={radius * 2} className="mb-2 drop-shadow-lg">
      <defs>
        <linearGradient id="donutGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#1a237e" />
        </linearGradient>
      </defs>
      <circle
        stroke="#232526"
        fill="none"
        strokeWidth={stroke}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
      <circle
        stroke="url(#donutGradient)"
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        strokeDashoffset={offset}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        style={{ transition: 'stroke-dashoffset 1s' }}
        filter="drop-shadow(0 2px 8px #ffd70033)"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="1.5rem"
        fill="#ffd700"
        fontWeight="bold"
      >
        {percent}%
      </text>
    </svg>
  );
}

function KPIWidget({ icon, label, value, accentBg, dataAosDelay }) {
  return (
    <Card className="bg-gradient-to-br from-[--background] to-[--card] border-none shadow-xl rounded-2xl p-6 sm:p-8 flex flex-row items-center gap-4 sm:gap-6 transition-transform duration-300 hover:scale-105" style={{boxShadow:'0 4px 16px 0 rgba(31, 38, 135, 0.15)'}} data-aos="fade-up" data-aos-delay={dataAosDelay}>
      <div className={`rounded-xl p-2 sm:p-3 bg-gradient-to-br ${accentBg} shadow-md flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-base sm:text-lg font-semibold text-[--primary] mb-1">{label}</span>
        <span className="text-2xl sm:text-3xl font-extrabold text-[--accent] tracking-tight">{value}</span>
      </div>
    </Card>
  );
}

function TestimonialCard({ image, quote, name, role, delay, small }) {
  return (
    <Card
      className={`backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl rounded-2xl ${small ? 'p-4 sm:p-6' : 'p-8 sm:p-12'} flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:border-[--primary]/40 hover:shadow-lg group`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <CardContent>
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <span className={`inline-flex items-center justify-center ${small ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-16 h-16 sm:w-20 sm:h-20'} rounded-full bg-gradient-to-br from-[--primary] to-[--primary]/80 p-1 shadow-md mb-1`}>
            <Image src={image} width={small ? 40 : 72} height={small ? 40 : 72} alt={name} className="rounded-full border-2 border-[--background] object-cover" />
          </span>
          <span className={`text-2xl sm:text-3xl text-[--primary] mb-1`}>"</span>
          <AnimatedQuote text={quote} small={small} />
          <span className={`font-semibold text-[--primary] ${small ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} mt-1`}>{name}</span>
          <span className={`text-xs text-[--muted-foreground] block`}>{role}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function AnimatedQuote({ text, small }) {
  return (
    <span className={`block italic ${small ? 'text-sm sm:text-base' : 'text-lg sm:text-2xl'} text-[--foreground] mb-2 font-medium leading-relaxed animate-fade-slide-up relative`}>
      <svg className={`inline-block ${small ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-6 h-6 sm:w-7 sm:h-7'} text-[--primary] mr-2 align-text-top`} fill="none" viewBox="0 0 24 24"><path d="M7.17 15A3.001 3.001 0 0 1 4 12c0-2.21 1.79-4 4-4 .34 0 .67.04.99.12A4.992 4.992 0 0 0 4 17h4v-2H7.17ZM17.17 15A3.001 3.001 0 0 1 14 12c0-2.21 1.79-4 4-4 .34 0 .67.04.99.12A4.992 4.992 0 0 0 14 17h4v-2h-0.83Z" fill="currentColor"/></svg>
      {text}
    </span>
  );
}