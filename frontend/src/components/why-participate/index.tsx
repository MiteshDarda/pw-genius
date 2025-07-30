import InfoCard from "../info-card";
import { Award, Users, BadgeCheck } from "lucide-react";

// Placeholder data for InfoCards
const infoCards = [
  {
    icon: <Award color={"#FFAA00"} />,
    title: "National Recognition",
    description:
      "Gain national recognition for your academic and extracurricular achievements.",
  },
  {
    icon: <Users color={"#6353DD"} />,
    title: "Peer Networking",
    description:
      "Connect with high-achieving students from across the country.",
  },
  {
    icon: <BadgeCheck color={"#E04949"} />,
    title: "Certificate of Excellence",
    description: "Receive a prestigious certificate to add to your portfolio.",
  },
];

const WhyParticipate = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-12 px-4" id="about">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-4">
          Why Participate?
        </h2>
        <p className="mb-6 max-w-[720px]">
          The Scholastic Challenge is a platform that encourages students to
          showcase their talents, learn from their peers, and grow both
          academically and personally. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Aperiam ipsa ad eaque illum sed aliquid, nisi atque
          nam ratione tempore! Voluptas, voluptate veniam! Molestias libero ad
          ab minus magni placeat beatae corporis earum accusamus at asperiores
          aspernatur ex ratione non consequatur rerum, voluptatibus sed. Vel
          voluptas aperiam dolor expedita quo?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {infoCards.map((card, idx) => (
            <InfoCard key={idx} {...card} />
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyParticipate;
