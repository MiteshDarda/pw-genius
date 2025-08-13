import { useState, useEffect } from "react";
import Footer from "../components/footer";
import { Shield, Trophy, Medal, Star } from "lucide-react";

interface AchievementData {
  "Competition Title": string;
  Criteria: string;
}

const eligibilityGuidelines = [
  {
    icon: <Shield className="text-green-600" />,
    title: "Who Can Participate",
    description:
      "Students currently studying in Classes 5th to 10th (as on 1st April 2025) are eligible to participate in the inaugural edition of PW Genius.",
  },
  {
    icon: <Trophy className="text-yellow-600" />,
    title: "Nomination Requirement",
    description:
      "To nominate for PW Genius, a student must have at least one qualifying achievement from the categories listed in the official achievement table provided.",
  },
  {
    icon: <Medal className="text-orange-600" />,
    title: "Assured Rewards Eligibility",
    description:
      "To be eligible for Assured Rewards, it is mandatory that the student holds at least one qualifying achievement from the academic session (2024-25)/current academic session (2025-26).",
  },
  {
    icon: <Star className="text-red-600" />,
    title: "Final Round (PG 1 to PG 20) Selection",
    description:
      "Have the highest level of overall achievements, and have at least one qualifying achievement specifically from session 2024-25/2025-26.",
  },
];

const classes = [
  { id: "class5", name: "Class 5", label: "CLASS 5TH" },
  { id: "class6", name: "Class 6", label: "CLASS 6TH" },
  { id: "class7", name: "Class 7", label: "CLASS 7TH" },
  { id: "class8", name: "Class 8", label: "CLASS 8TH" },
  { id: "class9", name: "Class 9", label: "CLASS 9TH" },
  { id: "class10", name: "Class 10", label: "CLASS 10TH" },
];

const Eligibility = () => {
  const [selectedClass, setSelectedClass] = useState("class5");
  const [achievementData, setAchievementData] = useState<AchievementData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Selected class changed to:", selectedClass);
    loadClassData(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    console.log("Achievement data updated:", achievementData);
  }, [achievementData]);

  const loadClassData = async (classId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/${classId}.csv`);
      const csvText = await response.text();

      // Parse CSV data
      const lines = csvText.split("\n");
      const data: AchievementData[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
          const values = lines[i].split(",");
          if (values.length >= 2) {
            const title = values[0].replace(/"/g, "").trim();
            const criteria = values[1].replace(/"/g, "").trim();

            // Skip empty rows
            if (title || criteria) {
              data.push({
                "Competition Title": title,
                Criteria: criteria,
              });
            }
          }
        }
      }

      console.log(`Loaded data for ${classId}:`, data);
      setAchievementData(data);
    } catch (error) {
      console.error("Error loading CSV data:", error);
      setAchievementData([]);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentClassLabel = () => {
    return classes.find((c) => c.id === selectedClass)?.label || "CLASS 5TH";
  };

  // Group achievements by category
  const groupAchievementsByCategory = (data: AchievementData[]) => {
    const grouped: { [key: string]: AchievementData[] } = {};
    let currentCategory = "";

    data.forEach((item) => {
      // Check if this is a category header (has title but no criteria)
      if (item["Competition Title"] && !item.Criteria) {
        currentCategory = item["Competition Title"];
        grouped[currentCategory] = [];
      } else if (
        currentCategory &&
        item["Competition Title"] &&
        item.Criteria
      ) {
        // This is an achievement under the current category
        if (!grouped[currentCategory]) {
          grouped[currentCategory] = [];
        }
        grouped[currentCategory].push(item);
      }
    });

    console.log("Grouped achievements:", grouped);
    return grouped;
  };

  const groupedAchievements = groupAchievementsByCategory(achievementData);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto pt-28 pb-12 px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Eligibility Criteria
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          PW Genius - Eligibility and Participation Guidelines (First Edition)
        </p>

        {/* Eligibility Guidelines Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Eligibility Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eligibilityGuidelines.map((guideline, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 bg-white rounded-lg border border-gray-200"
              >
                <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                  {guideline.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {guideline.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area with Sidebar and Content */}
        <div className="flex gap-8">
          {/* Left Sidebar - Class Selection */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-32">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Select Your Class
              </h2>
              <div className="space-y-2">
                {classes.map((classItem) => (
                  <button
                    key={classItem.id}
                    onClick={() => setSelectedClass(classItem.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      selectedClass === classItem.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                    }`}
                  >
                    {classItem.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Class Header */}
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-blue-600 text-center py-4 bg-blue-50 rounded-lg border border-blue-200">
                {getCurrentClassLabel()}
              </h3>
            </div>

            {/* Achievements Table Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Achievements in following National and International
                Examinations will be the Eligibility criteria for PW Genius.
              </h2>

              {/* Table */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Loading eligibility criteria...
                  </p>
                </div>
              ) : achievementData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No eligibility criteria found for this class.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b-2 border-gray-300">
                    <div className="grid grid-cols-2 gap-4 font-bold text-lg text-gray-800">
                      <div>Competition Title</div>
                      <div>Criteria</div>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {Object.entries(groupedAchievements).map(
                      ([category, achievements], categoryIdx) => (
                        <div key={categoryIdx}>
                          {/* Category Header - Bold and Bigger Font */}
                          <div className="px-6 py-4 bg-gray-100 border-b border-gray-300">
                            <h4 className="text-lg font-bold text-gray-800">
                              {category}
                            </h4>
                          </div>

                          {/* Achievements under this category */}
                          {achievements.map((achievement, idx) => (
                            <div
                              key={idx}
                              className={`px-6 py-4 hover:bg-gray-50 ${
                                achievements.length > 1 &&
                                idx < achievements.length - 1
                                  ? "border-b border-gray-200"
                                  : ""
                              }`}
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div
                                  className={`font-medium text-gray-800 ${
                                    achievements.length === 1
                                      ? "text-lg font-bold"
                                      : ""
                                  }`}
                                >
                                  {achievement["Competition Title"]}
                                </div>
                                <div
                                  className={`text-gray-700 ${
                                    achievements.length === 1
                                      ? "text-lg font-bold"
                                      : ""
                                  }`}
                                >
                                  {achievement.Criteria}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Eligibility;
