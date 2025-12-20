import { writable, derived } from 'svelte/store';

// Game State Store
function createGameStore() {
    const { subscribe, set, update } = writable({
        currentScreen: 'login',
        playerName: '',
        walletAddress: '', // MetaMask wallet address
        credits: 350,
        coins: 500,
        gems: 10,
        score: 0,
        level: 1,
        starHealth: 100,
        isPlaying: false,
        ownedShips: ['player-ship'], // Ships owned by player
        selectedShip: 'player-ship',
        settings: {
            musicVolume: 0.7,
            sfxVolume: 0.5,
            invertOrbit: false,
            highQuality: true,
            language: 'ENGLISH'
        },
        upgrades: {
            laserDamage: 80,
            fireRate: 20,
            hullIntegrity: 40,
            orbitControl: 5
        }
    });

    return {
        subscribe,
        setScreen: (screen) => update(s => ({ ...s, currentScreen: screen })),
        setPlayerName: (name) => update(s => ({ ...s, playerName: name })),
        setWalletAddress: (address) => update(s => ({ ...s, walletAddress: address })),
        addCredits: (amount) => update(s => ({ ...s, credits: s.credits + amount })),
        addScore: (points) => update(s => ({ ...s, score: s.score + points })),
        damagestar: (amount) => update(s => ({ ...s, starHealth: Math.max(0, s.starHealth - amount) })),
        purchaseUpgrade: (id, cost) => update(s => {
            if (s.credits >= cost) {
                return {
                    ...s,
                    credits: s.credits - cost,
                    upgrades: { ...s.upgrades, [id]: s.upgrades[id] + 5 }
                };
            }
            return s;
        }),
        startGame: () => update(s => ({ ...s, isPlaying: true, score: 0, starHealth: 100 })),
        endGame: () => update(s => ({ ...s, isPlaying: false })),
        addCoins: (amount) => update(s => ({ ...s, coins: s.coins + amount })),
        addGems: (amount) => update(s => ({ ...s, gems: s.gems + amount })),
        buyShip: (shipId, cost) => update(s => {
            if (s.coins >= cost && !s.ownedShips.includes(shipId)) {
                return {
                    ...s,
                    coins: s.coins - cost,
                    ownedShips: [...s.ownedShips, shipId]
                };
            }
            return s;
        }),
        selectShip: (shipId) => update(s => {
            if (s.ownedShips.includes(shipId)) {
                return { ...s, selectedShip: shipId };
            }
            return s;
        }),
        buyHealthKit: (cost) => update(s => {
            if (s.coins >= cost) {
                return {
                    ...s,
                    coins: s.coins - cost,
                    starHealth: Math.min(100, s.starHealth + 30)
                };
            }
            return s;
        }),
        buyGems: (amount, coinCost) => update(s => {
            if (s.coins >= coinCost) {
                return {
                    ...s,
                    coins: s.coins - coinCost,
                    gems: s.gems + amount
                };
            }
            return s;
        }),
        reset: () => set({
            currentScreen: 'login',
            playerName: '',
            credits: 350,
            coins: 500,
            gems: 10,
            score: 0,
            starHealth: 100,
            isPlaying: false,
            ownedShips: ['player-ship'],
            selectedShip: 'player-ship',
            settings: {
                musicVolume: 0.7,
                sfxVolume: 0.5,
                invertOrbit: false,
                highQuality: true,
                language: 'ENGLISH'
            },
            upgrades: {
                laserDamage: 80,
                fireRate: 20,
                hullIntegrity: 40,
                orbitControl: 5
            }
        })
    };
}

export const gameStore = createGameStore();

// Derived store for fire rate calculation
export const fireRate = derived(gameStore, $game => 1 / ($game.upgrades.fireRate / 5));
