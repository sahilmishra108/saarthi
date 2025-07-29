"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import AOSInit from "@/components/AOSInit";
import { useTranslation } from "@/hooks/useTranslation";

export default function AnalyticsPage() {
  const { t } = useTranslation();
  const [careerProgress, setCareerProgress] = useState(0);
  const [skillScore, setSkillScore] = useState(0);
  const [applicationSuccess, setApplicationSuccess] = useState(0);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCareerProgress(75);
      setSkillScore(82);
      setApplicationSuccess(68);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const skillData = [
    { name: "Technical Skills", score: 85, color: "bg-blue-500" },
    { name: "Communication", score: 78, color: "bg-green-500" },
    { name: "Leadership", score: 72, color: "bg-purple-500" },
    { name: "Problem Solving", score: 88, color: "bg-orange-500" },
    { name: "Teamwork", score: 80, color: "bg-pink-500" }
  ];

  const recentActivities = [
    { type: "application", title: "Applied to Senior Developer at Google", date: "2 hours ago", status: "pending" },
    { type: "interview", title: "Interview scheduled with Microsoft", date: "1 day ago", status: "upcoming" },
    { type: "skill", title: "Completed React.js certification", date: "3 days ago", status: "completed" },
    { type: "resume", title: "Updated resume with new projects", date: "1 week ago", status: "completed" }
  ];

  const careerGoals = [
    { goal: "Land Senior Developer Role", progress: 75, target: "Q2 2024" },
    { goal: "Learn Cloud Technologies", progress: 60, target: "Q3 2024" },
    { goal: "Build Portfolio Projects", progress: 85, target: "Q1 2024" },
    { goal: "Network with Industry Leaders", progress: 45, target: "Ongoing" }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-4 w-4" />;
      case "interview":
        return <Users className="h-4 w-4" />;
      case "skill":
        return <BookOpen className="h-4 w-4" />;
      case "resume":
        return <Award className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--background] via-[--background]/95 to-[--background]/90">
      <AOSInit />
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-background opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-down">
          <h1 className="text-4xl font-bold gradient-title mb-4">{t("analytics.title")}</h1>
          <p className="text-[--muted-foreground] text-lg">
            {t("analytics.subtitle")}
          </p>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
          <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20 hover:border-[--accent]/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[--muted-foreground]">
                {t("analytics.careerProgress")}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[--accent]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[--foreground]">{careerProgress}%</div>
              <Progress value={careerProgress} className="mt-2" />
              <p className="text-xs text-[--muted-foreground] mt-2">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20 hover:border-[--accent]/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[--muted-foreground]">
                {t("analytics.skillScore")}
              </CardTitle>
              <Target className="h-4 w-4 text-[--accent]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[--foreground]">{skillScore}%</div>
              <Progress value={skillScore} className="mt-2" />
              <p className="text-xs text-[--muted-foreground] mt-2">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20 hover:border-[--accent]/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[--muted-foreground]">
                {t("analytics.applicationSuccess")}
              </CardTitle>
              <Award className="h-4 w-4 text-[--accent]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[--foreground]">{applicationSuccess}%</div>
              <Progress value={applicationSuccess} className="mt-2" />
              <p className="text-xs text-[--muted-foreground] mt-2">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
          <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-[--accent]" />
                Skills Analysis
              </CardTitle>
              <CardDescription>
                Your current skill levels and areas for improvement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {skillData.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[--foreground]">{skill.name}</span>
                    <span className="text-sm text-[--muted-foreground]">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-[--muted] rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Career Goals */}
          <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[--accent]" />
                Career Goals Progress
              </CardTitle>
              <CardDescription>
                Track your progress towards career objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[--foreground]">{goal.goal}</span>
                    <Badge variant="outline" className="text-xs">
                      {goal.target}
                    </Badge>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-xs text-[--muted-foreground]">
                    {goal.progress}% complete
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-white/5 backdrop-blur-xl border-[--accent]/20" data-aos="fade-up" data-aos-delay="200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-[--accent]" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Your latest career-related activities and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-[--accent]/10 hover:border-[--accent]/30 transition-all duration-200">
                  <div className="flex items-center gap-3">
                    {getActivityIcon(activity.type)}
                    <div>
                      <p className="text-sm font-medium text-[--foreground]">{activity.title}</p>
                      <p className="text-xs text-[--muted-foreground]">{activity.date}</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {getStatusIcon(activity.status)}
                    <Badge 
                      variant={activity.status === "completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center mt-8 gap-4" data-aos="fade-up" data-aos-delay="300">
          <Button className="bg-gradient-to-r from-[--accent] to-[--accent]/90 text-[--primary] hover:from-[--accent]/90 hover:to-[--accent] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300">
            <BookOpen className="mr-2 h-4 w-4" />
            {t("analytics.updateSkills")}
          </Button>
          <Button variant="outline" className="border-[--accent]/20 text-[--foreground] hover:bg-[--accent]/10">
            <Calendar className="mr-2 h-4 w-4" />
            {t("analytics.setNewGoals")}
          </Button>
          <Button variant="outline" className="border-[--accent]/20 text-[--foreground] hover:bg-[--accent]/10">
            <TrendingUp className="mr-2 h-4 w-4" />
            {t("analytics.viewReport")}
          </Button>
        </div>
      </div>
    </div>
  );
} 