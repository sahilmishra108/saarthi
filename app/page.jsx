'use client';

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart2, Briefcase, UserCheck, ShieldCheck, Menu, X, Mail, Phone, MapPin, Twitter, Linkedin, Facebook, Instagram, Github } from "lucide-react";
import AOSInit from "@/components/AOSInit";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import QuoteOfTheDay from "@/components/quote-of-the-day";

export default function LandingPage() {
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
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[--background]/80 border-b border-[--accent]/20 shadow-lg header-scroll transition-all duration-300 ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
                <span className="text-[--primary-foreground] font-bold text-xl">S</span>
              </div>
                              <span className="text-2xl font-bold text-[--primary] group-hover:text-[--accent] transition-colors duration-300">SAARTHI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300">Features</Link>
              <Link href="#quote" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300">Quote</Link>
              <Link href="#analytics" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300">Analytics</Link>
              <Link href="#testimonials" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300">Testimonials</Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" className="text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 font-medium">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300 font-bold">
                    Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <Link href="/dashboard">
                  <Button className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300 font-bold">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-[--accent]/20">
              <nav className="flex flex-col space-y-4">
                <Link href="#features" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Features</Link>
                <Link href="#quote" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Quote</Link>
                <Link href="#analytics" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Analytics</Link>
                <Link href="#testimonials" className="text-[--foreground] hover:text-[--accent] font-medium transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-[--accent]/20">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="ghost" className="w-full text-[--foreground] hover:text-[--accent] hover:bg-[--accent]/10 font-medium justify-start">
                        Sign In
                      </Button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button className="w-full bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg font-bold">
                        Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                  <SignedOut>
                    <Link href="/dashboard">
                      <Button className="w-full bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg font-bold">
                        Get Started
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
      <section className="w-full min-h-[60vh] flex items-center bg-background relative z-10 pt-20 md:pt-24 scroll-fade-in">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-20 py-28 max-w-7xl">
          <div className="flex-1" data-aos="fade-right">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 text-left leading-tight tracking-tight text-[--primary]" style={{letterSpacing: '-0.02em', lineHeight: '1.1'}}>
              Accelerate Your <span className="text-[--accent]">Career</span> with <span className="text-[--accent]">AI</span>
            </h1>
            <p className="text-2xl text-[--muted-foreground] mb-10 max-w-2xl text-left font-normal" style={{lineHeight: '1.5'}}>
              The executive platform for modern professionals: AI-powered coaching, analytics, and job search mastery.
            </p>
            <div className="flex gap-6 mt-6">
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="px-12 py-4 text-xl bg-[--accent] text-[--primary] font-bold shadow-lg hover:shadow-[0_0_32px_0_rgba(255,215,0,0.25)] hover:bg-[--primary-foreground] transition rounded-full">
                    Go to Dashboard <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button size="lg" className="px-12 py-4 text-xl bg-[--accent] text-[--primary] font-bold shadow-lg hover:shadow-[0_0_32px_0_rgba(255,215,0,0.25)] hover:bg-[--primary-foreground] transition rounded-full">
                    Get Started <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </SignInButton>
              </SignedOut>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-12 py-4 text-xl border-[--accent] text-[--accent] font-bold rounded-full hover:bg-[--accent]/10 transition">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center relative" data-aos="fade-left">
            <Image src="/banner.png" width={520} height={340} alt="Professional Banner" className="rounded-3xl shadow-2xl border object-cover max-w-full h-auto" priority />
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="w-full py-20 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            <FeatureCard icon={<BarChart2 className="w-10 h-10" />} title="AI Analytics" desc="Track your growth and benchmark your progress." dataAosDelay={100} />
            <FeatureCard icon={<Briefcase className="w-10 h-10" />} title="Smart Job Search" desc="Find the best roles, tailored to your skills." dataAosDelay={200} />
            <FeatureCard icon={<UserCheck className="w-10 h-10" />} title="Interview Mastery" desc="Practice with real questions and instant feedback." dataAosDelay={300} />
            <FeatureCard icon={<ShieldCheck className="w-10 h-10" />} title="Secure & Private" desc="Your data is encrypted and always yours." dataAosDelay={400} />
          </div>
        </div>
      </section>

      {/* QUOTE OF THE DAY */}
      <section id="quote" className="w-full py-16 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="text-center mb-8" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[--primary] mb-4">
              Daily <span className="text-[--accent]">Inspiration</span>
            </h2>
            <p className="text-lg text-[--muted-foreground]">
              Start your day with motivation and wisdom
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <QuoteOfTheDay />
          </div>
        </div>
      </section>

      {/* VISUAL ANALYTICS WIDGETS */}
      <section id="analytics" className="w-full py-20 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl flex flex-col md:flex-row gap-12 items-center justify-center">
          <Card className="bg-gradient-to-br from-[--primary]/80 to-[--background] border-none shadow-2xl rounded-3xl p-12 flex-1 flex flex-col items-center justify-center min-w-[280px] max-w-[360px] transition-transform duration-300 hover:scale-105" style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.25)'}} data-aos="zoom-in">
            <CardContent className="flex flex-col items-center">
              <DonutChart percent={82} label="Profile Completion" />
              <span className="text-lg font-semibold text-[--muted-foreground] mt-4">Profile Completion</span>
              <span className="text-4xl font-extrabold text-[--accent] mt-1 tracking-tight">82%</span>
            </CardContent>
          </Card>
          <div className="flex flex-col gap-8 flex-1 min-w-[260px]">
            <KPIWidget icon={<BarChart2 className="w-7 h-7 text-[--primary-foreground]" />} label="Applications Sent" value="37" accentBg="from-[--accent] to-[--primary]" dataAosDelay={100} />
            <div className="h-2" />
            <KPIWidget icon={<UserCheck className="w-7 h-7 text-[--primary-foreground]" />} label="Interview Success" value="78%" accentBg="from-[--accent] to-[--primary]" dataAosDelay={200} />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="w-full py-10 bg-background scroll-fade-in" data-aos="fade-up">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <TestimonialCard
              image="https://randomuser.me/api/portraits/men/32.jpg"
              quote="This platform gave me the edge I needed. The analytics and AI coaching are a game-changer for my career."
              name="Alex Johnson"
              role="Senior Product Manager, Microsoft"
              delay={100}
              small
            />
            <TestimonialCard
              image="https://randomuser.me/api/portraits/women/44.jpg"
              quote="The resume builder and interview prep tools are top-notch. I landed my dream job in weeks!"
              name="Priya Patel"
              role="Marketing Director, Global Corp"
              delay={300}
              small
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full px-6 md:px-12 py-24 relative scroll-fade-in" data-aos="fade-up">
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-[--background]/95 to-[--card]/95 border border-[--accent]/20 shadow-xl rounded-2xl p-12 md:p-16">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[--foreground] leading-tight">
                  Ready to accelerate your career?
                </h2>
                <p className="text-lg text-[--muted-foreground] max-w-2xl mx-auto leading-relaxed">
                  Join top professionals using AI to get ahead.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <SignedIn>
                  <Link href="/dashboard" passHref>
                    <Button
                      size="lg"
                      className="h-11 px-8 bg-[--accent] text-[--primary] font-semibold hover:bg-[--primary-foreground] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </SignedIn>
                <SignedOut>
                  <SignInButton>
                    <Button
                      size="lg"
                      className="h-11 px-8 bg-[--accent] text-[--primary] font-semibold hover:bg-[--primary-foreground] transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </SignInButton>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-gradient-to-b from-[--background]/80 to-[--card]/90 border-t border-[--accent]/30 backdrop-blur-xl relative z-10 scroll-fade-in">
        <div className="container mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center shadow-lg">
                  <span className="text-[--primary-foreground] font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold text-[--primary]">SAARTHI</span>
              </div>
              <p className="text-[--muted-foreground] leading-relaxed max-w-xs">
                The executive platform for modern professionals. AI-powered coaching, analytics, and job search mastery.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] flex items-center justify-center text-[--primary-foreground] hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[--accent]">Product</h3>
              <div className="space-y-3">
                <Link href="#features" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Features</Link>
                <Link href="#analytics" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Analytics</Link>
                <Link href="#pricing" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Pricing</Link>
                <Link href="/dashboard" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Dashboard</Link>
                <Link href="/api" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">API</Link>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[--accent]">Company</h3>
              <div className="space-y-3">
                <Link href="/about" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">About Us</Link>
                <Link href="/careers" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Careers</Link>
                <Link href="/blog" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Blog</Link>
                <Link href="/press" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Press</Link>
                <Link href="/partners" className="block text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Partners</Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-[--accent]">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-[--accent]" />
                  <span className="text-[--muted-foreground]">hello@saarthi.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[--accent]" />
                  <span className="text-[--muted-foreground]">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[--accent]" />
                  <span className="text-[--muted-foreground]">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[--accent]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[--muted-foreground] text-sm">
              © 2024 SAARTHI. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Terms of Service</Link>
              <Link href="/cookies" className="text-[--muted-foreground] hover:text-[--accent] transition-colors duration-300">Cookie Policy</Link>
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
      className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/30 shadow-2xl rounded-3xl p-10 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:border-[--accent] hover:shadow-[0_8px_32px_0_rgba(255,215,0,0.15)] group"
      style={{boxShadow:'0 8px 32px 0 rgba(31, 38, 135, 0.18)'}}
      data-aos="zoom-in"
      data-aos-delay={dataAosDelay}
    >
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="mb-5 flex items-center justify-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[--accent] to-[--primary] shadow-lg group-hover:shadow-[0_0_24px_0_rgba(124,58,237,0.25)]">
              {React.cloneElement(icon, { className: 'w-8 h-8 text-[--primary-foreground]' })}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-[--accent] mb-2 tracking-tight drop-shadow-sm">{title}</h3>
          <p className="text-base text-[--foreground]/90 leading-relaxed font-medium drop-shadow-sm">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DonutChart({ percent, label }) {
  // SVG donut chart with gradient stroke and drop shadow
  const radius = 60;
  const stroke = 14;
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
        fontSize="2rem"
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
    <Card className="bg-gradient-to-br from-[--background] to-[--card] border-none shadow-xl rounded-2xl p-8 flex flex-row items-center gap-6 transition-transform duration-300 hover:scale-105" style={{boxShadow:'0 4px 16px 0 rgba(31, 38, 135, 0.15)'}} data-aos="fade-up" data-aos-delay={dataAosDelay}>
      <div className={`rounded-xl p-3 bg-gradient-to-br ${accentBg} shadow-md flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-lg font-semibold text-[--primary] mb-1">{label}</span>
        <span className="text-3xl font-extrabold text-[--accent] tracking-tight">{value}</span>
      </div>
    </Card>
  );
}

function TestimonialCard({ image, quote, name, role, delay, small }) {
  return (
    <Card
      className={`backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl rounded-2xl ${small ? 'p-6' : 'p-12'} flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:border-[--primary]/40 hover:shadow-lg group`}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <CardContent>
        <div className="flex flex-col items-center gap-3">
          <span className={`inline-flex items-center justify-center ${small ? 'w-12 h-12' : 'w-20 h-20'} rounded-full bg-gradient-to-br from-[--primary] to-[--primary]/80 p-1 shadow-md mb-1`}>
            <Image src={image} width={small ? 40 : 72} height={small ? 40 : 72} alt={name} className="rounded-full border-2 border-[--background] object-cover" />
          </span>
          <span className={`text-3xl text-[--primary] mb-1`}>“</span>
          <AnimatedQuote text={quote} small={small} />
          <span className={`font-semibold text-[--primary] ${small ? 'text-base' : 'text-lg'} mt-1`}>{name}</span>
          <span className={`text-xs text-[--muted-foreground] block`}>{role}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function AnimatedQuote({ text, small }) {
  return (
    <span className={`block italic ${small ? 'text-base' : 'text-2xl'} text-[--foreground] mb-2 font-medium leading-relaxed animate-fade-slide-up relative`}>
      <svg className={`inline-block ${small ? 'w-5 h-5' : 'w-7 h-7'} text-[--primary] mr-2 align-text-top`} fill="none" viewBox="0 0 24 24"><path d="M7.17 15A3.001 3.001 0 0 1 4 12c0-2.21 1.79-4 4-4 .34 0 .67.04.99.12A4.992 4.992 0 0 0 4 17h4v-2H7.17ZM17.17 15A3.001 3.001 0 0 1 14 12c0-2.21 1.79-4 4-4 .34 0 .67.04.99.12A4.992 4.992 0 0 0 14 17h4v-2h-0.83Z" fill="currentColor"/></svg>
      {text}
    </span>
  );
}