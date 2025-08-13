import Footer from "../components/footer";
import { BookOpen, Trophy, Lightbulb, Monitor } from "lucide-react";

const objectives = [
  {
    icon: <BookOpen className="text-white" />,
    text: "Promote Academic Excellence",
    bgColor: "bg-green-400",
  },
  {
    icon: <Trophy className="text-white" />,
    text: "Encourage Sportsmanship",
    bgColor: "bg-orange-400",
  },
  {
    icon: <Lightbulb className="text-white" />,
    text: "Foster Innovation",
    bgColor: "bg-yellow-400",
  },
  {
    icon: <Monitor className="text-white" />,
    text: "Innovation",
    bgColor: "bg-purple-400",
  },
];

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-5xl mx-auto pt-28 pb-12 px-4">
        {/* About Section */}
        <h1 className="text-3xl font-bold mb-3 text-gray-800">
          About PW Genius
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          PW Genius is Physicswallah Vidyapeeth's no-fee, national-level
          honouring & mentoring platform for Classes 5-10. We recognize students
          who have excelled in Olympiads, NTSE, KVPY, or equivalent exams, and
          aim to uplift their families and schools. Each Genius gains lifetime
          access to an exclusive peer-mentor community.
        </p>

        {/* Vision */}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Our Vision</h2>
        <p className="text-gray-700 mb-6">
          To be the leading educational competition in India, recognized for its
          commitment to nurturing young minds and promoting holistic
          development. We envision a future where every student has the
          opportunity to explore their potential and contribute meaningfully to
          society.
        </p>

        {/* Objectives */}
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {objectives.map((obj, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${obj.bgColor}`}
              >
                {obj.icon}
              </div>
              <span className="text-gray-700 font-medium">{obj.text}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
