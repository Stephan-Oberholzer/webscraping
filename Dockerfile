# Use official Python image
FROM python:3.11-slim-bullseye

# Install dependencies including Chromium and ChromeDriver
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables so chromedriver and chrome binaries are found
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver
ENV CHROME_BIN=/usr/bin/chromium

# Set working directory
WORKDIR /app

# Copy requirements file first
COPY scraper/requirements.txt ./requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app code
COPY . /app

# Expose port
EXPOSE 10000

# Run your FastAPI app (assuming main.py is in scraper/)
CMD ["uvicorn", "scraper.main:app", "--host", "0.0.0.0", "--port", "10000"]
