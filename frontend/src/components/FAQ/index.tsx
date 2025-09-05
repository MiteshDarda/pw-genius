import FAQAccordion, { type FAQItem } from "../faq-accordion";
import { useEffect, useRef } from "react";

// FAQ data
const faqs: FAQItem[] = [
  {
    question: "When can I nominate?",
    answer: "Nomination window runs August 20- Sept 30, 2025.",
  },
  {
    question: "Can I edit my profile after submission?",
    answer:
      "No—please verify everything before locking; no changes are allowed once locked.",
  },
  {
    question: "How will I know if I'm shortlisted?",
    answer:
      "Shortlist announcements go live on the site by Oct 5, 2025, and via email/SMS.",
  },
  {
    question: "Is travel support provided?",
    answer:
      "We offer travel subsidies to top 20 qualifiers (customized per location).",
  },
  {
    question: "Will only Nomination make me PW Genius?",
    answer:
      "No, After Nomination if you are selected you need to travel (arranged by PW) to Noida for final day competition, achievement and celebration.",
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto mt-16 px-4 fade-in-up"
        id="faq"
        style={{ ["--fade-delay" as any]: "100ms" }}
      >
        <h2 className="text-[22px] md:text-[32px] font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </>
  );
};

export default FAQ;
