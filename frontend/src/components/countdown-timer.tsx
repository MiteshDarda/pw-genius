import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CountdownTimerProps {
  closingTime: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ closingTime }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Check if closingTime is valid
  if (!closingTime || isNaN(parseInt(closingTime))) {
    return (
      <div
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(183,148,248,0.15), rgba(143,110,249,0.15))",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nomination Period
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nomination period is currently open!
          </p>
          <button
            onClick={() => navigate("/register")}
            className="btn shadow-lg hover:shadow-xl"
          >
            Nominate Now
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const closingTimestamp = parseInt(closingTime);
      const difference = closingTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (24 * 60 * 60));
        const hours = Math.floor((difference % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((difference % (60 * 60)) / 60);
        const seconds = difference % 60;

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        // Clear the interval when countdown reaches zero
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [closingTime]);

  // Check if countdown has reached zero
  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <div
        className="py-16 px-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(183,148,248,0.15), rgba(143,110,249,0.15))",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nomination Period Closed
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your interest! The nomination period has ended.
          </p>
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
            <p className="text-gray-700">
              Stay tuned for future opportunities and announcements about the
              winners!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] flex items-center justify-around max-w-7xl mx-auto mt-24 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#121417] mb-4">
            Nomination Closes In :
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center  gap-12">
          {/* Countdown Timer */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* Days */}
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-brand mb-2">
                  {timeLeft.days.toString().padStart(2, "0")} &nbsp; :
                </div>
                <div
                  className="text-sm md:text-base mt-2"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  Days
                </div>
              </div>

              {/* Hours */}
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-brand mb-2">
                  {timeLeft.hours.toString().padStart(2, "0")} &nbsp; :
                </div>
                <div
                  className="text-sm md:text-base mt-2"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  Hours
                </div>
              </div>

              {/* Minutes */}
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-brand mb-2">
                  {timeLeft.minutes.toString().padStart(2, "0")} &nbsp; :
                </div>
                <div
                  className="text-sm md:text-base mt-2"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  Minutes
                </div>
              </div>

              {/* Seconds */}
              <div className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-brand mb-2">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div
                  className="text-sm md:text-base mt-2"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Rocket GIF */}
      <div className=" flex justify-center">
        <div className="relative">
          <img
            src="/LaunchYourStore.gif"
            alt="Launch Your Store"
            className="w-80 h-80 md:w-96 md:h-96 object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(183,148,248,0.5)] to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
