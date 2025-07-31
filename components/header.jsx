"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Briefcase,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LanguageSwitcher from "./language-switcher";
import { useTranslation } from "@/hooks/useTranslation";

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { href: "/resume", icon: FileText, label: t("header.buildResume") },
    { href: "/ai-cover-letter", icon: PenBox, label: t("header.coverLetter") },
    { href: "/interview", icon: GraduationCap, label: t("header.interviewPrep") },
    { href: "/job-tracker", icon: Briefcase, label: t("header.jobTracker") },
    { href: "/analytics", icon: BarChart3, label: t("header.analytics") },
  ];

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-[--primary] hover:text-[--accent] transition-colors duration-300">
              SAARTHI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageSwitcher />
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden xl:inline">{t("header.industryInsights")}</span>
                <span className="xl:hidden">Dashboard</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden xl:inline">{t("header.growthTools")}</span>
                  <span className="xl:hidden">Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navigationItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">{t("header.signIn")}</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden items-center space-x-3">
          <LanguageSwitcher />
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">{t("header.signIn")}</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <SignedIn>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background/95 backdrop-blur-xl border-l border-[--accent]/20">
                <SheetHeader className="border-b border-[--accent]/10 pb-4">
                  <SheetTitle className="text-left text-lg font-bold text-[--primary]">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-left hover:bg-[--accent]/10">
                      <LayoutDashboard className="h-4 w-4 text-[--accent]" />
                      <span className="font-medium">{t("header.industryInsights")}</span>
                    </Button>
                  </Link>
                  
                  <div className="border-t border-[--accent]/10 pt-4 mt-4">
                    <h3 className="text-sm font-medium text-[--muted-foreground] mb-3 px-3">
                      {t("header.growthTools")}
                    </h3>
                    <div className="space-y-1">
                      {navigationItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-left hover:bg-[--accent]/10">
                            <item.icon className="h-4 w-4 text-[--accent]" />
                            <span className="font-medium">{item.label}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">{t("header.signIn")}</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
