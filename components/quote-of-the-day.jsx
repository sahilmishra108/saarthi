"use client";

import React, { useState, useEffect } from 'react';
import { Quote, RefreshCw, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/quote-of-the-day');
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      setQuote(data);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to load quote');
      // Set a fallback quote
      setQuote({
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleRefresh = () => {
    fetchQuote();
  };

  if (loading) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/30 shadow-2xl rounded-3xl p-6 animate-pulse">
        <CardContent className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[--accent] to-[--primary] rounded-full flex items-center justify-center">
            <Quote className="w-6 h-6 text-[--primary-foreground]" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-[--muted] rounded w-3/4"></div>
            <div className="h-3 bg-[--muted] rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !quote) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/30 shadow-2xl rounded-3xl p-6">
        <CardContent className="text-center text-[--muted-foreground]">
          <p>Unable to load quote</p>
          <button 
            onClick={handleRefresh}
            className="mt-2 text-[--accent] hover:text-[--accent-foreground] transition-colors"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-[--background]/80 to-[--card]/90 border border-[--accent]/30 shadow-2xl rounded-3xl p-6 hover:border-[--accent] hover:shadow-[0_8px_32px_0_rgba(255,215,0,0.15)] transition-all duration-300 group">
      <CardContent className="relative">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[--accent] to-[--primary] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_0_rgba(255,215,0,0.3)] transition-all duration-300">
            <Quote className="w-6 h-6 text-[--primary-foreground]" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[--accent]" />
                <span className="text-sm font-medium text-[--accent] uppercase tracking-wide">
                  Quote of the Day
                </span>
              </div>
              
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full hover:bg-[--accent]/10 transition-colors duration-200 group/btn"
                title="Get new quote"
              >
                <RefreshCw className="w-4 h-4 text-[--muted-foreground] group-hover/btn:text-[--accent] transition-colors duration-200" />
              </button>
            </div>
            
            <blockquote className="text-lg font-medium text-[--foreground] leading-relaxed italic">
              "{quote?.quote}"
            </blockquote>
            
            <div className="flex items-center justify-between">
              <cite className="text-sm text-[--accent] font-semibold not-italic">
                — {quote?.author}
              </cite>
              
              {quote?.category && (
                <span className="px-3 py-1 bg-gradient-to-r from-[--accent]/20 to-[--primary]/20 text-xs font-medium text-[--accent] rounded-full border border-[--accent]/30">
                  {quote.category}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 