interface Props {
  categories: string[];
  onSelect: (category: string) => void;
}

export default function JobFilter({ categories, onSelect }: Props) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
