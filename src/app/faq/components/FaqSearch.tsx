interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function FaqSearch({ value, onChange }: Props) {
  return (
    <div className="mb-12">
      <input
        type="search"
        placeholder="Search questions (e.g. pricing, bots, security)"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl bg-black border border-white/20 px-5 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40"
      />
    </div>
  );
}
