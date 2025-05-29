'use client';
import { useEffect, useState } from "react";

interface ScraperResponse {
  products: string[];
  error?: string;
}

export default function Home() {
  const [products, setProducts] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScraperData = async () => {
      console.log("Starting to fetch scraper data...");
      try {
        const res = await fetch("https://webscraping-3uov.onrender.com/scrape");
        console.log("Fetching scraper data...");
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

  console.log("Products:", products);

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1>Webscraping App</h1>

      <h2>Scraped Products from Takealot</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && !products && <p>Loading...</p>}
      {products && (
        <ul>
          {products.map((product, i) => (
            <li key={i}>{product}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
