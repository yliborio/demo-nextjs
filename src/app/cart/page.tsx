"use client";

import { CartItemCard } from "core/components/cart-item-card/cart-item-card";
import styles from "./page.module.scss";
import { Summary } from "core/components/summary/summary";
import { useCart } from "../../hooks/useCart/useCart";
import { useEffect, useState } from "react";
import { FakeAPIProduct } from "core/types/product";
import Skeleton from "react-loading-skeleton";

export default function Page() {
  const { getCartProducts, cart } = useCart();
  const [products, setProducts] = useState<Array<{
    product: FakeAPIProduct;
    quantity: number;
  }> | null>(null);

  useEffect(() => {
    async function fetchCartProducts() {
      const cartProducts = await getCartProducts();
      setProducts(cartProducts);
    }
    fetchCartProducts();
  }, [cart]);

  const productsQtd = products?.length ?? 0;

  if (!products) return <Skeleton count={1} />;

  return (
    <div className={styles["container"]}>
      {productsQtd > 0 ? (
        <div className={styles["items"]}>
          {products?.map((p) => (
            <CartItemCard
              key={p.product.id}
              product={p.product}
              quantity={p.quantity}
            />
          ))}
        </div>
      ) : (
        <h1> Empty cart </h1>
      )}
      <div className={styles["summary"]}>
        <Summary />
      </div>
    </div>
  );
}
