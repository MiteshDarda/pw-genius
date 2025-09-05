import Footer from "../components/footer";
import {
  GraduationCap,
  Trophy,
  IndianRupee,
  User,
  Pencil,
  Lock,
  Mail,
} from "lucide-react";

const eligibilityCriteria = [
  {
    icon: <GraduationCap className="text-white" />,
    text: "Students currently enrolled in Classes 5 through 10 are eligible to apply.",
    bgColor: "bg-blue-400",
  },
  {
    icon: <Trophy className="text-white" />,
    text: "Students who have qualified in competitive exams such as Olympiads, NTSE, KVPY, INSPIRE, or reached the finals of national or international competitions or Science & Maths Olympiads (SOF, IMO, NSO, etc.)",
    bgColor: "bg-yellow-400",
  },
  {
    icon: <IndianRupee className="text-white" />,
    text: "There is no fee to apply for the PW Genius program.",
    bgColor: "bg-green-400",
  },
];

const nominationSteps = [
  {
    step: "1",
    icon: <User className="text-purple-600" />,
    title: "Register",
    description:
      "Create an account on the PW Genius platform and upload a passport-size photo & your recent report card",
  },
  {
    step: "2",
    icon: <Pencil className="text-green-600" />,
    title: "Build Your Profile",
    description:
      "Complete your profile with qualifying exam details and upload mark sheets & certificates",
  },
  {
    step: "3",
    icon: <Lock className="text-amber-600" />,
    title: "Verify & Lock",
    description:
      "Review your profile carefully, Once locked, profiles cannot be edited",
  },
  {
    step: "4",
    icon: <Mail className="text-blue-600" />,
    title: "Shortlist & Invite",
    description: "Top 20 students per class will be shortlisted",
  },
];

const NominationGuide = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-5xl mx-auto pt-28 pb-12 px-4">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          PW Genius Nomination
        </h1>

        {/* Who Can Apply Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Who Can Apply?
          </h2>
          <div className="space-y-4 mb-6">
            {eligibilityCriteria.map((criteria, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${criteria.bgColor} flex-shrink-0`}
                >
                  {criteria.icon}
                </div>
                <p className="text-gray-700 leading-relaxed">{criteria.text}</p>
              </div>
            ))}
          </div>
          <button className="btn my-6">Learn More About Eligibility</button>
        </div>

        {/* How to Nominate Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-12 text-gray-800">
            How to Nominate
          </h2>
          <div className="relative">
            {/* Vertical dashed line - only between steps */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-300"></div>

            <div className="space-y-8">
              {nominationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-6 relative">
                  {/* Step number and icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex-shrink-0 z-10">
                    <span className="text-lg font-bold text-gray-600">
                      {step.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description.includes(
                        "profiles cannot be edited",
                      ) ? (
                        <>
                          {
                            step.description.split(
                              "profiles cannot be edited",
                            )[0]
                          }
                          <strong>profiles cannot be edited</strong>
                          {
                            step.description.split(
                              "profiles cannot be edited",
                            )[1]
                          }
                        </>
                      ) : (
                        step.description
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-8 p-6">
            <p className="text-gray-700 text-center font-medium">
              They'll be invited (with family & school passes) to PW Genius Day.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NominationGuide;
