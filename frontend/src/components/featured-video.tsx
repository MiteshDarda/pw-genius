import React from "react";

interface FeaturedVideoProps {
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  thumbnail: string;
}

/**
 * FeaturedVideo - Displays a video thumbnail with play overlay, title, and description.
 * Used in the newsletter/video section of the landing page.
 */
const FeaturedVideo: React.FC<FeaturedVideoProps> = ({ videoTitle, videoDescription, videoUrl, thumbnail }) => {
  return (
    <div className="flex flex-col items-start">
      <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="relative block w-full">
        <img src={thumbnail} alt={videoTitle} className="rounded-lg w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-white bg-opacity-80 rounded-full p-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#2563eb"/><polygon points="13,10 23,16 13,22" fill="#fff"/></svg>
          </span>
        </span>
      </a>
      <div className="mt-2">
        <div className="font-semibold text-sm mb-1">{videoTitle}</div>
        <div className="text-xs text-gray-600">{videoDescription}</div>
      </div>
    </div>
  );
};

export default FeaturedVideo; 