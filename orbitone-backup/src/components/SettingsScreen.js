import { ICONS } from '../utils/Icons.js';

export class SettingsScreen {
    constructor(game) {
        this.game = game;
        this.render();
    }

    render() {
        const s = this.game.state.settings;
        const template = `
            <div id="settings-screen" class="screen">
                <div class="header-nav">
                    <button id="back-to-menu" class="icon-btn back-btn">${ICONS.arrowLeft}</button>
                    <h2 class="glow-text">SETTINGS</h2>
                    <div style="width: 50px;"></div>
                </div>
                
                <div class="settings-grid">
                    <div class="settings-col">
                        <div class="setting-item">
                            <label>${ICONS.video} MUSIC VOLUME</label>
                            <input type="range" class="neon-slider" value="${s.musicVolume * 100}">
                        </div>
                        <div class="setting-item">
                            <label>${ICONS.orbit} INVERT ORBIT</label>
                            <div class="toggle ${s.invertOrbit ? 'on' : 'off'}" id="toggle-orbit"></div>
                        </div>
                        <div class="setting-item">
                            <label>${ICONS.globe} LANGUAGE</label>
                            <select class="neon-select">
                                <option ${s.language === 'ENGLISH' ? 'selected' : ''}>ENGLISH</option>
                                <option ${s.language === 'SPANISH' ? 'selected' : ''}>SPANISH</option>
                                <option ${s.language === 'JAPANESE' ? 'selected' : ''}>JAPANESE</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="settings-col">
                        <div class="setting-item">
                            <label>${ICONS.laser} SFX VOLUME</label>
                            <input type="range" class="neon-slider" value="${s.sfxVolume * 100}">
                        </div>
                        <div class="setting-item">
                            <label>${ICONS.fireRate} HIGH QUALITY</label>
                            <div class="toggle ${s.highQuality ? 'on' : 'off'}" id="toggle-quality"></div>
                        </div>
                        <div class="setting-item">
                            <label>${ICONS.user} ACCOUNT</label>
                            <button class="neon-button secondary" style="width: 100%; font-size: 0.8rem;">${ICONS.link} LINK GOOGLE PLAY</button>
                        </div>
                    </div>
                </div>

                <div class="footer-stats">
                    <p class="glow-text">CREDITS: ${this.game.state.credits}</p>
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

        document.getElementById('toggle-orbit').addEventListener('click', (e) => {
            this.game.state.settings.invertOrbit = !this.game.state.settings.invertOrbit;
            e.target.className = `toggle ${this.game.state.settings.invertOrbit ? 'on' : 'off'}`;
        });

        document.getElementById('toggle-quality').addEventListener('click', (e) => {
            this.game.state.settings.highQuality = !this.game.state.settings.highQuality;
            e.target.className = `toggle ${this.game.state.settings.highQuality ? 'on' : 'off'}`;
        });
    }

    destroy() { }
}
