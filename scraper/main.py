from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup

app = FastAPI()

# Allow CORS so your frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in prod, specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scrape")
async def scrape_takealot():
    url = "https://www.takealot.com/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    product_tags = soup.select("a.item-title") 
    print(f"Found {len(product_tags)} product tags.")
    # For example, get all product titles or whatever you want to scrape
    products = [tag.get_text(strip=True) for tag in product_tags]

    return {"products": products}
