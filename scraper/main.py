from fastapi import FastAPI
import chromedriver_autoinstaller
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS - allow your frontend origin
origins = [
    # "http://localhost:3000",
    "*"
    # You can add more origins here, or use ["*"] to allow all (less secure)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # <-- allow frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scrape")
async def scrape_macbooks():
    chromedriver_autoinstaller.install()

    options = Options()
    # options.add_argument("--headless")  # Uncomment for headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)

    driver = webdriver.Chrome(options=options)

    # Hide webdriver property
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    driver.get("https://www.takealot.com/all?_sb=1&_r=1&qsearch=macbook%20air")

    wait = WebDriverWait(driver, 30)
    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "article.product-card")))

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    products = []
    product_cards = soup.select("article.product-card")

    for card in product_cards:
        # Title
        title_tag = card.select_one("h4.product-card-module_product-title_16xh8")
        title = title_tag.get_text(strip=True) if title_tag else None

        # Brand
        brand_tag = card.select_one("div[data-ref='brand-wrapper'] a")
        brand = brand_tag.get_text(strip=True) if brand_tag else None

        # Price (currency + amount)
        price_li = card.select_one("li.price")
        if price_li:
            currency = price_li.select_one("span.currency")
            amount = price_li.select_one("span.amount")
            price = f"{currency.get_text(strip=True) if currency else ''}{amount.get_text(strip=True) if amount else ''}"
        else:
            price = None

        # Product URL (relative link from anchor with class 'product-card-module_link-underlay_3sfaA')
        link_tag = card.select_one("a.product-card-module_link-underlay_3sfaA")
        url = f"https://www.takealot.com{link_tag['href']}" if link_tag and link_tag.has_attr('href') else None

        # Image URL
        img_tag = card.select_one("img.product-card-image-module_product-image_3mJsJ")
        image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else None

        # Rating
        rating_tag = card.select_one("span.score")
        rating = rating_tag.get_text(strip=True) if rating_tag else None

        # Review count
        reviews_tag = card.select_one("span.rating-module_review-count_3g6zO")
        reviews = reviews_tag.get_text(strip=True) if reviews_tag else "0"

        products.append({
            "title": title,
            "brand": brand,
            "price": price,
            "url": url,
            "image_url": image_url,
            "rating": rating,
            "reviews": reviews,
        })

    driver.quit()
    return {"products": products}
