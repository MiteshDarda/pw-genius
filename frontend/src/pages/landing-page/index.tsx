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
        primaryAction={{ label: "Nominate", href: "#nominate" }}
        secondaryAction={{
          label: "Login",
          href: "login",
          onClick: () => auth.signinRedirect(),
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

      {/* Newsletter & Featured Video */}
      {/* <section className="max-w-7xl mx-auto mt-16 px-4 mb-16">
        <div className="bg-[#F5EBFB] rounded-xl p-6 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 w-full max-w-xs">
            <div className="font-semibold mb-2">Stay Updated !!</div>
            <NewsletterSignup />
          </div>
          <div className="flex-1 w-full max-w-md">
            <FeaturedVideo
              videoTitle="National Student Competition Highlights"
              videoDescription="Watch the highlights from the recent National Student Competition, showcasing the talent and achievements of students across the nation."
              videoUrl="#"
              thumbnail="/img1.png"
            />
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
