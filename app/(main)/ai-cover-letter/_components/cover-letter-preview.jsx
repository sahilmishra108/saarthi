"use client";

import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

export default function CoverLetterPreview({ content }) {
  const handleDownload = () => {
    const element = document.getElementById("cover-letter-content");

    const opt = {
      margin: 0.5,
      filename: "cover-letter.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 }, // sharper PDF
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="mt-6">
      <div
        id="cover-letter-content"
        className="bg-white text-black p-6 rounded-md shadow border max-w-2xl mx-auto whitespace-pre-line"
      >
        {content}
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={handleDownload}>Download PDF</Button>
      </div>
    </div>
  );
}
