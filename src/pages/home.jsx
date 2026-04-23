import { useEffect, useState } from "react";
import { fetchRecipes } from "../service/fetch.recipes";

import RecipeCard from "../components/recipe/recipe.card";
import FilterBar from "../components/recipe/filterbar";
import Pagination from "../components/common/pagination";
import RecipeModal from "../components/form/recipe.modal";
import Accordion from "../components/common/accordion";

const initialFilter = {
  search: "",
  category: "",
  kesulitan: "",
  sort: "",
};

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialFilter);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(false);

  const perPage = 6;

  const loadData = async () => {
    setLoading(true);

    const res = await fetchRecipes({
      page,
      limit: perPage,
      search: filter.search,
      category: filter.category,
      kesulitan: filter.kesulitan,
      sort: filter.sort,
    });

    setRecipes(res.data || []);
    setMeta(res.meta || {});
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [page, filter.search, filter.category, filter.kesulitan, filter.sort]);

  useEffect(() => {
    setPage(1);
  }, [filter.search, filter.category, filter.kesulitan, filter.sort]);

  const submitRecipe = async (payload) => {
    const confirmSubmit = window.confirm("Yakin mau simpan resep ini?");
    if (!confirmSubmit) return false;

    try {
      const res = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          waktu_masak: Number(payload.waktu_masak || 0),
          porsi: Number(payload.porsi || 0),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Gagal menambahkan resep");
        return false;
      }

      alert("Resep berhasil ditambahkan");
      setModal(false);
      setPage(1);
      await loadData();
      return true;
    } catch (err) {
      console.error(err);
      alert("Server error");
      return false;
    }
  };

  const deleteRecipe = async (id) => {
    const confirmDelete = window.confirm("Hapus resep ini?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      alert("Gagal hapus");
      return;
    }

    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  if (selected) {
    return (
      <div className="min-h-screen bg-slate-950 p-6 text-white">
        <button
          className="mb-4 text-sm text-white/50"
          onClick={() => setSelected(null)}
        >
          Back
        </button>

        <h1 className="text-2xl font-bold">{selected.nama}</h1>

        <p className="text-sm text-white/50">
          {selected.category} | {selected.kesulitan}
        </p>

        <div className="mt-6">
          <h2 className="mb-2 font-semibold">Ingredients</h2>
          <ul className="ml-5 list-disc text-white/70">
            {selected.ingredients?.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.nama} - {ingredient.jumlah} {ingredient.satuan}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="mb-2 font-semibold">Steps</h2>
          <Accordion items={selected.steps?.map((step) => step.deskripsi) || []} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dishlab</h1>
        <p className="mt-1 text-sm text-white/50">
          Explore and build recipes
        </p>
      </div>

      <FilterBar setFilter={setFilter} onAdd={() => setModal(true)} />

      {loading && (
        <div className="py-10 text-white/50">Loading recipes...</div>
      )}

      <div className="mt-4 min-h-[420px]">
        {!loading && recipes.length === 0 ? (
          <div className="flex h-[420px] items-center justify-center text-white/40">
            No recipes found
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDetail={setSelected}
                onDelete={deleteRecipe}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={meta?.totalPages || 1}
        />
      </div>

      <RecipeModal
        open={modal}
        onClose={() => setModal(false)}
        onSubmit={submitRecipe}
      />
    </div>
  );
}
