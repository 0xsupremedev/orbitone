<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    import PlayerProfileModal from './PlayerProfileModal.svelte';
    
    let showMyProfile = false;
    
    // Create current player data for profile
    $: myPlayerData = {
        rank: 10,
        name: $gameStore.playerName || 'PILOT',
        score: $gameStore.score,
        avatarId: 10,
        isPlayer: true
    };
    
    function goToLogin() {
        gameStore.setScreen('login');
    }
    
    function goToSettings() {
        gameStore.setScreen('settings');
    }
    
    function goToUpgrades() {
        gameStore.setScreen('upgrades');
    }
    
    function goToShop() {
        gameStore.setScreen('shop');
    }
    
    function goToLeaderboard() {
        gameStore.setScreen('leaderboard');
    }
    
    function openMyProfile() {
        showMyProfile = true;
    }
    
    function closeMyProfile() {
        showMyProfile = false;
    }
</script>

<div class="screen">
    <div class="header-nav">
        <button class="back-btn" on:click={goToLogin}>
            <img src="/left arrow.png" alt="Back" />
        </button>
        <img src="/choose-mode.png" alt="Choose Mode" class="header-title-img" />
        <div class="header-icons">
            <button class="header-icon-btn leaderboard-btn" on:click={goToLeaderboard}>
                <img src="/leaderboard cup.png" alt="Leaderboard" />
            </button>
            <button class="header-icon-btn settings-btn" on:click={goToSettings}>
                <img src="/settings icon.png" alt="Settings" />
            </button>
            <button class="header-icon-btn avatar-btn" on:click={openMyProfile}>
                <img src="https://avatar.iran.liara.run/public" alt="Profile" class="header-avatar" />
            </button>
        </div>
    </div>
    
    <div class="mode-selection">
        <button type="button" class="mode-card glass-panel">
            <img src="/campaigns.png" alt="Campaign" class="mode-img" />
            <span class="mode-label">CAMPAIGN</span>
        </button>
        
        <button type="button" class="mode-card glass-panel highlighted" on:click={goToUpgrades}>
            <img src="/endless-run.png" alt="Endless Run" class="mode-img" />
            <span class="mode-label">ENDLESS RUN</span>
        </button>
        
        <button type="button" class="mode-card glass-panel">
            <img src="/daily.png" alt="Daily" class="mode-img" />
            <span class="mode-label">DAILY</span>
        </button>
    </div>

    <div class="footer-stats">
        <div class="currency-row">
            <span class="coins"><img src="/coins for shop.png" alt="Coins" /> {$gameStore.coins}</span>
            <span class="gems"><img src="/Gems.png" alt="Gems" /> {$gameStore.gems}</span>
        </div>
        <button class="shop-btn" on:click={goToShop}>
            <img src="/shop button.png" alt="Shop" />
        </button>
    </div>
</div>

{#if showMyProfile}
    <PlayerProfileModal player={myPlayerData} onClose={closeMyProfile} />
{/if}

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

    .header-nav {
        position: absolute;
        top: 40px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 60px;
    }

    .mode-selection {
        display: flex;
        gap: 30px;
    }

    .mode-card {
        width: 180px;
        height: 220px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        transition: all 0.3s;
        padding: 20px;
    }

    .mode-card:hover {
        transform: translateY(-10px);
        border-color: var(--neon-cyan);
        box-shadow: 0 12px 40px rgba(0, 242, 255, 0.2);
    }

    .mode-card.highlighted {
        border-color: var(--neon-cyan);
        box-shadow: 0 0 20px var(--neon-cyan);
    }

    .mode-img {
        width: 140px;
        height: 140px;
        object-fit: contain;
    }

    .mode-label {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--neon-cyan);
        text-shadow: 0 0 10px var(--neon-cyan);
        letter-spacing: 1px;
    }

    .mode-card:hover .mode-img {
        filter: brightness(1.2);
        transform: scale(1.05);
    }

    .footer-stats {
        position: absolute;
        bottom: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    .currency-row {
        display: flex;
        gap: 30px;
    }

    .currency-row span {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 1.1rem;
    }

    .currency-row img {
        width: 24px;
        height: 24px;
        object-fit: contain;
    }

    .coins {
        color: #ffcc00;
    }

    .gems {
        color: #ff00ff;
    }

    .shop-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
    }

    .shop-btn:hover {
        transform: scale(1.1);
    }

    .shop-btn img {
        width: 60px;
        height: 60px;
        object-fit: contain;
    }

    .header-icons {
        display: flex;
        gap: 15px;
    }

    .header-icon-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
        padding: 0;
    }

    .header-icon-btn:hover {
        transform: scale(1.1);
    }

    .header-icon-btn img {
        width: 55px;
        height: 55px;
        object-fit: contain;
    }

    /* Adjust sizes to make icons appear equal */
    .leaderboard-btn img {
        width: 50px;
        height: 50px;
    }

    .settings-btn img {
        width: 100px;
        height: 100px;
    }

    .avatar-btn img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid var(--neon-cyan);
        box-shadow: 0 0 10px var(--neon-cyan);
    }

    .header-title-img {
        height: 60px;
        width: auto;
        filter: drop-shadow(0 0 15px var(--neon-cyan));
    }
</style>
