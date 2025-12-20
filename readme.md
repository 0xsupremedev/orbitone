# 🚀 ORBIT ONE

<div align="center">
  <img src="static/orbit one banner.png" alt="Orbit One Banner" width="400"/>
  
  **A futuristic 3D space defense game built with SvelteKit and Three.js**
  
  [![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
  [![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![MetaMask](https://img.shields.io/badge/MetaMask-F6851B?style=for-the-badge&logo=metamask&logoColor=white)](https://metamask.io/)
  
  [Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation)
</div>

---

## 📖 About

**Orbit One** is an immersive 3D space defense game where players orbit around a star, defending it from incoming asteroids, aliens, and space dragons. Built with modern web technologies, it features stunning neon-cyberpunk aesthetics, real-time 3D graphics, and Web3 wallet integration.

## ✨ Features

### 🎮 Gameplay
- **Orbital Combat**: Control your spaceship as it orbits around a central star
- **Click-to-Lock Targeting**: Click on enemies to lock your aim for precision shooting
- **Multiple Enemy Types**: Asteroids, Aliens, and Space Dragons with unique behaviors
- **Progressive Difficulty**: Enemies get faster and stronger as you advance

### 🎨 UI/UX
- **Neon Cyberpunk Design**: Stunning glass-morphism panels with cyan and orange glow effects
- **Responsive Layout**: Optimized for desktop and mobile browsers
- **Animated Effects**: Post-processing bloom, particle systems, and smooth transitions
- **Player Profiles**: Detailed stats with radar charts and performance metrics

### 💰 Economy System
- **Credits & Coins**: Earn currency by destroying enemies
- **Gem System**: Premium currency for special items
- **Ship Shop**: Purchase and customize different spaceships
- **Upgrade System**: Enhance laser damage, fire rate, hull integrity, and orbit control

### 🏆 Social Features
- **Leaderboard**: Compete with top commanders globally
- **Player Profiles**: View detailed stats, achievements, and skill distribution
- **Avatar System**: Random avatar generation for each player

### 🔗 Web3 Integration
- **MetaMask Login**: Connect your Ethereum wallet to login
- **Wallet Display**: Show your wallet address in player profiles
- **Decentralized Identity**: Your wallet = your game identity

## 🛠 Tech Stack

### Frontend Framework
| Technology | Purpose |
|------------|---------|
| **SvelteKit** | Full-stack web framework with SSR/SSG support |
| **Svelte** | Reactive component framework with minimal bundle size |
| **Vite** | Lightning-fast build tool and dev server |

### 3D Graphics
| Technology | Purpose |
|------------|---------|
| **Three.js** | WebGL-based 3D rendering engine |
| **Threlte** | Svelte bindings for Three.js (declarative 3D) |
| **@threlte/core** | Core Threlte library |
| **@threlte/extras** | Additional components (GLTF, Environment, etc.) |

### Post-Processing
| Technology | Purpose |
|------------|---------|
| **EffectComposer** | Three.js post-processing pipeline |
| **UnrealBloomPass** | Neon glow bloom effects |
| **RenderPass / OutputPass** | Scene rendering passes |

### State Management
| Technology | Purpose |
|------------|---------|
| **Svelte Stores** | Reactive state management |
| **Zustand-style patterns** | Game state organization |

### Data Visualization
| Technology | Purpose |
|------------|---------|
| **Chart.js** | Interactive charts (radar, doughnut) |
| **Avatar API** | Dynamic player avatar generation |

### Web3
| Technology | Purpose |
|------------|---------|
| **MetaMask** | Ethereum wallet integration |
| **window.ethereum** | Web3 provider detection |

### Styling
| Technology | Purpose |
|------------|---------|
| **CSS Variables** | Theming with neon colors |
| **Glass-morphism** | Modern frosted glass UI effects |
| **CSS Grid/Flexbox** | Responsive layouts |

## 📁 Project Structure

```
orbitone/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                    # UI Components
│   │   │   │   ├── LoginScreen.svelte      # MetaMask + Guest login
│   │   │   │   ├── MainMenu.svelte         # Game mode selection
│   │   │   │   ├── UpgradeScreen.svelte    # Ship upgrades
│   │   │   │   ├── ShopScreen.svelte       # In-game shop
│   │   │   │   ├── SettingsScreen.svelte   # Game settings
│   │   │   │   ├── LeaderboardScreen.svelte # Global rankings
│   │   │   │   └── PlayerProfileModal.svelte # Stats & charts
│   │   │   ├── models/
│   │   │   │   ├── Spaceship.svelte   # Player ship model
│   │   │   │   └── Target.svelte      # Enemy models (asteroid, alien, dragon)
│   │   │   ├── Scene.svelte           # Main 3D game scene
│   │   │   ├── App.svelte             # Root component
│   │   │   └── ...
│   │   └── stores/
│   │       └── gameStore.js           # Global game state
│   ├── routes/
│   │   └── +page.svelte               # Main entry point
│   └── app.css                        # Global styles
├── static/
│   ├── orbit one banner.png           # Game banner
│   ├── left arrow.png                 # Navigation icon
│   ├── settings icon.png              # Settings icon
│   ├── leaderboard cup.png            # Trophy icon
│   ├── shop button.png                # Shop icon
│   └── space.jpg                      # Background image
├── package.json
├── svelte.config.js
├── vite.config.js
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- MetaMask browser extension (for Web3 features)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/0xsupremedev/orbitone.git
cd orbitone

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 🎯 How to Play

1. **Login**: Connect with MetaMask or play as Guest
2. **Choose Mode**: Select Endless Run (other modes coming soon)
3. **Upgrade**: Spend credits to enhance your ship
4. **Play**: 
   - Mouse moves your ship around the orbit
   - Click to shoot at enemies
   - Click on enemies to lock your aim
   - Protect the central star from being destroyed!

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Neon Cyan | `#00f2ff` | Primary highlights, glow effects |
| Fiery Orange | `#ff6600` | Warnings, fire effects |
| Fiery Red | `#ff0033` | Health, critical alerts |
| Deep Space | `#050a1b` | Background, panels |

### Typography
- **Font**: Orbitron (Google Fonts)
- **Weights**: 400, 700, 900
- **Style**: All-caps with letter-spacing

## 📊 Game State

The game uses a centralized store (`gameStore.js`) managing:

```javascript
{
  currentScreen: 'login' | 'main-menu' | 'upgrades' | 'shop' | 'settings' | 'leaderboard' | 'game',
  playerName: string,
  walletAddress: string,    // MetaMask address
  credits: number,
  coins: number,
  gems: number,
  score: number,
  starHealth: number,       // 0-100
  isPlaying: boolean,
  ownedShips: string[],
  selectedShip: string,
  settings: { ... },
  upgrades: { ... }
}
```

## 🔮 Roadmap

- [ ] Campaign Mode with story missions
- [ ] Daily Challenges with special rewards
- [ ] Multiplayer co-op defense
- [ ] NFT ship skins
- [ ] On-chain leaderboard
- [ ] Mobile app (Capacitor)
- [ ] Sound effects and music
- [ ] More enemy types and bosses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**0xSupremeDev**
- GitHub: [@0xsupremedev](https://github.com/0xsupremedev)

---

<div align="center">
  <b>⭐ Star this repo if you like it! ⭐</b>
  
  Made with 💜 using Svelte, Three.js, and Web3
</div>