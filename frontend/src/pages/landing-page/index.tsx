import Hero from "../../components/hero";
import Navbar from "../../components/navbar";
// import NewsletterSignup from "../../components/newsletter-signup";
// import FeaturedVideo from "../../components/featured-video";
import Footer from "../../components/footer";
import WhyParticipate from "../../components/why-participate";
import PastWinnersSection from "../../components/past-winners-section";
import EligibilityAndCategories from "../../components/eligibility-and-categories";
import HowToNominate from "../../components/how-to-nominate";
import FAQ from "../../components/FAQ";
import { useAuth } from "react-oidc-context";

const LandingPage = () => {
  const auth = useAuth();

  return (
    <div className=" min-h-screen relative">
      {/*//? Navbar ======================================================================================== */}
      <Navbar
        logoSrc="../../../public/pw-logo-long.png"
        navItems={[
          { label: "About", href: "#about" },
          { label: "Eligibility", href: "#eligibility" },
          { label: "Winners", href: "#winners" },
          { label: "Contact", href: "#contact" },
        ]}
        secondaryAction={{
          label: "Login",
          onClick: () => {
            console.log("clicked");
            auth.signinRedirect();
          },
        }}
      />
      {/*//? Hero Section ======================================================================================== */}
      <Hero />

      {/*//? Why Participate? ======================================================================================== */}
      <WhyParticipate />

      {/*//? Past Winners Section ======================================================================================== */}
      <PastWinnersSection />

      {/*//? Eligibility and Categories ======================================================================================== */}
      <EligibilityAndCategories />

      {/*//? Meet Our Champions Section ======================================================================================== */}
      {/* <MeetOurChampions /> */}

      {/* How to Nominate */}
      <HowToNominate />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
