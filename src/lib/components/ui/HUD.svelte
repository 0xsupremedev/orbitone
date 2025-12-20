<script>
    import { gameStore } from '$lib/stores/gameStore.js';
</script>

<div class="hud">
    <div class="hud-left">
        <div class="stat">
            <span class="label">SCORE</span>
            <span class="value glow-text">{$gameStore.score}</span>
        </div>
        <div class="stat">
            <span class="label">LEVEL</span>
            <span class="value level-display">
                {#if $gameStore.score >= 200}
                    <img src="/level 3 dragon.png" alt="Dragon" class="level-icon" /> 3
                {:else if $gameStore.score >= 100}
                    <img src="/levl 2 alien.png" alt="Alien" class="level-icon" /> 2
                {:else}
                    <img src="/level 1 asteroid.png" alt="Asteroid" class="level-icon" /> 1
                {/if}
            </span>
        </div>
        <div class="stat">
            <span class="label">CREDITS</span>
            <span class="value"><img src="/coins for shop.png" alt="coins" class="coin-icon" /> {$gameStore.credits}</span>
        </div>
        <div class="health-bar">
            <span class="label"><img src="/health heart button.png" alt="heart" class="health-icon" /> STAR HEALTH</span>
            <div class="bar-container">
                <div 
                    class="bar-fill" 
                    style="width: {$gameStore.starHealth}%"
                    class:danger={$gameStore.starHealth <= 30}
                ></div>
            </div>
        </div>
    </div>
</div>

<style>
    .hud {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 20px 40px;
        pointer-events: none;
        z-index: 1000;
    }

    .hud-left {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 250px;
    }

    .stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .label {
        font-size: 0.8rem;
        opacity: 0.7;
    }

    .value {
        font-size: 1.2rem;
        font-weight: 700;
    }

    .health-bar {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .bar-container {
        width: 100%;
        height: 10px;
        background: rgba(0, 242, 255, 0.2);
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid rgba(0, 242, 255, 0.3);
    }

    .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--neon-cyan), var(--neon-blue));
        border-radius: 5px;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px var(--neon-cyan);
    }

    .bar-fill.danger {
        background: linear-gradient(90deg, var(--fiery-red), var(--fiery-orange));
        box-shadow: 0 0 10px var(--fiery-red);
    }

    .level-display {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .level-icon {
        width: 24px;
        height: 24px;
        object-fit: contain;
    }

    .coin-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
        vertical-align: middle;
    }

    .health-icon {
        width: 20px;
        height: 20px;
        object-fit: contain;
        vertical-align: middle;
    }
</style>
