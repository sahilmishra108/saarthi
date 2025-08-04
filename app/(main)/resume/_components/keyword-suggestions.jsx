"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Target, 
  TrendingUp, 
  PlusCircle,
  Sparkles,
  Lightbulb,
  Zap,
  Star
} from "lucide-react";
import { toast } from "sonner";

export default function KeywordSuggestions({ resumeContent, onKeywordAdd }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);

  // Industry-specific keyword databases
  const keywordDatabase = {
    "Software Development": {
      technical: [
        "JavaScript", "React", "Node.js", "Python", "Java", "TypeScript", "Angular", "Vue.js",
        "SQL", "MongoDB", "PostgreSQL", "Redis", "AWS", "Azure", "Docker", "Kubernetes",
        "Git", "REST API", "GraphQL", "Microservices", "CI/CD", "DevOps", "Agile", "Scrum",
        "JIRA", "Confluence", "Figma", "Adobe Creative Suite", "Machine Learning", "AI",
        "Data Analysis", "Big Data", "Elasticsearch", "Kafka", "RabbitMQ", "Jenkins",
        "Terraform", "Ansible", "Prometheus", "Grafana", "Selenium", "Jest", "Mocha"
      ],
      soft: [
        "Problem Solving", "Critical Thinking", "Team Collaboration", "Code Review",
        "Technical Documentation", "System Design", "Architecture", "Performance Optimization",
        "Security Best Practices", "Testing", "Debugging", "Version Control"
      ]
    },
    "Data Science": {
      technical: [
        "Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch",
        "Matplotlib", "Seaborn", "Plotly", "Jupyter", "Apache Spark", "Hadoop", "Hive",
        "Kafka", "Elasticsearch", "MongoDB", "PostgreSQL", "AWS", "Azure", "Google Cloud",
        "Docker", "Kubernetes", "Git", "Machine Learning", "Deep Learning", "NLP",
        "Computer Vision", "Statistical Analysis", "A/B Testing", "Data Visualization",
        "ETL", "Data Pipeline", "Feature Engineering", "Model Deployment", "MLOps"
      ],
      soft: [
        "Statistical Analysis", "Data Storytelling", "Business Intelligence", "Research",
        "Problem Solving", "Critical Thinking", "Communication", "Presentation Skills"
      ]
    },
    "Marketing": {
      technical: [
        "Google Analytics", "Google Ads", "Facebook Ads", "LinkedIn Ads", "SEO", "SEM",
        "Email Marketing", "HubSpot", "Salesforce", "Mailchimp", "Hootsuite", "Buffer",
        "Canva", "Adobe Creative Suite", "Figma", "Google Tag Manager", "Hotjar",
        "Optimizely", "Google Data Studio", "Tableau", "Power BI", "Excel", "WordPress"
      ],
      soft: [
        "Digital Marketing", "Content Marketing", "Social Media Marketing", "Brand Management",
        "Campaign Management", "Customer Acquisition", "Lead Generation", "Conversion Optimization",
        "Market Research", "Competitive Analysis", "ROI Analysis", "A/B Testing"
      ]
    },
    "Sales": {
      technical: [
        "Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Microsoft Dynamics", "LinkedIn Sales Navigator",
        "Zoom", "Microsoft Teams", "Slack", "Outreach", "SalesLoft", "Gong", "Chorus",
        "Gong", "Chorus", "Gong", "Chorus", "Gong", "Chorus", "Gong", "Chorus"
      ],
      soft: [
        "Lead Generation", "Prospecting", "Cold Calling", "Sales Presentations", "Negotiation",
        "Relationship Building", "Account Management", "Pipeline Management", "Sales Forecasting",
        "Customer Success", "Solution Selling", "Consultative Selling", "B2B Sales", "B2C Sales"
      ]
    },
    "Project Management": {
      technical: [
        "JIRA", "Confluence", "Asana", "Trello", "Monday.com", "Microsoft Project", "Smartsheet",
        "Slack", "Microsoft Teams", "Zoom", "Miro", "Figma", "Notion", "Airtable",
        "Power BI", "Tableau", "Excel", "Google Sheets", "Google Analytics"
      ],
      soft: [
        "Project Planning", "Risk Management", "Stakeholder Management", "Resource Allocation",
        "Budget Management", "Timeline Management", "Agile", "Scrum", "Kanban", "Waterfall",
        "Team Leadership", "Communication", "Problem Solving", "Decision Making"
      ]
    }
  };

  // Common keywords that are universally valuable
  const universalKeywords = {
    technical: [
      "Microsoft Office", "Google Workspace", "Excel", "PowerPoint", "Word", "Outlook",
      "Google Drive", "Dropbox", "Slack", "Microsoft Teams", "Zoom", "WebEx",
      "Adobe Acrobat", "PDF", "CRM", "ERP", "Database", "API", "Cloud Computing"
    ],
    soft: [
      "Leadership", "Communication", "Teamwork", "Problem Solving", "Critical Thinking",
      "Time Management", "Organization", "Attention to Detail", "Adaptability", "Flexibility",
      "Customer Service", "Collaboration", "Innovation", "Creativity", "Strategic Thinking",
      "Decision Making", "Presentation Skills", "Training", "Mentoring", "Coaching"
    ],
    certifications: [
      "PMP", "CSM", "CSPO", "ITIL", "Six Sigma", "Lean", "AWS Certified", "Azure Certified",
      "Google Cloud", "Salesforce", "HubSpot", "Google Analytics", "Facebook Blueprint"
    ]
  };

  // Analyze resume content and suggest missing keywords
  useEffect(() => {
    if (resumeContent) {
      const suggestions = generateKeywordSuggestions(resumeContent);
      setSuggestedKeywords(suggestions);
    }
  }, [resumeContent]);

  const generateKeywordSuggestions = (content) => {
    if (!content) return [];

    const contentWords = content.toLowerCase().split(/\s+/);
    const suggestions = [];

    // Check universal keywords
    Object.entries(universalKeywords).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        if (!contentWords.some(word => 
          word.includes(lowerKeyword) || lowerKeyword.includes(word)
        )) {
          suggestions.push({
            keyword,
            category,
            priority: category === 'technical' ? 'high' : 'medium',
            source: 'universal'
          });
        }
      });
    });

    // Check industry-specific keywords based on content analysis
    const detectedIndustry = detectIndustry(content);
    if (detectedIndustry && keywordDatabase[detectedIndustry]) {
      Object.entries(keywordDatabase[detectedIndustry]).forEach(([category, keywords]) => {
        keywords.forEach(keyword => {
          const lowerKeyword = keyword.toLowerCase();
          if (!contentWords.some(word => 
            word.includes(lowerKeyword) || lowerKeyword.includes(word)
          )) {
            suggestions.push({
              keyword,
              category,
              priority: category === 'technical' ? 'high' : 'medium',
              source: detectedIndustry
            });
          }
        });
      });
    }

    return suggestions.sort((a, b) => {
      // Sort by priority first, then by source
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.source.localeCompare(b.source);
    });
  };

  const detectIndustry = (content) => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('javascript') || lowerContent.includes('react') || 
        lowerContent.includes('python') || lowerContent.includes('java') ||
        lowerContent.includes('developer') || lowerContent.includes('programming')) {
      return "Software Development";
    }
    
    if (lowerContent.includes('data') || lowerContent.includes('analytics') || 
        lowerContent.includes('machine learning') || lowerContent.includes('statistics')) {
      return "Data Science";
    }
    
    if (lowerContent.includes('marketing') || lowerContent.includes('seo') || 
        lowerContent.includes('social media') || lowerContent.includes('campaign')) {
      return "Marketing";
    }
    
    if (lowerContent.includes('sales') || lowerContent.includes('crm') || 
        lowerContent.includes('prospecting') || lowerContent.includes('revenue')) {
      return "Sales";
    }
    
    if (lowerContent.includes('project') || lowerContent.includes('agile') || 
        lowerContent.includes('scrum') || lowerContent.includes('stakeholder')) {
      return "Project Management";
    }
    
    return null;
  };

  const filteredKeywords = suggestedKeywords.filter(keyword => {
    const matchesSearch = !searchTerm || 
      keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
      keyword.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddKeyword = (keyword) => {
    if (onKeywordAdd) {
      onKeywordAdd(keyword.keyword);
      toast.success(`Added "${keyword.keyword}" to resume suggestions`);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return <Zap className="h-4 w-4" />;
      case 'soft': return <Lightbulb className="h-4 w-4" />;
      case 'certifications': return <Star className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          ATS Keyword Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex gap-2">
          <Input
            placeholder="Search keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="soft">Soft Skills</option>
            <option value="certifications">Certifications</option>
          </select>
        </div>

        {/* Keywords List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredKeywords.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No keyword suggestions available</p>
              <p className="text-sm">Try adding more content to your resume</p>
            </div>
          ) : (
            filteredKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(keyword.category)}
                  <div>
                    <div className="font-medium">{keyword.keyword}</div>
                    <div className="text-sm text-muted-foreground">
                      {keyword.category} • {keyword.source}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={getPriorityColor(keyword.priority)}
                  >
                    {keyword.priority}
                  </Badge>
                  <Button
                    size="sm"
                    onClick={() => handleAddKeyword(keyword)}
                    variant="outline"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {suggestedKeywords.length > 0 && (
          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {filteredKeywords.length} of {suggestedKeywords.length} suggestions
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                {suggestedKeywords.filter(k => k.priority === 'high').length} High Priority
              </Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                {suggestedKeywords.filter(k => k.priority === 'medium').length} Medium Priority
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 