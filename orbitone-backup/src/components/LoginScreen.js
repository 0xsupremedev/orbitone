import { ICONS } from '../utils/Icons.js';

export class LoginScreen {
    constructor(game) {
        this.game = game;
        this.render();
    }

    render() {
        const template = `
            <div id="login-screen" class="screen">
                <h1 class="glow-text title">ORBIT ONE</h1>
                
                <div class="star-container">
                    <div class="star-glow"></div>
                    <div class="star"></div>
                    <div class="orbital-ring"></div>
                </div>

                <div class="login-panel glass-panel">
                    <div class="input-group">
                        <label for="player-name">ENTER PLAYER NAME</label>
                        <input type="text" id="player-name" placeholder="COMMANDER NAME..." maxlength="15">
                    </div>
                    
                    <div class="button-group">
                        <button id="google-login" class="neon-button">
                            ${ICONS.link} GOOGLE PLAY LOGIN
                        </button>
                        <button id="guest-login" class="neon-button secondary">
                            ${ICONS.user} GUEST LOGIN
                        </button>
                    </div>
                </div>

                <div class="legal-links">
                    <a>TERMS OF SERVICE</a>
                    <a>PRIVACY POLICY</a>
                </div>
            </div>
        `;

        this.game.overlay.innerHTML = template;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const guestBtn = document.getElementById('guest-login');
        const googleBtn = document.getElementById('google-login');
        const nameInput = document.getElementById('player-name');

        guestBtn.addEventListener('click', () => {
            this.game.state.playerName = nameInput.value || 'GUEST_PILOT';
            this.game.showScreen('main-menu');
        });
    }

    destroy() {
        // Cleanup if needed
    }
}

