import { ICONS } from '../utils/Icons.js';

export class UpgradeScreen {
    constructor(game) {
        this.game = game;
        this.render();
    }

    render() {
        const up = this.game.state.upgrades;
        const template = `
            <div id="upgrade-screen" class="screen">
                <div class="header-nav">
                    <button id="back-to-menu" class="icon-btn back-btn">${ICONS.arrowLeft}</button>
                    <h2 class="glow-text">UPGRADES</h2>
                    <div style="width: 50px;"></div> <!-- Spacer -->
                </div>
                
                <div class="upgrade-grid">
                    <div class="upgrade-card glass-panel" data-id="laserDamage">
                        <h3>LASER DAMAGE</h3>
                        <div class="upgrade-icon">${ICONS.laser}</div>
                        <p class="stat-val">${up.laserDamage} / S</p>
                        <button class="neon-button cost-btn">${ICONS.coin} 100</button>
                    </div>
                    
                    <div class="upgrade-card glass-panel" data-id="fireRate">
                        <h3>FIRE RATE</h3>
                        <div class="upgrade-icon">${ICONS.fireRate}</div>
                        <p class="stat-val">${up.fireRate} / S</p>
                        <button class="neon-button cost-btn">${ICONS.coin} 100</button>
                    </div>
                    
                    <div class="upgrade-card glass-panel" data-id="hullIntegrity">
                        <h3>HULL INTEGRITY</h3>
                        <div class="upgrade-icon">${ICONS.shield}</div>
                        <p class="stat-val">${up.hullIntegrity} PT</p>
                        <button class="neon-button cost-btn">${ICONS.coin} 100</button>
                    </div>
                    
                    <div class="upgrade-card glass-panel" data-id="orbitControl">
                        <h3>ORBIT CONTROL</h3>
                        <div class="upgrade-icon">${ICONS.orbit}</div>
                        <p class="stat-val">LVL ${up.orbitControl}</p>
                        <button class="neon-button cost-btn">${ICONS.coin} 100</button>
                    </div>
                </div>

                <div class="footer-stats">
                    <p class="glow-text credits-display">${ICONS.coin} CREDITS: ${this.game.state.credits}</p>
                    <button id="start-mission" class="neon-button" style="margin-left: 40px; width: 200px;">START MISSION</button>
                </div>
            </div>
        `;

        this.game.overlay.innerHTML = template;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('back-to-menu').addEventListener('click', () => {
            this.game.showScreen('main-menu');
        });

        document.getElementById('start-mission').addEventListener('click', () => {
            this.game.showScreen('gameplay');
        });

        const cards = document.querySelectorAll('.upgrade-card');
        cards.forEach(card => {
            const buyBtn = card.querySelector('.cost-btn');
            buyBtn.addEventListener('click', () => {
                const upgradeId = card.dataset.id;
                this.purchaseUpgrade(upgradeId);
            });
        });
    }

    purchaseUpgrade(id) {
        if (this.game.state.credits >= 100) {
            this.game.state.credits -= 100;
            this.game.state.upgrades[id] += 5; // Simple increment
            this.render(); // Re-render to update UI
        } else {
            // Flash red or something
            const display = document.querySelector('.credits-display');
            display.style.color = 'var(--fiery-red)';
            setTimeout(() => display.style.color = '', 500);
        }
    }

    destroy() {
    }
}
