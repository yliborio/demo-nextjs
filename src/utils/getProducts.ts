import { FakeAPIProduct } from "core/types/product";

export const getProducts = async () => {
  let products: FakeAPIProduct[] = [];
  try {
    const data = await fetch(`https://fakestoreapi.com/products`, {
      next: { revalidate: 60 },
    });
    if (!data.ok) throw new Error(`Failed to fetch products: ${data.status}`);
    products = await data.json();
  } catch (err) {
    console.error("Products fetch failed, using local fallback:", err);
    products = [];
  }
  return products;
};
