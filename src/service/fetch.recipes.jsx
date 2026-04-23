const BASE_URL = "http://localhost:3000/api/recipes";

export const fetchRecipes = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "",
  kesulitan = "",
  sort = "",
} = {}) => {
  try {
    const query = new URLSearchParams({
      page,
      limit,
      search,
      category,
      kesulitan,
      sort,
    });

    const res = await fetch(`${BASE_URL}?${query.toString()}`);
    const data = await res.json();

    if (!data.success) throw new Error("fetch failed");

    return data;
  } catch (err) {
    console.error(err);
    return { data: [], meta: {} };
  }
};

export const fetchRecipeById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json.data;
  } catch (err) {
    console.error("fetchRecipeById error:", err);
    return null;
  }
};

export const createRecipe = async (payload) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json.data;
  } catch (err) {
    console.error("createRecipe error:", err);
    return null;
  }
};

export const updateRecipe = async (id, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return json.data;
  } catch (err) {
    console.error("updateRecipe error:", err);
    return null;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.message);

    return true;
  } catch (err) {
    console.error("deleteRecipe error:", err);
    return false;
  }
};
