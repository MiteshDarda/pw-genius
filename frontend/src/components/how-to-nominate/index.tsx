import StepCard from "../step-card";
import { UserPlus, FileText, Lock, Upload } from "lucide-react";

// Placeholder data for Steps
const steps = [
  {
    icon: <UserPlus />,
    title: "Free Registration",
    description: "Create your account to begin the nomination process.",
  },
  {
    icon: <FileText />,
    title: "Fill Nomination Details",
    description:
      "Provide detailed information about the nominee's achievements.",
  },
  {
    icon: <Lock />,
    title: "Verify & Lock Transcript",
    description: "Ensure accuracy by locking the academic record.",
  },
  {
    icon: <Upload />,
    title: "Submit Documents",
    description: "Upload all necessary documents to complete the submission.",
  },
];

const HowToNominate = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-16 px-4" id="nominate">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-6">
          How to Nominate
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <StepCard key={idx} {...step} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="#nominate"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Let's Nominate
          </a>
        </div>
      </section>
    </>
  );
};

export default HowToNominate;
