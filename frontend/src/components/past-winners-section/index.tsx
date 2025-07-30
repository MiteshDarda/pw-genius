import WinnerCard from "../winner-card";

// Placeholder data for Winners
const winners = [
  {
    image: "../../../public/Winner.png",
    name: "Aarav Sharma",
    description:
      "Aarav, a winner in the Academic Excellence category, secured a scholarship to a top university.",
    isTeam: false,
  },
  {
    image: "/img1.png",
    name: "Priya Verma",
    description:
      "Priya, recognized for her sports achievements, represented India in an international event.",
    isTeam: false,
  },
  {
    image: "/img1.png",
    name: "Team Innovators",
    description:
      "Team Innovators, winners in the Innovation category, received funding for their project.",
    isTeam: false,
  },
];

const PastWinnersSection = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-16 px-4" id="winners">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-4">
          Past Winners' Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {winners.map((winner, idx) => (
            <WinnerCard key={idx} {...winner} />
          ))}
        </div>
      </section>
    </>
  );
};

export default PastWinnersSection;
