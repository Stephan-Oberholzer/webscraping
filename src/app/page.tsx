'use client';
import { useEffect, useState } from "react";

interface Product {
  title: string | null;
  brand: string | null;
  price: string | null;
  url: string | null;
  image_url: string | null;
  rating: string | null;
  reviews: string | null;
}

interface ScraperResponse {
  products: Product[];
  error?: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScraperData = async () => {
      try {
        const res = await fetch("https://webscraping-3uov.onrender.com/scrape");
        // const res = await fetch("http://127.0.0.1:8000/scrape");
        console.log("Fetching data from scraper...");
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error("Failed to fetch scraper data");

        const data: ScraperResponse = await res.json();
        setProducts(data.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    };

    fetchScraperData();
  }, []);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>Webscraping App</h1>

      <h2>Scraped Products from Takealot</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !products && <p>Loading...</p>}
      {products && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {products.map((product, i) => (
            <li
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: 10,
                marginBottom: 15,
                borderRadius: 5,
                display: "flex",
                gap: 15,
                alignItems: "center",
              }}
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title ?? "Product image"}
                  style={{ width: 80, height: 80, objectFit: "contain" }}
                />
              )}
              <div>
                <a
                  href={product.url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "bold", fontSize: 16, color: "#0070f3" }}
                >
                  {product.title ?? "No Title"}
                </a>
                <p style={{ margin: "5px 0" }}>
                  <strong>Brand:</strong> {product.brand ?? "N/A"}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Price:</strong> {product.price ?? "N/A"}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Rating:</strong> {product.rating ?? "No rating"} ({product.reviews ?? "0"} reviews)
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
