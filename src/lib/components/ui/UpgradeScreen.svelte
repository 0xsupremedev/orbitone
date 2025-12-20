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
        <h2 class="glow-text">UPGRADES</h2>
        <div style="width: 50px;"></div>
    </div>
    
    <div class="upgrade-grid">
        <div class="upgrade-card glass-panel">
            <h3>LASER DAMAGE</h3>
            <div class="upgrade-icon">⚡</div>
            <p class="stat-val">{$gameStore.upgrades.laserDamage} / S</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('laserDamage')}>
                💰 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>FIRE RATE</h3>
            <div class="upgrade-icon">🔥</div>
            <p class="stat-val">{$gameStore.upgrades.fireRate} / S</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('fireRate')}>
                💰 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>HULL INTEGRITY</h3>
            <div class="upgrade-icon">🛡️</div>
            <p class="stat-val">{$gameStore.upgrades.hullIntegrity} PT</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('hullIntegrity')}>
                💰 100
            </button>
        </div>
        
        <div class="upgrade-card glass-panel">
            <h3>ORBIT CONTROL</h3>
            <div class="upgrade-icon">🔄</div>
            <p class="stat-val">LVL {$gameStore.upgrades.orbitControl}</p>
            <button class="neon-button cost-btn" on:click={() => buyUpgrade('orbitControl')}>
                💰 100
            </button>
        </div>
    </div>

    <div class="footer-stats">
        <p class="glow-text credits-display">💰 CREDITS: {$gameStore.credits}</p>
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
        width: 60px;
        height: 60px;
        border: 1px solid var(--neon-cyan);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        background: rgba(0, 242, 255, 0.05);
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
</style>
