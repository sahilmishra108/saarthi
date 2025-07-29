"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Briefcase, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Building2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  Linkedin,
  Search,
  ExternalLink,
  Download,
  Globe,
  Zap,
  Star,
  Building
} from "lucide-react";

const jobStatuses = [
  { value: 'applied', label: 'Applied', icon: Clock, color: 'text-blue-500' },
  { value: 'interviewing', label: 'Interviewing', icon: AlertCircle, color: 'text-yellow-500' },
  { value: 'offered', label: 'Offered', icon: CheckCircle, color: 'text-green-500' },
  { value: 'rejected', label: 'Rejected', icon: XCircle, color: 'text-red-500' },
  { value: 'accepted', label: 'Accepted', icon: CheckCircle, color: 'text-green-600' }
];

export default function JobTracker() {
  const [applications, setApplications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    status: 'applied',
    appliedDate: '',
    notes: '',
    jobPostingUrl: '',
    recruiterName: '',
    recruiterEmail: ''
  });

  const jobPlatforms = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0077B5',
      url: 'https://linkedin.com/jobs',
      description: 'Professional networking and job opportunities',
      features: ['Company insights', 'Salary data', 'Professional networking']
    },
    {
      name: 'Internshala',
      icon: Zap,
      color: '#FF6B35',
      url: 'https://internshala.com',
      description: 'Internships and entry-level opportunities',
      features: ['Internships', 'Fresher jobs', 'Skill development']
    },
    {
      name: 'Glassdoor',
      icon: Star,
      color: '#0CAA41',
      url: 'https://glassdoor.com/Job',
      description: 'Company reviews and salary insights',
      features: ['Company reviews', 'Salary insights', 'Interview experiences']
    },
    {
      name: 'Instahyre',
      icon: Building,
      color: '#6366F1',
      url: 'https://instahyre.com',
      description: 'AI-powered job matching platform',
      features: ['AI matching', 'Direct hiring', 'Startup focus']
    }
  ];

  // Load applications from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  // Save applications to localStorage
  useEffect(() => {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
  }, [applications]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    setApplications([newApplication, ...applications]);
    setFormData({
      company: '',
      position: '',
      location: '',
      salary: '',
      status: 'applied',
      appliedDate: '',
      notes: '',
      jobPostingUrl: '',
      recruiterName: '',
      recruiterEmail: ''
    });
    setShowForm(false);
  };

  const openJobPlatform = (platform) => {
    window.open(platform.url, '_blank');
  };

  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const getStats = () => {
    const total = applications.length;
    const applied = applications.filter(app => app.status === 'applied').length;
    const interviewing = applications.filter(app => app.status === 'interviewing').length;
    const offered = applications.filter(app => app.status === 'offered').length;
    const accepted = applications.filter(app => app.status === 'accepted').length;
    const rejected = applications.filter(app => app.status === 'rejected').length;
    
    return { total, applied, interviewing, offered, accepted, rejected };
  };

  const stats = getStats();

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-[--primary]" />
            </div>
            <div className="text-2xl font-bold text-[--foreground]">{stats.total}</div>
            <div className="text-sm text-[--muted-foreground]">Total</div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-[--foreground]">{stats.applied}</div>
            <div className="text-sm text-[--muted-foreground]">Applied</div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-[--foreground]">{stats.interviewing}</div>
            <div className="text-sm text-[--muted-foreground]">Interviewing</div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-[--foreground]">{stats.offered}</div>
            <div className="text-sm text-[--muted-foreground]">Offered</div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-[--foreground]">{stats.rejected}</div>
            <div className="text-sm text-[--muted-foreground]">Rejected</div>
          </CardContent>
        </Card>
      </div>

      {/* Find Jobs Section */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-[--foreground] flex items-center gap-2">
            <Search className="w-6 h-6 text-[--accent]" />
            Find Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[--muted-foreground] mb-6 text-center">
            Explore job opportunities across multiple platforms and track your applications
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobPlatforms.map((platform) => {
              const PlatformIcon = platform.icon;
              return (
                <div
                  key={platform.name}
                  onClick={() => openJobPlatform(platform)}
                  className="group cursor-pointer p-6 border border-[--primary]/20 rounded-xl hover:border-[--primary]/40 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-[--background]/50 to-[--card]/50 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                      style={{ backgroundColor: platform.color }}
                    >
                      <PlatformIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[--foreground] group-hover:text-[--accent] transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-[--muted-foreground] mt-1 mb-3">
                        {platform.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {platform.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-[--primary]/10 text-[--primary] rounded-full border border-[--primary]/20"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[--muted-foreground] group-hover:text-[--accent] transition-colors duration-300" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-[--accent]/10 to-[--primary]/10 border border-[--accent]/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[--accent]" />
              <span className="font-medium text-[--foreground]">Pro Tips</span>
            </div>
            <ul className="text-sm text-[--muted-foreground] space-y-1">
              <li>• Use multiple platforms to maximize your job search reach</li>
              <li>• Set up job alerts on each platform for relevant positions</li>
              <li>• Research companies on Glassdoor before applying</li>
              <li>• Network on LinkedIn to increase your visibility</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Add Application Button */}
      <div className="flex justify-center">
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300 font-bold px-8 py-3"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Job Application
        </Button>
      </div>

      {/* Add Application Form */}
      {showForm && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-[--foreground]">Add New Job Application</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Company name"
                    required
                    className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Position</label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    placeholder="Job title"
                    required
                    className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="City, State or Remote"
                    className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Salary Range</label>
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    placeholder="$50k - $80k"
                    className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Applied Date</label>
                  <Input
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({...formData, appliedDate: e.target.value})}
                    className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-2 rounded-md bg-[--background]/50 border border-[--primary]/20 text-[--foreground]"
                  >
                    {jobStatuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Notes</label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Add any notes about this application..."
                  className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                  rows={3}
                />
              </div>

              {/* Job Platform Integration Fields */}
              <div className="border-t border-[--primary]/20 pt-4">
                <h3 className="text-lg font-semibold text-[--foreground] mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[--accent]" />
                  Job Platform Integration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Job Posting URL</label>
                    <Input
                      value={formData.jobPostingUrl}
                      onChange={(e) => setFormData({...formData, jobPostingUrl: e.target.value})}
                      placeholder="https://linkedin.com/jobs/view/... or any job platform URL"
                      className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recruiter Name</label>
                    <Input
                      value={formData.recruiterName}
                      onChange={(e) => setFormData({...formData, recruiterName: e.target.value})}
                      placeholder="Recruiter's name"
                      className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recruiter Email</label>
                    <Input
                      value={formData.recruiterEmail}
                      onChange={(e) => setFormData({...formData, recruiterEmail: e.target.value})}
                      placeholder="recruiter@company.com"
                      className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Platform Source</label>
                    <select
                      className="w-full p-2 rounded-md bg-[--background]/50 border border-[--primary]/20 text-[--foreground]"
                    >
                      <option value="">Select platform</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="internshala">Internshala</option>
                      <option value="glassdoor">Glassdoor</option>
                      <option value="instahyre">Instahyre</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="submit" className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground]">
                  Add Application
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[--foreground] mb-4">Your Applications</h2>
        {applications.length === 0 ? (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 p-8 text-center">
            <Briefcase className="w-12 h-12 text-[--muted-foreground] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[--foreground] mb-2">No applications yet</h3>
            <p className="text-[--muted-foreground]">Start tracking your job applications to see your progress here.</p>
          </Card>
        ) : (
          applications.map(application => {
            const statusInfo = jobStatuses.find(s => s.value === application.status);
            const StatusIcon = statusInfo?.icon || Clock;
            
            return (
              <Card key={application.id} className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 hover:border-[--primary]/40 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-5 h-5 text-[--primary]" />
                        <h3 className="text-lg font-semibold text-[--foreground]">{application.company}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo?.color} bg-opacity-10`}>
                          {statusInfo?.label}
                        </span>
                      </div>
                      <p className="text-[--accent] font-medium mb-2">{application.position}</p>
                      <div className="flex items-center gap-4 text-sm text-[--muted-foreground]">
                        {application.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {application.location}
                          </div>
                        )}
                        {application.salary && (
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {application.salary}
                          </div>
                        )}
                        {application.appliedDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      {application.notes && (
                        <p className="text-sm text-[--muted-foreground] mt-2 italic">"{application.notes}"</p>
                      )}
                      
                      {/* Job Platform Integration Info */}
                      {(application.jobPostingUrl || application.recruiterName || application.recruiterEmail) && (
                        <div className="mt-3 pt-3 border-t border-[--primary]/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="w-4 h-4 text-[--accent]" />
                            <span className="text-sm font-medium text-[--foreground]">Job Platform Integration</span>
                          </div>
                          <div className="space-y-1">
                            {application.jobPostingUrl && (
                              <div className="flex items-center gap-2 text-sm">
                                <ExternalLink className="w-3 h-3 text-[--muted-foreground]" />
                                <a 
                                  href={application.jobPostingUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[--accent] hover:underline"
                                >
                                  View Job Posting
                                </a>
                              </div>
                            )}
                            {application.recruiterName && (
                              <div className="flex items-center gap-2 text-sm">
                                <Users className="w-3 h-3 text-[--muted-foreground]" />
                                <span className="text-[--muted-foreground]">Recruiter: {application.recruiterName}</span>
                              </div>
                            )}
                            {application.recruiterEmail && (
                              <div className="flex items-center gap-2 text-sm">
                                <Globe className="w-3 h-3 text-[--muted-foreground]" />
                                <a 
                                  href={`mailto:${application.recruiterEmail}`}
                                  className="text-[--accent] hover:underline"
                                >
                                  {application.recruiterEmail}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={application.status}
                        onChange={(e) => updateStatus(application.id, e.target.value)}
                        className="p-1 rounded text-xs bg-[--background]/50 border border-[--primary]/20 text-[--foreground]"
                      >
                        {jobStatuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteApplication(application.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
} 