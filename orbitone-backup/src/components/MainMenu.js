import { ICONS } from '../utils/Icons.js';

export class MainMenu {
    constructor(game) {
        this.game = game;
        this.render();
    }

    render() {
        const template = `
            <div id="main-menu" class="screen">
                <div class="header-nav">
                    <button id="back-to-login" class="icon-btn back-btn">${ICONS.arrowLeft}</button>
                    <h2 class="glow-text">CHOOSE MENU</h2>
                    <button id="settings-btn" class="icon-btn settings-btn">${ICONS.settings}</button>
                </div>
                
                <div class="mode-selection">
                    <div class="mode-card glass-panel" id="mode-campaign">
                        <div class="mode-icon">${ICONS.planet}</div>
                        <h3>CAMPAIGN</h3>
                        <p>STORY MISSIONS</p>
                    </div>
                    
                    <div class="mode-card glass-panel highlighted" id="mode-endless">
                        <div class="mode-icon">${ICONS.infinity}</div>
                        <h3>ENDLESS RUN</h3>
                        <p>SURVIVE THE SWARM</p>
                    </div>
                    
                    <div class="mode-card glass-panel" id="mode-daily">
                        <div class="mode-icon">${ICONS.calendar}</div>
                        <h3>DAILY</h3>
                        <p>SPECIAL CHALLENGE</p>
                    </div>
                </div>

                <div class="footer-stats">
                    <p class="glow-text">${ICONS.coin} CREDITS: ${this.game.state.credits}</p>
                </div>
            </div>
        `;

        this.game.overlay.innerHTML = template;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('back-to-login').addEventListener('click', () => {
            this.game.showScreen('login');
        });

        document.getElementById('settings-btn').addEventListener('click', () => {
            this.game.showScreen('settings');
        });

        document.getElementById('mode-endless').addEventListener('click', () => {
            this.game.showScreen('upgrades'); // Usually goes to upgrades before game
        });
    }

    destroy() {
    }
}
