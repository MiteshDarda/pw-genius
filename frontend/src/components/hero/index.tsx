const Hero = () => {
  return (
    <section className="pt-24 px-4 md:px-0 bg-white relative">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Image */}
        <img
          src="/img1.png" // Update: use public path without '../../../public'
          alt="Achievers"
          className="mx-auto rounded-xl w-full max-h-[500px] object-cover"
        />

        {/* Black overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full max-h-[500px] rounded-xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />

        {/* Text and button */}
        <div className="absolute top-0 left-0 w-full h-full max-h-[500px] flex flex-col items-center justify-center text-white z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            India&apos;s Greatest Honor for School Achievers
          </h1>
          <p className="text-base md:text-lg mb-6">
            No Exam, No Fee — Just Nominate
          </p>
          <a
            href="#nominate"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Nominate Yourself
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
