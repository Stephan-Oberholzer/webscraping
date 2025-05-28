'use client';
import {  useState } from 'react';

// Define types for API responses
interface BackendData {
  message?: string; // Adjust based on your Java backend response
}

interface ScraperData {
  data?: string; // Adjust based on your Python scraper response
}

interface ErrorResponse {
  error: string;
}

export default function Home() {
  // const [backendData] = useState<BackendData | ErrorResponse | null>({ message: 'Java backend not connected yet' });
  // const [scraperData] = useState<ScraperData | ErrorResponse | null>({ data: 'Python scraper not connected yet' });

  console.log('Rendering Home component');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace with your actual Render URLs
  //       const backendUrl = 'https://yourapp.onrender.com/api/data'; // Update this
  //       const scraperUrl = 'https://yourscraper.onrender.com/scrape'; // Update this

  //       // Fetch Java backend data
  //       const javaResponse = await fetch(backendUrl, { cache: 'no-store' });
  //       if (!javaResponse.ok) {
  //         throw new Error(`Backend fetch failed: ${javaResponse.status}`);
  //       }
  //       const javaData: BackendData = await javaResponse.json();
  //       setBackendData(javaData);

  //       // Fetch Python scraper data
  //       const scraperResponse = await fetch(scraperUrl, { cache: 'no-store' });
  //       if (!scraperResponse.ok) {
  //         throw new Error(`Scraper fetch failed: ${scraperResponse.status}`);
  //       }
  //       const scraperData: ScraperData = await scraperResponse.json();
  //       setScraperData(scraperData);
  //     } catch (error: unknown) {
  //       console.error('Error fetching data:', error);
  //       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  //       setBackendData({ error: `Failed to fetch backend data: ${errorMessage}` });
  //       setScraperData({ error: `Failed to fetch scraper data: ${errorMessage}` });
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Webscraping App</h1>
      <p>Welcome to my webscraping project! This app will display data from a Java backend and a Python web scraper once they are integrated.</p>
      <h2>Current Status</h2>
      {/* <p><strong>Backend:</strong> {backendData ? JSON.stringify(backendData) : 'Not available'}</p>
      <p><strong>Scraper:</strong> {scraperData ? JSON.stringify(scraperData) : 'Not available'}</p> */}
      <h2>About</h2>
      <p>This is a small, free project built with:</p>
      <ul>
        <li><strong>Frontend:</strong> Next.js with TypeScript, deployed on GitHub Pages</li>
        <li><strong>Backend:</strong> Java (Spring Boot, to be hosted on Render)</li>
        <li><strong>Scraper:</strong> Python (FastAPI, to be hosted on Render)</li>
      </ul>
      <p>Check back soon for live data!</p>
    </div>
  );
}