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

# Copy your app code
WORKDIR /app
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port if needed
EXPOSE 8000

# Run your FastAPI app (modify this command as needed)
CMD ["uvicorn", "scraper.main:app", "--host", "0.0.0.0", "--port", "8000"]
