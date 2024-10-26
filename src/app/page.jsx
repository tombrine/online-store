"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "./components/product-card";

export default function Home() {
  const [skipCount, setSkipCount] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [select, setSelect] = useState();
  const limit = 30;
  const fetchProducts = async () => {
    if (select) {
      console.log("working");
      const response = await fetch(
        `https://dummyjson.com/product/category/${select}`
      );
      const data = await response.json();
      const { products } = data;
      setAllProducts(products);
    } else {
      const response = await fetch(
        `https://dummyjson.com/product?limit=${limit}&skip=${skipCount * limit}`
      );
      const data = await response.json();
      const { products } = data;
      setAllProducts(products);
    }

    const responseCategory = await fetch(
      `https://dummyjson.com/products/category-list/`
    );
    const categories = await responseCategory.json();
    setAllCategories(categories);
  };

  const btnIncrease = () => setSkipCount(skipCount + 1);
  const btnDecrease = () => {
    if (skipCount == 1) return;
    setSkipCount(skipCount - 1);
  };

  useEffect(() => {
    console.log(skipCount);
    fetchProducts();
  }, [skipCount, select]);

  return (
    <main>
      <section>
        <div className="container">
          <select
            name=""
            id=""
            value={select}
            onChange={(e) => {
              setSelect(e.target.value);
            }}
          >
            <option value="">All</option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="row">
            {allProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="btns">
            <button onClick={btnDecrease}>{"<"}</button>
            <h1>{skipCount}</h1>
            <button onClick={btnIncrease}>{">"}</button>
          </div>
        </div>
      </section>
    </main>
  );
}
