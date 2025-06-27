import { useState } from "react";

const ContactUsModal = ({ onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || submitted) return;

    if (method === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, method, contact }),
        redirect: "manual",
      });

      if (res.status < 400) {
        console.log("✅ Contact form submitted");
        setSubmitted(true);
      } else {
        console.log("⚠️ Unexpected response:", res);
        throw new Error("Form error");
      }

      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setName("");
        setContact("");
      }, 2500);
    } catch (err) {
      console.error("❌ Submit failed:", err);
      setSubmitted("error");
      setTimeout(() => setSubmitted(false), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
        <button
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
        {submitted === true ? (
          <p className="text-green-400 text-center">✅ We'll be in touch soon.</p>
        ) : submitted === "error" ? (
          <p className="text-red-500 text-center">❌ Something went wrong.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#222] p-4 rounded-xl space-y-3 animate-fade-in"
          >
            <input
              type="text"
              required
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black text-white border border-gray-700 text-sm"
            />

            <select
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
                setContact("");
              }}
              className="w-full px-3 py-2 rounded bg-black text-white border border-gray-700 text-sm"
            >
              <option>Telegram</option>
              <option>Discord</option>
              <option>Email</option>
            </select>

            <input
              type="text"
              required
              placeholder={
                method === "Telegram"
                  ? "Telegram Username (e.g. @yourname)"
                  : method === "Discord"
                  ? "Discord Tag (e.g. user#0001)"
                  : "Email Address"
              }
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black text-white border border-gray-700 text-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-discord text-white w-full py-2 rounded hover:bg-indigo-600 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Contact Us"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-400 underline w-full"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUsModal;
