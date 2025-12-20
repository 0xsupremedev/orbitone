<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    
    $: creditsEarned = Math.floor($gameStore.score / 10);
    $: distance = ($gameStore.score / 100).toFixed(1);
    
    function retry() {
        gameStore.startGame();
        gameStore.setScreen('gameplay');
    }
    
    function goToUpgrades() {
        gameStore.setScreen('upgrades');
    }
    
    function goToMenu() {
        gameStore.setScreen('main-menu');
    }
</script>

<div class="screen">
    <img src="/mission-ended.png" alt="Mission Ended" class="mission-ended-img" />
    
    <div class="results-panel glass-panel">
        <div class="stat-row">
            <span>SCORE</span>
            <span class="glow-text">{$gameStore.score}</span>
        </div>
        <div class="stat-row">
            <span>DISTANCE REACHED</span>
            <span class="glow-text">{distance} LY</span>
        </div>
        <div class="stat-row credits-row">
            <span>💰 CREDITS EARNED</span>
            <span class="glow-text">+{creditsEarned}</span>
        </div>
    </div>
    
    <div class="actions">
        <button class="neon-button pulse" on:click={retry}>🔄 RETRY MISSION</button>
        <button class="neon-button secondary" on:click={goToUpgrades}>⚡ UPGRADES</button>
        <button class="neon-button secondary" on:click={goToMenu}>🏠 MAIN MENU</button>
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

    .mission-ended-img {
        max-width: 500px;
        width: 100%;
        height: auto;
        filter: drop-shadow(0 0 20px var(--fiery-orange));
        animation: pulse-title 2s infinite ease-in-out;
    }

    @keyframes pulse-title {
        0% { filter: drop-shadow(0 0 10px var(--fiery-orange)); transform: scale(1); }
        50% { filter: drop-shadow(0 0 30px var(--fiery-red)); transform: scale(1.02); }
        100% { filter: drop-shadow(0 0 10px var(--fiery-orange)); transform: scale(1); }
    }

    .results-panel {
        width: 500px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .stat-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        padding: 10px 0;
        border-bottom: 1px solid rgba(0, 242, 255, 0.1);
    }

    .stat-row:last-child {
        border-bottom: none;
    }

    .actions {
        display: flex;
        gap: 20px;
    }

    .pulse {
        animation: pulse-glow 2s infinite ease-in-out;
    }

    @keyframes pulse-glow {
        0% { filter: drop-shadow(0 0 2px var(--neon-cyan)); transform: scale(1); }
        50% { filter: drop-shadow(0 0 15px var(--neon-cyan)); transform: scale(1.02); }
        100% { filter: drop-shadow(0 0 2px var(--neon-cyan)); transform: scale(1); }
    }
</style>
