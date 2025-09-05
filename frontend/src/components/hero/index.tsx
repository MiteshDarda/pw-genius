const Hero = () => {
  return (
    <section className=" px-4 md:px-0 bg-white relative">
      <div className="max-w-screen mx-auto text-center relative">
        {/* Image */}
        <img
          src="/background.gif"
          alt="PW Celebration Background"
          className="mx-auto w-full max-h-screen object-cover"
        />

        {/* Black overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full max-h-screen rounded-xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        />

        {/* Text and button */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white z-10 px-4">
          <div className="w-[50%]">
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
              <span
                className="typewriter"
                style={{
                  // total width and step count tuned to string length
                  // includes the # and remaining text
                  // adjust if copy changes
                  // length: 22 characters
                  // show full string then keep caret blinking
                  // brand gradient only on the word Talent
                  // rendered as one inline string
                  // fallbacks if CSS vars unsupported
                  // ensure caret is visible over overlay
                  // keep within line height visually
                  // no extra margins
                  // minimal styles inline
                  // rest in CSS utility
                  //
                  // custom width and steps
                  //
                  // @ts-ignore - CSS var string ok
                  ["--type-width" as any]: "22ch",
                  // @ts-ignore - CSS var string ok
                  ["--type-steps" as any]: 22,
                  // @ts-ignore - CSS var string ok
                  ["--type-duration" as any]: "3s",
                }}
              >
                #<span className="text-brand-gradient">Talent</span>KiPehchan
              </span>
            </p>
            <a href="#nominate" className="btn">
              Nominate Yourself
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
