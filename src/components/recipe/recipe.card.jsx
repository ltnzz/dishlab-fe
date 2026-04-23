import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function RecipeCard({ recipe, onDetail, onDelete }) {
  return (
    <div className="relative bg-slate-900 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(recipe.id);
        }}
        className="absolute top-2 right-2 z-10 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 px-2 py-1 rounded"
      >
        Delete
      </button>

      <div
        onClick={() => onDetail(recipe)}
        className="h-40 bg-slate-800 flex items-center justify-center text-white/30 overflow-hidden"
      >
        <img
          src="/foto1.jpg"
          alt="recipe"
          className="w-full h-full object-cover"
        />
      </div>

      <div onClick={() => onDetail(recipe)} className="p-4">
        <h2 className="text-lg font-semibold truncate">{recipe.nama}</h2>

        <p className="text-xs text-white/50 mt-1">
          {recipe.category || "Unknown"} |{" "}
          <span className="capitalize">{recipe.kesulitan}</span>
        </p>

        <div className="flex gap-3 mt-3 text-xs text-white/60">
          <span>{recipe.ingredients?.length || 0} ingredients</span>
          <span>{recipe.steps?.length || 0} steps</span>
        </div>
      </div>
    </div>
  );
}
