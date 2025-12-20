<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    
    function goBack() {
        gameStore.setScreen('main-menu');
    }
    
    function startMission() {
        gameStore.startGame();
        gameStore.setScreen('gameplay');
    }
    
    function buyUpgrade(id) {
        gameStore.purchaseUpgrade(id, 100);
    }
</script>

<div class="screen">
    <div class="header-nav">
        <button class="back-btn" on:click={goBack}>
            <img src="/left arrow.png" alt="Back" />
        </button>
        <img src="/upgrades.png" alt="Upgrades" class="header-title-img" />
        <div style="width: 50px;"></div>
    </div>
    
    <div class="upgrade-grid">
        <div class="upgrade-card glass-panel">
            <h3>LASER DAMAGE</h3>
            <div class="upgrade-icon"><img src="/lazer-damage.png" alt="Laser" /></div>
            <p class="stat-val">{$gameStore.upgrades.laserDamage} / S</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('laserDamage')}>
                                <img src="/coins for shop.png" alt="coins" class="coin-icon" /> 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>FIRE RATE</h3>
            <div class="upgrade-icon"><img src="/fire-rate.png" alt="Fire" /></div>
            <p class="stat-val">{$gameStore.upgrades.fireRate} / S</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('fireRate')}>
                                <img src="/coins for shop.png" alt="coins" class="coin-icon" /> 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>HULL INTEGRITY</h3>
            <div class="upgrade-icon"><img src="/hull-integrity.png" alt="Hull" /></div>
            <p class="stat-val">{$gameStore.upgrades.hullIntegrity} PT</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('hullIntegrity')}>
                                <img src="/coins for shop.png" alt="coins" class="coin-icon" /> 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>ORBIT CONTROL</h3>
            <div class="upgrade-icon"><img src="/orbit.png" alt="Orbit" /></div>
            <p class="stat-val">LVL {$gameStore.upgrades.orbitControl}</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('orbitControl')}>
                                <img src="/coins for shop.png" alt="coins" class="coin-icon" /> 100
            </button>
        </div>
    </div>

    <div class="footer-stats">
        <p class="glow-text credits-display"><img src="/coins for shop.png" alt="coins" class="coin-icon" /> CREDITS: {$gameStore.credits}</p>
        <button class="neon-button start-btn" on:click={startMission}>START MISSION</button>
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

    .upgrade-grid {
        display: flex;
        gap: 20px;
    }

    .upgrade-card {
        width: 200px;
        height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        text-align: center;
        transition: all 0.3s;
    }

    .upgrade-card h3 {
        font-size: 0.85rem;
        color: var(--neon-cyan);
        letter-spacing: 1px;
    }

    .upgrade-icon {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .upgrade-icon img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .stat-val {
        font-size: 1.2rem;
        font-weight: 700;
        color: white;
    }

    .cost-btn {
        width: 100%;
        padding: 10px;
        font-size: 0.8rem;
    }

    .footer-stats {
        position: absolute;
        bottom: 40px;
        display: flex;
        align-items: center;
        gap: 40px;
    }

    .start-btn {
        padding: 15px 40px;
        font-size: 1rem;
    }

    .header-title-img {
        height: 60px;
        width: auto;
        filter: drop-shadow(0 0 15px var(--neon-cyan));
    }

    .coin-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
        vertical-align: middle;
    }
</style>
