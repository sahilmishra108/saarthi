"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Linkedin, 
  Copy, 
  Send, 
  Sparkles,
  ExternalLink,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function NetworkingTools({ selectedApplication }) {
  const [emailForm, setEmailForm] = useState({
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    position: '',
    personalNote: ''
  });

  const [linkedinForm, setLinkedinForm] = useState({
    recipientName: '',
    recipientTitle: '',
    companyName: '',
    position: '',
    connectionNote: ''
  });

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [generatedLinkedinMessage, setGeneratedLinkedinMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-fill form when an application is selected
  React.useEffect(() => {
    if (selectedApplication) {
      setEmailForm(prev => ({
        ...prev,
        companyName: selectedApplication.company || '',
        position: selectedApplication.position || '',
        recipientName: selectedApplication.recruiterName || '',
        recipientTitle: 'HR Manager'
      }));
      
      setLinkedinForm(prev => ({
        ...prev,
        companyName: selectedApplication.company || '',
        position: selectedApplication.position || '',
        recipientName: selectedApplication.recruiterName || '',
        recipientTitle: 'HR Manager'
      }));
    }
  }, [selectedApplication]);

  const generateColdEmail = async () => {
    setIsGenerating(true);
    try {
      const email = `Subject: ${emailForm.position} Position at ${emailForm.companyName} - [Your Name]

Dear ${emailForm.recipientName || 'Hiring Manager'},

I hope this email finds you well. My name is [Your Name], and I am writing to express my strong interest in the ${emailForm.position} position at ${emailForm.companyName}.

${emailForm.personalNote ? `\n${emailForm.personalNote}\n` : ''}

I am particularly drawn to ${emailForm.companyName} because of [specific reason]. With my background in [relevant experience], I believe I can contribute significantly to your team.

I have attached my resume for your review, which highlights my relevant experience including:
• [Key achievement 1]
• [Key achievement 2]
• [Key achievement 3]

I would welcome the opportunity to discuss how my skills and experience align with your needs. I am available for a call at your convenience.

Thank you for considering my application.

Best regards,
[Your Name]
[Your Phone Number]
[Your Email]`;

      setGeneratedEmail(email);
    } catch (error) {
      console.error('Error generating email:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLinkedinMessage = async () => {
    setIsGenerating(true);
    try {
      const message = `Hi ${linkedinForm.recipientName || 'there'},

I hope you're doing well! I came across your profile and noticed you work at ${linkedinForm.companyName}. I'm very interested in the ${linkedinForm.position} position that was recently posted, and I was wondering if you'd be open to a brief conversation about the role.

${linkedinForm.connectionNote ? `\n${linkedinForm.connectionNote}\n` : ''}

I have [X] years of experience in [relevant field] and I'm particularly excited about [specific aspect of the company/role]. I'd love to learn more about the team and culture at ${linkedinForm.companyName}.

Would you be available for a quick 15-minute call this week? I'd be happy to work around your schedule.

Thanks for your time!

Best regards,
[Your Name]`;

      setGeneratedLinkedinMessage(message);
    } catch (error) {
      console.error('Error generating LinkedIn message:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Cold Email Generator */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-[--foreground] flex items-center gap-2">
            <Mail className="w-6 h-6 text-[--accent]" />
            Cold Email Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recipient Name</label>
              <Input
                value={emailForm.recipientName}
                onChange={(e) => setEmailForm({...emailForm, recipientName: e.target.value})}
                placeholder="Hiring Manager's name"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recipient Title</label>
              <Input
                value={emailForm.recipientTitle}
                onChange={(e) => setEmailForm({...emailForm, recipientTitle: e.target.value})}
                placeholder="HR Manager, Recruiter, etc."
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Company Name</label>
              <Input
                value={emailForm.companyName}
                onChange={(e) => setEmailForm({...emailForm, companyName: e.target.value})}
                placeholder="Company name"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Position</label>
              <Input
                value={emailForm.position}
                onChange={(e) => setEmailForm({...emailForm, position: e.target.value})}
                placeholder="Job title"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Personal Note (Optional)</label>
            <Textarea
              value={emailForm.personalNote}
              onChange={(e) => setEmailForm({...emailForm, personalNote: e.target.value})}
              placeholder="Add a personal touch or specific reason for interest..."
              className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              rows={3}
            />
          </div>

          <Button 
            onClick={generateColdEmail}
            disabled={isGenerating}
            className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating Email...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Cold Email
              </>
            )}
          </Button>

          {/* Generated Email */}
          {generatedEmail && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[--accent]/10 to-[--primary]/10 border border-[--accent]/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-[--foreground]">Generated Email</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatedEmail)}
                    className="text-xs"
                  >
                    {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:?body=${encodeURIComponent(generatedEmail)}`)}
                    className="text-xs"
                  >
                    <Send className="w-3 h-3" />
                    Open Email
                  </Button>
                </div>
              </div>
              <div className="bg-[--background]/50 p-3 rounded border border-[--primary]/20">
                <pre className="text-sm text-[--foreground] whitespace-pre-wrap font-sans">{generatedEmail}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* LinkedIn Message Generator */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-[--foreground] flex items-center gap-2">
            <Linkedin className="w-6 h-6 text-[#0077B5]" />
            LinkedIn Message Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recipient Name</label>
              <Input
                value={linkedinForm.recipientName}
                onChange={(e) => setLinkedinForm({...linkedinForm, recipientName: e.target.value})}
                placeholder="LinkedIn contact's name"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Recipient Title</label>
              <Input
                value={linkedinForm.recipientTitle}
                onChange={(e) => setLinkedinForm({...linkedinForm, recipientTitle: e.target.value})}
                placeholder="HR Manager, Recruiter, etc."
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Company Name</label>
              <Input
                value={linkedinForm.companyName}
                onChange={(e) => setLinkedinForm({...linkedinForm, companyName: e.target.value})}
                placeholder="Company name"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Position</label>
              <Input
                value={linkedinForm.position}
                onChange={(e) => setLinkedinForm({...linkedinForm, position: e.target.value})}
                placeholder="Job title"
                className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[--muted-foreground] mb-2">Connection Note (Optional)</label>
            <Textarea
              value={linkedinForm.connectionNote}
              onChange={(e) => setLinkedinForm({...linkedinForm, connectionNote: e.target.value})}
              placeholder="Add a personal connection or specific reason..."
              className="bg-[--background]/50 border-[--primary]/20 text-[--foreground]"
              rows={3}
            />
          </div>

          <Button 
            onClick={generateLinkedinMessage}
            disabled={isGenerating}
            className="bg-[#0077B5] text-white hover:bg-[#005885] w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating Message...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate LinkedIn Message
              </>
            )}
          </Button>

          {/* Generated LinkedIn Message */}
          {generatedLinkedinMessage && (
            <div className="mt-6 p-4 bg-gradient-to-r from-[#0077B5]/10 to-[--primary]/10 border border-[#0077B5]/20 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-[--foreground]">Generated LinkedIn Message</h4>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(generatedLinkedinMessage)}
                    className="text-xs"
                  >
                    {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('https://linkedin.com/messaging', '_blank')}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Open LinkedIn
                  </Button>
                </div>
              </div>
              <div className="bg-[--background]/50 p-3 rounded border border-[--primary]/20">
                <pre className="text-sm text-[--foreground] whitespace-pre-wrap font-sans">{generatedLinkedinMessage}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--primary]/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-[--accent]" />
            <h3 className="font-semibold text-[--foreground]">Networking Best Practices</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[--foreground] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[--accent]" />
                Cold Email Tips
              </h4>
              <ul className="text-sm text-[--muted-foreground] space-y-1">
                <li>• Keep emails under 150 words</li>
                <li>• Personalize with company research</li>
                <li>• Include a clear call-to-action</li>
                <li>• Follow up within 3-5 days</li>
                <li>• Use professional email signature</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-[--foreground] mb-2 flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                LinkedIn Tips
              </h4>
              <ul className="text-sm text-[--muted-foreground] space-y-1">
                <li>• Keep messages concise and friendly</li>
                <li>• Mention mutual connections if any</li>
                <li>• Be specific about what you want</li>
                <li>• Respect their time and schedule</li>
                <li>• Follow up politely if no response</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 