import { ICONS } from '../utils/Icons.js';

export class GameOverScreen {
    constructor(game, data = { score: 0, distance: 0.0 }) {
        this.game = game;
        this.data = data;
        this.render();
    }

    render() {
        const stats = this.data;
        const template = `
            <div id="game-over-screen" class="screen">
                <h1 class="glow-text title danger">MISSION ENDED</h1>
                <div class="results-panel glass-panel">
                    <div class="stat-row">
                        <span>SCORE</span>
                        <span class="glow-text">${stats.score}</span>
                    </div>
                    <div class="stat-row">
                        <span>DISTANCE Reached</span>
                        <span class="glow-text">${stats.distance} LY</span>
                    </div>
                    <div class="stat-row credits-row">
                        <span>${ICONS.coin} CREDITS EARNED</span>
                        <span class="glow-text">+${Math.floor(stats.score / 10)}</span>
                    </div>
                </div>
                <div class="actions">
                    <button id="retry-btn" class="neon-button pulse">${ICONS.replay} RETRY MISSION</button>
                    <button id="upgrades-btn" class="neon-button secondary">${ICONS.laser} UPGRADES</button>
                    <button id="menu-btn" class="neon-button secondary">${ICONS.home} MAIN MENU</button>
                </div>
            </div>
        `;
        this.game.overlay.innerHTML = template;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('retry-btn').addEventListener('click', () => {
            this.game.showScreen('gameplay');
        });

        document.getElementById('upgrades-btn').addEventListener('click', () => {
            this.game.showScreen('upgrades');
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.game.showScreen('main-menu');
        });
    }

    destroy() {
        // Cleanup logic
    }
}
