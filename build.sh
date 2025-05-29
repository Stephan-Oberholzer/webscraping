#!/usr/bin/env bash

# Install dependencies
apt-get update
apt-get install -y wget curl unzip gnupg

# Add Google's signing key and Chrome repo
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Install Chrome
apt-get update
apt-get install -y google-chrome-stable

# Verify installation
google-chrome --version
