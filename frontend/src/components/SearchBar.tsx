interface Props {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search for jobs..."
      className="w-full p-2 border rounded mb-4"
    />
  );
}
