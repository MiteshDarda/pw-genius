import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { BookOpen, Trophy, Lightbulb, ClipboardList } from "lucide-react";

const objectives = [
  { icon: <BookOpen />, text: "Promote Academic Excellence" },
  { icon: <Trophy />, text: "Encourage Sportsmanship" },
  { icon: <Lightbulb />, text: "Foster Innovation" },
];

const categories = [
  { icon: <ClipboardList />, label: "Academic" },
  { icon: <Trophy />, label: "Sports" },
  { icon: <Lightbulb />, label: "Innovation" },
];

const awards = [
  { image: "/img1.png", title: "Medals", desc: "Gold, Silver, Bronze" },
  { image: "/img1.png", title: "Trophies", desc: "For top performers" },
  {
    image: "/img1.png",
    title: "Certificates",
    desc: "Participation and achievement",
  },
  { image: "/img1.png", title: "Scholarships", desc: "For academic pursuits" },
];

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar
        logoSrc="/pw-logo-long.png"
        navItems={[
          { label: "About", href: "/about" },
          { label: "Eligibility", href: "/#eligibility" },
          { label: "Winners", href: "/#winners" },
          { label: "Contact", href: "/#contact" },
        ]}
        secondaryAction={{ label: "Login", href: "/login" }}
      />
      <main className="max-w-5xl mx-auto pt-28 pb-12 px-4">
        {/* About Section */}
        <h1 className="text-3xl font-bold mb-3">About PhysicsWallah</h1>
        <p className="text-gray-700 mb-6">
          PhysicsWallah is a premier national-level educational competition
          designed to foster academic excellence, sportsmanship, and innovation
          among school students across India. Our mission is to provide a
          platform that encourages students to showcase their talents, learn
          from their peers, and grow both academically and personally.
        </p>
        {/* Vision */}
        <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
        <p className="text-gray-700 mb-6">
          To be the leading educational competition in India, recognized for its
          commitment to nurturing young minds and promoting holistic
          development. We envision a future where every student has the
          opportunity to explore their potential and contribute meaningfully to
          society.
        </p>
        {/* Objectives */}
        <h2 className="text-xl font-semibold mb-2">Objectives</h2>
        <ul className="mb-6">
          {objectives.map((obj, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 mb-2 text-gray-700"
            >
              <span className="text-lg">{obj.icon}</span>
              {obj.text}
            </li>
          ))}
        </ul>
        {/* Eligibility */}
        <h2 className="text-xl font-semibold mb-2">Eligibility Criteria</h2>
        <p className="text-gray-700 mb-6">
          The competition is open to students from grades 6 to 12, studying in
          schools across India.
        </p>
        {/* Categories */}
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex gap-6 mb-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </div>
        {/* Awards & Recognition */}
        <h2 className="text-xl font-semibold mb-2">Awards & Recognition</h2>
        <p className="text-gray-700 mb-4">
          Winners will be awarded medals, trophies, certificates, and
          scholarships to recognize their achievements and encourage further
          growth.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {awards.map((award, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-3 flex flex-col items-center text-center"
            >
              <img
                src={award.image}
                alt={award.title}
                className="w-24 h-24 object-cover rounded mb-2"
              />
              <div className="font-semibold text-sm">{award.title}</div>
              <div className="text-xs text-gray-500">{award.desc}</div>
            </div>
          ))}
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
