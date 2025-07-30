import React from "react";

// Champion data type for filtering and mapping
export interface Champion {
  image: string; // URL or path to image
  name: string;
  className: string;
  school: string;
  city: string;
  year: number;
}

// Props for ChampionCard: champion (Champion)
interface ChampionCardProps {
  champion: Champion;
}

/**
 * ChampionCard - Reusable card for displaying a champion's image, name, class, school, and city.
 * Used in the 'Meet Our Champions' section.
 */
const ChampionCard: React.FC<ChampionCardProps> = ({ champion }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center h-full">
      <img
        src={champion.image}
        alt={champion.name}
        className="mb-3 rounded-full object-cover w-20 h-20 border"
      />
      <h4 className="font-semibold text-base mb-1">{champion.name}, {champion.className}</h4>
      <p className="text-gray-600 text-xs mb-1">{champion.school}</p>
      <p className="text-gray-500 text-xs">{champion.city}</p>
    </div>
  );
};

export default ChampionCard; 