import React from "react";
import { Category } from "../types";

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selectedId, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1 rounded-full text-sm border ${
          selectedId === null ? "bg-blue-500 text-white" : "bg-white"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-3 py-1 rounded-full text-sm border ${
            selectedId === cat.id ? "bg-blue-500 text-white" : "bg-white"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
