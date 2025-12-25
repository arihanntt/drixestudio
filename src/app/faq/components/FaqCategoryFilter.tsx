interface Props {
  sections: { slug: string; title: string }[];
  active: string | null;
  onChange: (v: string | null) => void;
}

export default function FaqCategoryFilter({
  sections,
  active,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-full text-sm transition ${
          active === null
            ? "bg-white text-black"
            : "border border-white/20 text-white/70 hover:border-white/40"
        }`}
      >
        All
      </button>

      {sections.map(section => (
        <button
          key={section.slug}
          onClick={() => onChange(section.slug)}
          className={`px-4 py-2 rounded-full text-sm transition ${
            active === section.slug
              ? "bg-white text-black"
              : "border border-white/20 text-white/70 hover:border-white/40"
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  );
}
