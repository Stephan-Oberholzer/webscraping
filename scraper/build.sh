#!/usr/bin/env bash

# Exit immediately on error
set -o errexit  
set -o nounset  
set -o pipefail

# Install Chrome
echo "Installing Google Chrome..."
apt-get update && apt-get install -y wget gnupg2 curl unzip
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt-get install -y ./google-chrome-stable_current_amd64.deb || true  # allow failure if already installed

# Install ChromeDriver
echo "Installing ChromeDriver..."
CHROME_VERSION=$(google-chrome --version | grep -oP '[0-9]+\.([0-9]+)' | head -1)
CHROMEDRIVER_VERSION=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${CHROME_VERSION}")
wget -N "https://chromedriver.storage.googleapis.com/${CHROMEDRIVER_VERSION}/chromedriver_linux64.zip"
unzip -o chromedriver_linux64.zip -d /usr/local/bin/
chmod +x /usr/local/bin/chromedriver

# Verify versions
echo "Chrome version: $(google-chrome --version)"
echo "ChromeDriver version: $(chromedriver --version)"

# Install Python dependencies
echo "Installing Python requirements..."
pip install --upgrade pip
pip install -r requirements.txt
