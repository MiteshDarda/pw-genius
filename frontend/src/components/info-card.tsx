import React from "react";

// Props for InfoCard: icon (ReactNode), title (string), description (string)
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * InfoCard - Reusable card for displaying an icon, title, and description.
 * Used in the 'Why Participate?' section.
 */
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-[8px] border-[#DBDEE5] border-1 p-6 flex flex-col h-full">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-[#636B87] text-sm">{description}</p>
    </div>
  );
};

export default InfoCard;
