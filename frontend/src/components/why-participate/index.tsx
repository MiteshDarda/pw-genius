import InfoCard from "../info-card";
import { Award, Users, BadgeCheck, BadgeDollarSign } from "lucide-react";

// Placeholder data for InfoCards
const infoCards = [
  {
    icon: <Award color={"#FFAA00"} />,
    title: "Gold & Silver Medals",
  },
  {
    icon: <Users color={"#6353DD"} />,
    title: "Lifetime Mentorship & Community",
  },
  {
    icon: <BadgeCheck color={"#E04949"} />,
    title: "Certificates for Students, Parents & Schools",
  },
  {
    icon: <BadgeDollarSign color={"#0FA650"} />,
    title: "Generous Cash Prizes",
  },
];

const WhyParticipate = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-12 px-4" id="about">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-4">
          Why PW Genius?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {infoCards.map((card, idx) => (
            <InfoCard key={idx} {...card} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyParticipate;
