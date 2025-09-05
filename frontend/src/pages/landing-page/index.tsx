import Hero from "../../components/hero";
import Footer from "../../components/footer";
import WhyParticipate from "../../components/why-participate";
import FAQ from "../../components/FAQ";
import CountdownTimer from "../../components/countdown-timer";
import { useEffect } from "react";

const LandingPage = () => {
  const timeLeft = import.meta.env.VITE_NOMINATION_CLOSING_TIME; // Epoch timestamp in seconds

  // on mount if we have # in url, scroll to that section
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className=" min-h-screen relative">
      {/*//? Hero Section ======================================================================================== */}
      <Hero />

      <div className="h-px brand-gradient my-12 opacity-70" />

      {/*//? Why Participate? ======================================================================================== */}
      <WhyParticipate />

      <div className="h-px brand-gradient my-12 opacity-70" />

      {/*//? Nomination Closes In ======================================================================================== */}
      <CountdownTimer closingTime={timeLeft} />

      <div className="h-px brand-gradient my-12 opacity-70" />

      {/*//? Past Winners Section ======================================================================================== */}
      {/* <PastWinnersSection /> */}

      {/*//? Eligibility and Categories ======================================================================================== */}
      {/* <EligibilityAndCategories /> */}

      {/*//? Meet Our Champions Section ======================================================================================== */}
      {/* <MeetOurChampions /> */}

      {/* How to Nominate */}
      {/* <HowToNominate /> */}

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
