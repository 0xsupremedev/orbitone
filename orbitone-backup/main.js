import { LoginScreen } from './src/components/LoginScreen.js';
import { MainMenu } from './src/components/MainMenu.js';
import { UpgradeScreen } from './src/components/UpgradeScreen.js';
import { SettingsScreen } from './src/components/SettingsScreen.js';
import { GameOverScreen } from './src/components/GameOverScreen.js';
import { GameEngine } from './src/engine/GameEngine.js';
import { PlayerController } from './src/engine/PlayerController.js';

class GameApp {
    constructor() {
        this.container = document.getElementById('game-container');
        this.overlay = document.getElementById('screen-overlay');
        this.canvas = document.getElementById('game-canvas');
        this.currentScreen = null;

        this.state = {
            credits: 350,
            playerName: '',
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
        };

        this.engine = new GameEngine(this);
        this.player = new PlayerController(this.engine);
        this.engine.player = this.player;


        this.init();
    }

    init() {
        this.showScreen('login');
    }

    showScreen(screenId) {
        if (this.currentScreen) {
            this.currentScreen.destroy();
        }

        this.overlay.innerHTML = '';

        switch (screenId) {
            case 'login':
                this.currentScreen = new LoginScreen(this);
                break;
            case 'main-menu':
                this.currentScreen = new MainMenu(this);
                break;
            case 'upgrades':
                this.currentScreen = new UpgradeScreen(this);
                break;
            case 'settings':
                this.currentScreen = new SettingsScreen(this);
                break;
            case 'game-over':
                this.currentScreen = new GameOverScreen(this, {
                    score: this.engine.score,
                    distance: (this.engine.score / 100).toFixed(1)
                });
                break;
            case 'gameplay':
                this.overlay.innerHTML = ''; // Clear overlay
                this.engine.start();
                break;
            // More screens to follow
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new GameApp();
});
