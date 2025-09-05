
# 🎨 Color Game Mini Web

This project is a fun, interactive color game built with Next.js and TypeScript. Play, bet, and win by choosing color combinations and spinning for rewards! The app also integrates with crypto wallets for token-based betting and rewards.

## Features

- 🎲 Pick and bet on your favorite color combinations
- 🪙 Connect your crypto wallet and use tokens for betting
- 🏆 Win rewards based on your chosen colors and luck
- 🔄 Real-time UI updates and smooth gameplay
- 🧩 Modern, modular codebase (Next.js, TypeScript, Ethers.js)

## Getting Started

**Disclaimer:** This project does **not** collect any user data. All data is processed and stored locally in your browser or wallet.

### 1. Clone and Install

```sh
git clone https://github.com/cordy001/color_game.git
cd color_game
cd frontend && npm install
cd ../backend && npm install
```

### 2. Run the App

Start the backend (if needed):

```sh
cd backend
npx ts-node socket.ts
```

Start the frontend:

```sh
cd frontend
npm run dev
```

Visit [http://localhost:3000/](http://localhost:3000/) in your browser.

### 3. Configure Blockchain Settings

1. Get your RPC endpoint at https://portal.cdp.coinbase.com/products/address-history
2. Update the `RPC_Endpoint` and contract addresses in `/src/app/config/conf/setting.json` as needed.

---

Enjoy playing the Color Game and good luck!
