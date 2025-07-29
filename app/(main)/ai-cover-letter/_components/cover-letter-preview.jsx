"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";

// Dynamic imports to avoid SSR issues
let html2canvas = null;
if (typeof window !== 'undefined') {
  import("html2canvas").then(module => {
    html2canvas = module.default;
  });
}

export default function CoverLetterPreview({ content }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-content");
      
      if (!element) {
        throw new Error("Content element not found");
      }

      // Use jsPDF directly for more reliable PDF generation
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF('p', 'mm', 'a4');
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      
      // Convert HTML to canvas for better text handling
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - (2 * margin);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      doc.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      doc.save('cover-letter.pdf');
      
    } catch (error) {
      console.error("PDF generation error:", error);
      
      // Fallback to simple text-based PDF
      try {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF('p', 'mm', 'a4');
        
        const text = content || 'Cover letter content not available';
        const lines = doc.splitTextToSize(text, 170);
        
        doc.setFontSize(12);
        doc.text(lines, 20, 20);
        doc.save('cover-letter.pdf');
      } catch (fallbackError) {
        console.error("Fallback PDF generation failed:", fallbackError);
        alert("Failed to generate PDF. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center mb-6">
        <Button 
          onClick={handleDownload} 
          disabled={isGenerating}
          className="bg-[--accent] text-[--primary] hover:bg-[--primary-foreground] shadow-lg hover:shadow-[0_0_20px_0_rgba(255,215,0,0.25)] transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </>
          )}
        </Button>
      </div>

      <div
        id="cover-letter-content"
        className="bg-white text-black p-8 rounded-lg shadow-lg border max-w-3xl mx-auto whitespace-pre-line font-sans text-base leading-relaxed"
        style={{
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.6',
          fontSize: '14px'
        }}
      >
        {content}
      </div>
    </div>
  );
}
