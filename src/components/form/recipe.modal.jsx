import { useEffect, useState } from "react";

const initialForm = {
  nama: "",
  deskripsi: "",
  category: "",
  kesulitan: "",
  waktu_masak: "",
  porsi: "",
  gambar: "",
};

const initialIngredient = { nama: "", jumlah: "", satuan: "" };
const initialStep = { deskripsi: "" };

export default function RecipeModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [ingredients, setIngredients] = useState([{ ...initialIngredient }]);
  const [steps, setSteps] = useState([{ ...initialStep }]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setError("");
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const resetState = () => {
    setForm(initialForm);
    setIngredients([{ ...initialIngredient }]);
    setSteps([{ ...initialStep }]);
    setError("");
    setSubmitting(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    setError("");
  };

  const handleIngredientChange = (index, key, value) => {
    setIngredients((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
    setError("");
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { ...initialIngredient },
    ]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length === 1) return;
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStepChange = (index, value) => {
    setSteps((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, deskripsi: value } : item
      )
    );
    setError("");
  };

  const addStep = () => {
    setSteps((prev) => [...prev, { ...initialStep }]);
  };

  const removeStep = (index) => {
    if (steps.length === 1) return;
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const cleanedIngredients = ingredients.filter((item) => item.nama.trim() !== "");
    const cleanedSteps = steps.filter((item) => item.deskripsi.trim() !== "");

    if (!form.nama.trim() || !form.category.trim() || !form.kesulitan.trim()) {
      return "Nama, kategori, dan tingkat kesulitan wajib diisi.";
    }

    if (cleanedIngredients.length < 1) {
      return "Minimal 1 bahan wajib diisi.";
    }

    if (cleanedSteps.length < 1) {
      return "Minimal 1 langkah wajib diisi.";
    }

    if (form.waktu_masak !== "" && Number(form.waktu_masak) < 0) {
      return "Waktu masak tidak boleh negatif.";
    }

    if (form.porsi !== "" && Number(form.porsi) < 0) {
      return "Porsi tidak boleh negatif.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
      waktu_masak: Number(form.waktu_masak || 0),
      porsi: Number(form.porsi || 0),
      ingredients: ingredients.filter((item) => item.nama.trim() !== ""),
      steps: steps
        .filter((item) => item.deskripsi.trim() !== "")
        .map((item, index) => ({
          urutan: index + 1,
          deskripsi: item.deskripsi,
        })),
    };

    const success = await onSubmit(payload);

    if (success) {
      resetState();
    } else {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-slate-900 p-6"
      >
        <h2 className="mb-4 text-xl font-bold">Add Recipe</h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="grid gap-3">
          <input
            placeholder="Nama"
            className="rounded bg-slate-800 p-2"
            value={form.nama}
            onChange={(e) => handleChange("nama", e.target.value)}
          />

          <input
            placeholder="Deskripsi"
            className="rounded bg-slate-800 p-2"
            value={form.deskripsi}
            onChange={(e) => handleChange("deskripsi", e.target.value)}
          />

          <input
            placeholder="Category"
            className="rounded bg-slate-800 p-2"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <select
            className="rounded bg-slate-800 p-2"
            value={form.kesulitan}
            onChange={(e) => handleChange("kesulitan", e.target.value)}
          >
            <option value="">Pilih Kesulitan</option>
            <option value="mudah">Mudah</option>
            <option value="sedang">Sedang</option>
            <option value="sulit">Sulit</option>
          </select>

          <input
            type="number"
            min="0"
            placeholder="Waktu masak"
            className="rounded bg-slate-800 p-2"
            value={form.waktu_masak}
            onChange={(e) => handleChange("waktu_masak", e.target.value)}
          />

          <input
            type="number"
            min="0"
            placeholder="Porsi"
            className="rounded bg-slate-800 p-2"
            value={form.porsi}
            onChange={(e) => handleChange("porsi", e.target.value)}
          />
        </div>

        <h3 className="mt-5 font-semibold">Ingredients</h3>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="mt-2 flex gap-2">
            <input
              placeholder="Nama"
              className="w-full rounded bg-slate-800 p-2"
              value={ingredient.nama}
              onChange={(e) =>
                handleIngredientChange(index, "nama", e.target.value)
              }
            />

            <input
              placeholder="Jumlah"
              className="w-24 rounded bg-slate-800 p-2"
              value={ingredient.jumlah}
              onChange={(e) =>
                handleIngredientChange(index, "jumlah", e.target.value)
              }
            />

            <input
              placeholder="Satuan"
              className="w-24 rounded bg-slate-800 p-2"
              value={ingredient.satuan}
              onChange={(e) =>
                handleIngredientChange(index, "satuan", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeIngredient(index)}
              disabled={ingredients.length === 1}
              className="text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="mt-2 text-sm text-blue-400"
        >
          + Add Ingredient
        </button>

        <h3 className="mt-5 font-semibold">Steps</h3>

        {steps.map((step, index) => (
          <div key={index} className="mt-2 flex gap-2">
            <input
              placeholder={`Step ${index + 1}`}
              className="w-full rounded bg-slate-800 p-2"
              value={step.deskripsi}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />

            <button
              type="button"
              onClick={() => removeStep(index)}
              disabled={steps.length === 1}
              className="text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addStep}
          className="mt-2 text-sm text-blue-400"
        >
          + Add Step
        </button>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="rounded bg-white/10 px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="rounded bg-blue-600 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
