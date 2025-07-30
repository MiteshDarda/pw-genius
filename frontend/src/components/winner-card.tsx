import React from "react";

// Props for WinnerCard: image (string), name (string), description (string), isTeam (boolean, optional)
interface WinnerCardProps {
  image: string; // URL or path to image/illustration
  name: string;
  description: string;
  isTeam?: boolean;
}

/**
 * WinnerCard - Reusable card for displaying a past winner's image, name, and description.
 * Used in the 'Past Winners' Success Stories' section.
 */
const WinnerCard: React.FC<WinnerCardProps> = ({
  image,
  name,
  description,
  isTeam,
}) => {
  return (
    <div className=" flex flex-col items-center h-full w-[300px]">
      <img
        src={image}
        alt={name}
        className={`mb-3 rounded-lg object-cover ${isTeam ? "w-28 h-20" : " h-[300px]"}`}
      />
      <h4 className="font-medium text-base w-full mb-1">{name}</h4>
      <p className="text-[#4573A1] text-[14px]">{description}</p>
    </div>
  );
};

export default WinnerCard;
