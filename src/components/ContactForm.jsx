import { useState } from "react";

const ContactForm = ({ plan }) => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [method, setMethod] = useState("Telegram");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || submitted) return;

    // Validate email if selected method is Email
    if (method === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact)) {
        alert("Please enter a valid email address.");
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name,
        method,
        contact,
        plan: plan || "N/A",
      };

      console.log("📦 Submitting to Formspark:", payload);

      const res = await fetch("https://submit-form.com/J8bwGvLum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "manual",
      });

      const responseText = await res.text();
      console.log("📩 Response Status:", res.status);
      console.log("📩 Response Body:", responseText);

      if (res.status === 202 || res.status < 300) {
        setSubmitted(true);

        setTimeout(() => {
          setOpen(false);
          setSubmitted(false);
          setName("");
          setContact("");
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error("❌ Submission Error:", err);
      setSubmitted("error");
      setTimeout(() => setSubmitted(false), 2500);
    }

    setLoading(false);
  };

  return (
    <div className="mt-4 w-full">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-discord text-white px-4 py-2 rounded-full w-full"
        >
          Order Now
        </button>
      ) : submitted === true ? (
        <div className="bg-green-600 text-white p-3 rounded-xl animate-fade-in text-sm text-center">
          ✅ Submitted! We'll contact you soon.
        </div>
      ) : submitted === "error" ? (
        <div className="bg-red-600 text-white p-3 rounded-xl animate-fade-in text-sm text-center">
          ❌ Something went wrong. Please try again.
        </div>
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
                ? "Telegram Username (e.g. @darkxkid)"
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
            {loading ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-sm text-gray-400 underline w-full"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
