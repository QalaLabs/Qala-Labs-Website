"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItem[];
  isEditing?: boolean;
  onUpdate?: (props: any) => void;
}

const FAQ = ({ 
  title = "Frequently Asked Questions", 
  items = [],
  isEditing,
  onUpdate
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleUpdateItem = (index: number, field: keyof FAQItem, value: string) => {
    if (!onUpdate) return;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ items: newItems });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 
            contentEditable={isEditing}
            onBlur={(e) => onUpdate?.({ title: e.currentTarget.innerText })}
            suppressContentEditableWarning={true}
            className={`text-3xl md:text-5xl font-black text-slate-900 mb-16 text-center outline-none ${isEditing ? 'hover:bg-blue-50/50 focus:bg-blue-50/50 rounded-lg transition-colors' : ''}`}
          >
            {title}
          </h2>
          
          <div className="space-y-4">
            {items.map((item, index) => (
              <div 
                key={index}
                className={`border-2 rounded-3xl transition-all duration-300 ${
                  openIndex === index ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <button
                  onClick={() => !isEditing && setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span 
                    contentEditable={isEditing}
                    onBlur={(e) => handleUpdateItem(index, 'question', e.currentTarget.innerText)}
                    onClick={(e) => isEditing && e.stopPropagation()}
                    suppressContentEditableWarning={true}
                    className={`text-lg md:text-xl font-bold text-slate-900 pr-8 outline-none ${isEditing ? 'hover:bg-blue-100/50 focus:bg-blue-100/50 rounded px-2' : ''}`}
                  >
                    {item.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    openIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {(openIndex === index || isEditing) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div 
                        contentEditable={isEditing}
                        onBlur={(e) => handleUpdateItem(index, 'answer', e.currentTarget.innerText)}
                        suppressContentEditableWarning={true}
                        className={`px-8 pb-8 text-slate-600 leading-relaxed outline-none ${isEditing ? 'hover:bg-blue-100/50 focus:bg-blue-100/50 rounded px-2' : ''}`}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;