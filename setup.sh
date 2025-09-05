#!/bin/bash
set -e

GREEN="\033[32m"
BLUE="\033[34m"
YELLOW="\033[33m"
RESET="\033[0m"

cd frontend

echo -e "${BLUE}<==> Starting installation... <==>${RESET}"

# Update package lists
echo -e "${YELLOW}==> Updating package lists...${RESET}"
sudo apt-get update
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install essential packages (optional if already present in Codespaces)
echo -e "${YELLOW}==> Installing Essential Packages...${RESET}"

sudo apt-get install -y nodejs npm

# Verify installations

echo -e "${GREEN}==> Node.js version:${RESET}"
node -v
npm -v
npx -v

echo -e "${YELLOW}==> Installing NPM packages...${RESET}"
npm install

echo -e "${BLUE}<==> Building Next.js app... <==>${RESET}"
echo -e "${YELLOW}==> Running lint...${RESET}"
npm run lint
echo -e "${YELLOW}==> Running build...${RESET}"
npm run build

# Start Next.js server (this will block)
echo -e "${GREEN}==> Starting Next.js at http://localhost:3000...${RESET}"
npm run start