import React, { useState } from "react";

interface NewsletterSignupProps {
  onSubmit?: (email: string) => void;
}

/**
 * NewsletterSignup - Newsletter subscription form with email input and terms checkbox.
 * Used in the newsletter section of the landing page.
 */
const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed && email) {
      onSubmit?.(email);
      setEmail("");
      setAgreed(false);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email address"
        className="border rounded px-3 py-2 text-sm"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <label className="flex items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          required
        />
        I agree to the terms and conditions
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm disabled:opacity-50"
        disabled={!agreed || !email}
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterSignup; 