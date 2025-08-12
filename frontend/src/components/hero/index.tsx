const Hero = () => {
  return (
    <section className="pt-24 px-4 md:px-0 bg-white relative">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Image */}
        <img
          src="/img1.png"
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
          <h1
            className="text-3xl md:text-[43px] mb-4"
            style={{
              fontWeight: 800,
            }}
          >
            From Olympiads to Opportunities—Let’s Celebrate Your Moment.
          </h1>
          <p className="text-base md:text-[22px] mb-6">
            Celebrating Young Genius from Classes 5 to 10
          </p>
          <p
            className="text-base md:text-[22px] mb-6"
            style={{
              fontWeight: 700,
            }}
          >
            #<span className="text-[#1A4DE5]">Talent</span>KiPehchan
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
