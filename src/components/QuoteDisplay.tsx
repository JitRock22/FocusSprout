
import React, { useState, useEffect } from "react";
import { getRandomQuote } from "@/utils/quotes";

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState(getRandomQuote());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 60000); // Change quote every 60 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-white shadow-lg animate-fade-in">
      <blockquote className="text-lg mb-4 italic">"{quote.text}"</blockquote>
      <cite className="block text-right text-sm text-white/70">— {quote.author}</cite>
    </div>
  );
};

export default QuoteDisplay;
