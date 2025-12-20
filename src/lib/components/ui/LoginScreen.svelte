<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    
    let playerName = '';
    let isConnecting = false;
    let connectionError = '';
    
    function handleGuestLogin() {
        gameStore.setPlayerName(playerName || 'GUEST_PILOT');
        gameStore.setScreen('main-menu');
    }
    
    async function handleMetaMaskLogin() {
        // Check if MetaMask is installed
        if (typeof window.ethereum === 'undefined') {
            connectionError = 'MetaMask not installed! Please install MetaMask extension.';
            return;
        }
        
        isConnecting = true;
        connectionError = '';
        
        try {
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length > 0) {
                const walletAddress = accounts[0];
                
                // Store wallet address
                gameStore.setWalletAddress(walletAddress);
                
                // Use wallet address as player name if not provided
                const displayName = playerName || `PILOT_${walletAddress.slice(-6).toUpperCase()}`;
                gameStore.setPlayerName(displayName);
                
                // Navigate to main menu
                gameStore.setScreen('main-menu');
            }
        } catch (error) {
            console.error('MetaMask connection error:', error);
            if (error.code === 4001) {
                connectionError = 'Connection rejected. Please approve the connection.';
            } else {
                connectionError = 'Failed to connect. Please try again.';
            }
        } finally {
            isConnecting = false;
        }
    }
</script>

<div class="screen">
    <img src="/orbit one banner.png" alt="ORBIT ONE" class="game-banner" />
    
    <div class="star-container">
        <div class="star-glow"></div>
        <div class="star"></div>
        <div class="orbital-ring"></div>
    </div>

    <div class="login-panel glass-panel">
        <div class="input-group">
            <label for="player-name"><img src="/enter-player.png" alt="Enter Player Name" class="label-img" /></label>
            <input 
                type="text" 
                id="player-name" 
                bind:value={playerName}
                placeholder="COMMANDER NAME..." 
                maxlength="15"
            >
        </div>
        
        <div class="button-group">
            <button class="neon-button img-btn">
                <img src="/login-email.png" alt="Login with Email" class="btn-img" />
            </button>
            <button class="neon-button img-btn metamask-btn" on:click={handleMetaMaskLogin} disabled={isConnecting}>
                {#if isConnecting}
                    <span>CONNECTING...</span>
                {:else}
                    <img src="/login-metamask.png" alt="Login with MetaMask" class="btn-img" />
                {/if}
            </button>
            <button class="neon-button secondary img-btn" on:click={handleGuestLogin}>
                <img src="/guest-login.png" alt="Guest Login" class="btn-img" />
            </button>
        </div>
        
        {#if connectionError}
            <p class="error-message">{connectionError}</p>
        {/if}
    </div>

    <div class="legal-links">
        <button type="button" class="legal-btn">TERMS OF SERVICE</button>
        <button type="button" class="legal-btn">PRIVACY POLICY</button>
    </div>
</div>

<style>
    .screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 40px;
        padding: 40px;
    }

    .game-banner {
        width: 400px;
        max-width: 90%;
        height: auto;
        object-fit: contain;
    }
    
    .star-container {
        position: relative;
        width: 200px;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .star {
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, #ffaa00 0%, #ff4400 70%, transparent 100%);
        border-radius: 50%;
        box-shadow: 0 0 40px #ffaa00;
        animation: pulse 4s infinite alternate ease-in-out;
    }

    .star-glow {
        position: absolute;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, rgba(255, 170, 0, 0.2) 0%, transparent 70%);
        animation: rotate 20s infinite linear;
    }

    .orbital-ring {
        position: absolute;
        width: 220px;
        height: 60px;
        border: 2px solid var(--neon-cyan);
        border-radius: 50%;
        transform: rotateX(75deg);
        box-shadow: inset 0 0 10px var(--neon-cyan), 0 0 10px var(--neon-cyan);
    }

    @keyframes pulse {
        from { transform: scale(1); opacity: 0.8; }
        to { transform: scale(1.1); opacity: 1; }
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .login-panel {
        width: 400px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .input-group label {
        font-size: 0.8rem;
        color: var(--neon-cyan);
        font-weight: 700;
    }

    .input-group input {
        background: rgba(2, 4, 10, 0.8);
        border: 1px solid var(--neon-cyan);
        color: white;
        padding: 12px;
        border-radius: 4px;
        font-family: inherit;
        outline: none;
        transition: box-shadow 0.3s;
    }

    .input-group input:focus {
        box-shadow: 0 0 10px var(--neon-cyan);
    }

    .button-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .legal-links {
        position: absolute;
        bottom: 40px;
        display: flex;
        gap: 20px;
        font-size: 0.7rem;
        opacity: 0.6;
    }

    .legal-btn {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
    }

    .legal-btn:hover {
        opacity: 1;
        text-decoration: underline;
    }

    .metamask-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        background: linear-gradient(135deg, #f6851b22, #e2761b22);
        border-color: #f6851b;
        color: #f6851b;
    }

    .metamask-btn:hover {
        background: #f6851b;
        color: #050a1b;
    }

    .metamask-icon {
        width: 24px;
        height: 24px;
    }

    .metamask-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .error-message {
        color: #ff4444;
        font-size: 0.85rem;
        margin-top: 10px;
        text-align: center;
        background: rgba(255, 68, 68, 0.1);
        padding: 8px 15px;
        border-radius: 5px;
        border: 1px solid #ff4444;
    }

    .label-img {
        height: 20px;
        width: auto;
    }

    .img-btn {
        padding: 8px 16px;
    }

    .btn-img {
        height: 24px;
        width: auto;
        filter: brightness(1.1);
    }

    .img-btn:hover .btn-img {
        filter: brightness(1.3);
    }
</style>
