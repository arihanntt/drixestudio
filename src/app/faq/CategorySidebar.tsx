"use client";

interface Props {
  active: string;
  setActive: (v: string) => void;
}

const categories = [
  { id: "all", label: "All Categories" },
  { id: "discord", label: "Discord Services" },
  { id: "website", label: "Website Development" },
  { id: "social", label: "Social Media & Content" },
  { id: "pricing", label: "Pricing & Payments" },
  { id: "security", label: "Security & Reliability" },
];

export default function CategorySidebar({ active, setActive }: Props) {
  return (
    <>
      {/* ================= MOBILE DROPDOWN ================= */}
      <div className="lg:hidden mb-8">
        <label className="block text-xs uppercase tracking-wide text-white/50 mb-2">
          Filter by category
        </label>

        <div className="relative">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="
              w-full appearance-none rounded-xl
              bg-white/5 border border-white/10
              px-4 py-3 text-sm text-white
              outline-none focus:border-violet-500
              focus:ring-2 focus:ring-violet-500/20
              transition
            "
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-black">
                {c.label}
              </option>
            ))}
          </select>

          {/* dropdown arrow */}
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
            ▼
          </span>
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:block sticky top-32 h-fit">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <p className="px-3 py-2 text-xs uppercase tracking-wide text-white/40">
            Categories
          </p>

          <div className="space-y-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`
                  block w-full rounded-lg px-4 py-3 text-left text-sm transition
                  ${
                    active === c.id
                      ? "bg-violet-600/20 text-white"
                      : "text-white/60 hover:bg-white/5"
                  }
                `}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
