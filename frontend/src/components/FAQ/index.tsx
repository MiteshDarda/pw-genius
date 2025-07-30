import FAQAccordion, { type FAQItem } from "../faq-accordion";

// Placeholder data for FAQs
const faqs: FAQItem[] = [
  {
    question: "What is the Scholastic Challenge?",
    answer:
      "The Scholastic Challenge is a national-level competition designed to recognize and celebrate the academic and extracurricular achievements of students across India. It aims to foster a spirit of healthy competition and encourage students to excel in various fields.",
  },
  {
    question: "Who can participate in the Scholastic Challenge?",
    answer: "Open to students from classes 5th to 12th across India.",
  },
  {
    question: "How do I register for the Scholastic Challenge?",
    answer:
      "Register online by creating an account and filling out the nomination form.",
  },
  {
    question: "What are the different stages of the Scholastic Challenge?",
    answer: "Nomination, verification, and final selection.",
  },
  {
    question: "What are the prizes for the Scholastic Challenge?",
    answer:
      "Winners receive national recognition, certificates, and other exciting rewards.",
  },
];

const FAQ = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
};

export default FAQ;
