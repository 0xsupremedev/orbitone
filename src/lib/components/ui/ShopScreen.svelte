<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    
    const ships = [
        { id: 'player-ship', name: 'STARFIGHTER', price: 0, image: '/player-ship.png' },
        { id: 'enemy-ship', name: 'ALIEN CRUISER', price: 500, image: '/enemy-ship.png' }
    ];
    
    const items = [
        { id: 'health-kit', name: 'HEALTH KIT', price: 100, image: '/health kit.png', effect: '+30 HP' },
        { id: 'gems-small', name: 'GEMS x10', price: 200, image: '/Gems.png', gems: 10 },
        { id: 'gems-large', name: 'GEMS x50', price: 800, image: '/crystals.png', gems: 50 },
        { id: 'mystery-box', name: 'MYSTERY BOX', price: 300, image: '/mystry box.png', effect: '???' }
    ];
    
    function goBack() {
        gameStore.setScreen('main-menu');
    }
    
    function buyShip(ship) {
        if (!$gameStore.ownedShips.includes(ship.id)) {
            gameStore.buyShip(ship.id, ship.price);
        } else {
            gameStore.selectShip(ship.id);
        }
    }
    
    function buyItem(item) {
        if (item.id === 'health-kit') {
            gameStore.buyHealthKit(item.price);
        } else if (item.gems) {
            gameStore.buyGems(item.gems, item.price);
        } else if (item.id === 'mystery-box') {
            // Random reward
            if ($gameStore.coins >= item.price) {
                const rewards = ['coins', 'gems', 'health'];
                const reward = rewards[Math.floor(Math.random() * rewards.length)];
                if (reward === 'coins') gameStore.addCoins(150);
                else if (reward === 'gems') gameStore.addGems(20);
                else gameStore.buyHealthKit(0);
                gameStore.addCoins(-item.price);
            }
        }
    }
</script>

<div class="screen">
    <div class="header-nav">
        <button class="back-btn" on:click={goBack}>
            <img src="/left arrow.png" alt="Back" />
        </button>
        <img src="/shop.png" alt="Shop" class="header-title-img" />
        <div class="currency-display">
            <span class="coins"><img src="/coins for shop.png" alt="Coins" /> {$gameStore.coins}</span>
            <span class="gems"><img src="/Gems.png" alt="Gems" /> {$gameStore.gems}</span>
        </div>
    </div>
    
    <div class="shop-content">
        <div class="shop-section">
            <h3>🚀 SHIPS</h3>
            <div class="items-grid">
                {#each ships as ship}
                    <div 
                        class="shop-card glass-panel" 
                        class:owned={$gameStore.ownedShips.includes(ship.id)}
                        class:selected={$gameStore.selectedShip === ship.id}
                    >
                        <img src={ship.image} alt={ship.name} class="item-image" />
                        <h4>{ship.name}</h4>
                        {#if $gameStore.ownedShips.includes(ship.id)}
                            <button 
                                class="neon-button" 
                                class:secondary={$gameStore.selectedShip !== ship.id}
                                on:click={() => buyShip(ship)}
                            >
                                {$gameStore.selectedShip === ship.id ? '✓ SELECTED' : 'SELECT'}
                            </button>
                        {:else}
                            <button 
                                class="neon-button secondary" 
                                on:click={() => buyShip(ship)}
                                disabled={$gameStore.coins < ship.price}
                            >
                                <img src="/coins for shop.png" alt="" class="btn-icon" /> {ship.price}
                            </button>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
        
        <div class="shop-section">
            <h3>🎁 ITEMS</h3>
            <div class="items-grid">
                {#each items as item}
                    <div class="shop-card glass-panel">
                        <img src={item.image} alt={item.name} class="item-image small" />
                        <h4>{item.name}</h4>
                        <p class="effect">{item.effect || `+${item.gems} Gems`}</p>
                        <button 
                            class="neon-button secondary" 
                            on:click={() => buyItem(item)}
                            disabled={$gameStore.coins < item.price}
                        >
                            <img src="/coins for shop.png" alt="" class="btn-icon" /> {item.price}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        overflow-y: auto;
    }

    .header-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 60px;
        background: rgba(5, 10, 27, 0.9);
        backdrop-filter: blur(10px);
        z-index: 10;
    }

    .currency-display {
        display: flex;
        gap: 20px;
    }

    .currency-display span {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 700;
        font-size: 1.1rem;
    }

    .currency-display img {
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

    .shop-content {
        margin-top: 100px;
        width: 100%;
        max-width: 1200px;
    }

    .shop-section {
        margin-bottom: 40px;
    }

    .shop-section h3 {
        color: var(--neon-cyan);
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-shadow: var(--glow-cyan);
    }

    .items-grid {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
    }

    .shop-card {
        width: 180px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        text-align: center;
        transition: all 0.3s;
    }

    .shop-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 242, 255, 0.2);
    }

    .shop-card.owned {
        border-color: #00ff00;
    }

    .shop-card.selected {
        border-color: var(--neon-cyan);
        box-shadow: 0 0 20px var(--neon-cyan);
    }

    .item-image {
        width: 100px;
        height: 100px;
        object-fit: contain;
    }

    .item-image.small {
        width: 60px;
        height: 60px;
    }

    .shop-card h4 {
        font-size: 0.9rem;
        color: white;
    }

    .effect {
        font-size: 0.75rem;
        color: var(--neon-cyan);
        opacity: 0.8;
    }

    .btn-icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }

    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .header-title-img {
        height: 40px;
        width: auto;
        filter: drop-shadow(0 0 10px var(--neon-cyan));
    }
</style>
