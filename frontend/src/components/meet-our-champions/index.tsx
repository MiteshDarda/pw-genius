import { useState } from "react";
import ChampionCard, { type Champion } from "../champion-card";

// Placeholder data for Champions
const champions: Champion[] = [
  {
    image: "/img1.png",
    name: "Aarav Sharma",
    className: "Class 12",
    school: "Delhi Public School",
    city: "New Delhi",
    year: 2024,
  },
  {
    image: "/img1.png",
    name: "Priya Patel",
    className: "Class 10",
    school: "St. Xavier's High School",
    city: "Mumbai",
    year: 2023,
  },
  {
    image: "/img1.png",
    name: "Rohan Verma",
    className: "Class 11",
    school: "The Doon School",
    city: "Dehradun",
    year: 2022,
  },
  {
    image: "/img1.png",
    name: "Anika Singh",
    className: "Class 9",
    school: "Vidya Mandir",
    city: "Chennai",
    year: 2021,
  },
  {
    image: "/img1.png",
    name: "Arjun Kapoor",
    className: "Class 12",
    school: "Delhi Public School",
    city: "New Delhi",
    year: 2020,
  },
  {
    image: "/img1.png",
    name: "Divya Reddy",
    className: "Class 10",
    school: "St. Xavier's High School",
    city: "Mumbai",
    year: 2023,
  },
  {
    image: "/img1.png",
    name: "Vikram Joshi",
    className: "Class 11",
    school: "The Doon School",
    city: "Dehradun",
    year: 2022,
  },
  {
    image: "/img1.png",
    name: "Ishita Mishra",
    className: "Class 9",
    school: "Vidya Mandir",
    city: "Chennai",
    year: 2021,
  },
];
const years = [2024, 2023, 2022, 2021, 2020];

const MeetOurChampions = () => {
  //State for filtering champions by year
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const filteredChampions = champions.filter((c) => c.year === selectedYear);
  return (
    <>
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold mb-4">Meet Our Champions</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          {years.map((year) => (
            <button
              key={year}
              className={`px-3 py-1 rounded-full text-xs font-medium border ${selectedYear === year ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredChampions.map((champion, idx) => (
            <ChampionCard key={idx} champion={champion} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300">
            View More
          </button>
        </div>
      </section>
    </>
  );
};

export default MeetOurChampions;
