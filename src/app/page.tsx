import { FakeAPIProduct } from "core/types/product";
import styles from "./page.module.scss";
import { ProductList } from "core/components/product-list/product-list";
import { OrderBy } from "core/components/order-by/order-by";
import { getProducts } from "core/utils/getProducts";

export default async function Home() {
  const products: FakeAPIProduct[] = await getProducts();
  return (
    <main className={styles.main}>
      <OrderBy />
      <ProductList products={products} />
    </main>
  );
}
export const dynamic = "force-dynamic";
