import { useEffect, useState } from "react";

const initialFilter = {
  search: "",
  category: "",
  kesulitan: "",
  sort: "",
};

export default function FilterBar({ setFilter, onAdd }) {
  const [localFilter, setLocalFilter] = useState(initialFilter);

  const categories = ["food", "drink", "snack", "dessert"];
  const levels = ["mudah", "sedang", "sulit"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter((prev) => ({
        ...prev,
        search: localFilter.search,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilter.search, setFilter]);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      category: localFilter.category,
      kesulitan: localFilter.kesulitan,
      sort: localFilter.sort,
    }));
  }, [localFilter.category, localFilter.kesulitan, localFilter.sort, setFilter]);

  const handleChange = (key, value) => {
    setLocalFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilter = () => {
    setLocalFilter(initialFilter);
    setFilter(initialFilter);
  };

  return (
    <div className="mb-6 rounded-xl border border-white/10 bg-slate-900 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        <input
          type="text"
          placeholder="Search recipes..."
          value={localFilter.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-white outline-none"
        />

        <select
          value={localFilter.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="rounded-lg bg-slate-800 px-3 py-2 text-white"
        >
          <option value="">All Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={localFilter.kesulitan}
          onChange={(e) => handleChange("kesulitan", e.target.value)}
          className="rounded-lg bg-slate-800 px-3 py-2 text-white"
        >
          <option value="">All Level</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        <button
          onClick={onAdd}
          className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          + Add
        </button>

        <button
          onClick={clearFilter}
          className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
