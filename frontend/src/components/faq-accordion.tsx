import React, { useState } from "react";

// FAQ item type
export interface FAQItem {
  question: string;
  answer: string;
}

// Props for FAQAccordion: faqs (FAQItem[])
interface FAQAccordionProps {
  faqs: FAQItem[];
}

/**
 * FAQAccordion - Reusable accordion for displaying FAQs.
 * Used in the 'Frequently Asked Questions' section.
 */
const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full mx-auto">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="mb-2 border border-[#D1D1E8] w-full rounded-lg bg-[#F7F7FC]"
        >
          <button
            className="w-full text-left text-[#0D0D1C] text-[14px] px-4 py-3 font-medium focus:outline-none flex justify-between items-center"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
          >
            {faq.question}
            <span>{openIndex === idx ? "-" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="px-4 pb-4 text-[#4F4F96] text-sm">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
