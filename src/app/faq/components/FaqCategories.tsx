interface Props {
  sections: { slug: string; title: string }[];
}

export default function FaqCategories({ sections }: Props) {
  return (
    <nav className="mb-12 overflow-x-auto">
      <ul className="flex gap-3 whitespace-nowrap">
        {sections.map(section => (
          <li key={section.slug}>
            <a
              href={`#${section.slug}`}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 hover:border-white/40 hover:text-white transition"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
