import React from "react";

// Props for CategoryBadge: label (string), color (string, optional)
interface CategoryBadgeProps {
  label: string;
  color?: string; // Tailwind color class, e.g., 'bg-purple-100 text-purple-800'
}

/**
 * CategoryBadge - Reusable badge for displaying a category label.
 * Used in the 'Eligibility & Categories' section.
 */
const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label, color }) => {
  // Default color if not provided
  const defaultColor = "bg-gray-100 text-gray-800";
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2 ${color || defaultColor}`}
    >
      {label}
    </span>
  );
};

export default CategoryBadge; 