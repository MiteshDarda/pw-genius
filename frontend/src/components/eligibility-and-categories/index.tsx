import CategoryBadge from "../category-badge";

// Placeholder data for categories
const categories = [
  { label: "Academics", color: "bg-purple-100 text-purple-800" },
  { label: "Sports", color: "bg-green-100 text-green-800" },
  { label: "Innovation", color: "bg-yellow-100 text-yellow-800" },
  { label: "Arts & Culture", color: "bg-blue-100 text-blue-800" },
  { label: "Leadership", color: "bg-pink-100 text-pink-800" },
];

const EligibilityAndCategories = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto mt-16 px-4" id="eligibility">
        <h2 className="text-[22px] md:text-[32px] font-bold mb-10">
          Eligibility & Categories
        </h2>
        <p className="mb-6 text-gray-700">
          Open to students from classes 5th to 12th across India. Categories
          include:
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <CategoryBadge key={idx} label={cat.label} color={cat.color} />
          ))}
        </div>
      </section>
    </>
  );
};

export default EligibilityAndCategories;
