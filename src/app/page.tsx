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
      try {
        const res = await fetch("https://your-scraper.onrender.com/scrape");
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
        <ul>
          {products.map((product, i) => (
            <li key={i}>{product}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
