import React from "react";

// Props for StepCard: icon (ReactNode), title (string), description (string)
interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * StepCard - Reusable card for displaying a nomination step with icon, title, and description.
 * Used in the 'How to Nominate' section.
 */
const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default StepCard; 