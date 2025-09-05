import Footer from "../components/footer";
import {
  Crown,
  GraduationCap,
  Atom,
  Users,
  Phone,
  MessageCircle,
  Send,
  ScreenShare,
} from "lucide-react";

const classRewards = [
  { rank: "Rank 1", award: "Gold Medal + ₹1.5 Lakh Cash + Trophy" },
  { rank: "Rank 2", award: "Gold Medal + ₹1 Lakh Cash + Trophy" },
  { rank: "Rank 3", award: "Gold Medal + ₹75,000 Cash + Trophy" },
  { rank: "Rank 4-10", award: "Silver Medal + ₹25,000 Cash + Trophy" },
  {
    rank: "Rank 11-20",
    award: "Silver Medal + Amazon Voucher worth ₹5000 + Trophy",
  },
  { rank: "All Top 20", award: "Certificates for Student, Parent & School" },
];

const communityFeatures = [
  {
    icon: <Crown />,
    title: "Grand Awards Ceremony",
    description: "Top performers are honoured on stage.",
  },
  {
    icon: <GraduationCap />,
    title: "Inspiring Keynote Addresses",
    description: "By leading educators.",
  },
  {
    icon: <ScreenShare />,
    title: "Interactive Workshops",
    description:
      "Hands-on workshops in science, technology, and creative problem-solving.",
  },
  {
    icon: <Atom />,
    title: "Engaging Science-Tech Expos",
    description: "Explore the latest innovations.",
  },
  {
    icon: <Users />,
    title: "Family Fun Zones",
    description: "With games, photo booths, and networking lounges.",
  },
];

const clubBenefits = [
  {
    icon: <GraduationCap />,
    title: "Empowering Students",
    description: "City-wise mentoring camps & masterclasses",
  },
  {
    icon: <MessageCircle />,
    title: "Community",
    description: "Online forums for peer support & doubt-solving",
  },
  {
    icon: <Send />,
    title: "Breaking News",
    description: "Exclusive exam alerts & prep-tips",
  },
  {
    icon: <Phone />,
    title: "Helpline",
    description: "Dedicated helpline for students & parents",
  },
];

const RewardsCommunity = () => {
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-6xl mx-auto pt-28 pb-12 px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Rewards & Community
        </h1>

        {/* Class-wise Rewards Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Class-wise Rewards
          </h2>
          <div
            className="border rounded-lg overflow-hidden"
            style={{ borderColor: "var(--pw-brand-primary)" }}
          >
            <div
              className="bg-gray-50 px-6 py-4 border-b"
              style={{ borderColor: "var(--pw-brand-primary)" }}
            >
              <div className="grid grid-cols-2 gap-4 font-semibold text-gray-800">
                <div>Class Rank</div>
                <div>Award Details</div>
              </div>
            </div>
            <div
              className="divide-y"
              style={{ borderColor: "var(--pw-brand-primary)" }}
            >
              {classRewards.map((reward, idx) => (
                <div key={idx} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-medium text-gray-800">
                      {reward.rank}
                    </div>
                    <div className="text-gray-700">{reward.award}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="mt-4 p-4 rounded-lg"
            style={{
              background:
                "linear-gradient(0deg, rgba(183,148,248,0.12), rgba(183,148,248,0.12)), #fff",
            }}
          >
            <p className="text-gray-700 text-center font-medium">
              Plus: Special "Educator's Honour" certificates for Principals &
              Teachers.
            </p>
          </div>
        </div>

        {/*//? PW Genius Day & Community Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            PW Genius Day & Community
          </h2>
          <p className="text-gray-700 mb-6">
            Every year, we host an unforgettable gala to celebrate the brightest
            minds. PW Genius Day features:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {communityFeatures.map((feature, idx) => (
              <div key={idx} className="card-brand p-6 min-h-[228px]">
                <div className="icon-badge mb-3">{feature.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How Ranking Works Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            How Ranking Works
          </h2>
          <h3 className="text-xl font-medium mb-4 text-gray-700">
            Ranking Criteria
          </h3>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-800">
                100% Total
              </span>
            </div>

            {/* 70% Nomination Credentials */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  70% Nomination Credentials
                </span>
                <span className="text-sm text-gray-600">70%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "70%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                The achievements and exam scores you submitted during the
                nomination process
              </p>
            </div>

            {/* 30% Genius Day Performance */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">
                  30% Genius Day Performance
                </span>
                <span className="text-sm text-gray-600">30%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "30%" }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Your participation and performance in on-site challenges and
                activities at PW Genius Day
              </p>
            </div>
          </div>
        </div>

        {/* PW Genius Club Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            PW Genius Club
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clubBenefits.map((benefit, idx) => (
              <div key={idx} className="card-brand p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="icon-badge">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-700">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsCommunity;
