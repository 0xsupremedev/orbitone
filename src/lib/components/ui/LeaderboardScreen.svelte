<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    import PlayerProfileModal from './PlayerProfileModal.svelte';
    
    let selectedPlayer = null;
    
    // Mock leaderboard data with avatar API
    const leaderboardData = [
        { rank: 1, name: 'COMMANDER_ACE', score: 15420, avatarId: 1 },
        { rank: 2, name: 'STAR_HUNTER', score: 12350, avatarId: 2 },
        { rank: 3, name: 'NEBULA_KING', score: 10890, avatarId: 3 },
        { rank: 4, name: 'COSMIC_FURY', score: 8760, avatarId: 4 },
        { rank: 5, name: 'VOID_WALKER', score: 7340, avatarId: 5 },
        { rank: 6, name: 'ASTRO_BLAZE', score: 6210, avatarId: 6 },
        { rank: 7, name: 'NOVA_STRIKE', score: 5890, avatarId: 7 },
        { rank: 8, name: 'ORBIT_MASTER', score: 4560, avatarId: 8 },
        { rank: 9, name: 'GALAXY_RIDER', score: 3420, avatarId: 9 },
        { rank: 10, name: $gameStore.playerName || 'YOU', score: $gameStore.score, avatarId: 10, isPlayer: true }
    ];
    
    // Get avatar URL based on player
    function getAvatarUrl(player) {
        if (player.isPlayer) {
            return 'https://avatar.iran.liara.run/public';
        }
        // Use boy/girl avatars alternating for variety
        const gender = player.avatarId % 2 === 0 ? 'boy' : 'girl';
        return `https://avatar.iran.liara.run/public/${gender}?username=${player.name}`;
    }
    
    function goBack() {
        gameStore.setScreen('main-menu');
    }
    
    function openPlayerProfile(player) {
        selectedPlayer = player;
    }
    
    function closePlayerProfile() {
        selectedPlayer = null;
    }
</script>

<div class="screen">
    <div class="header-nav">
        <button class="back-btn" on:click={goBack}>
            <img src="/left arrow.png" alt="Back" />
        </button>
        <h2 class="glow-text">LEADERBOARD</h2>
        <div style="width: 50px;"></div>
    </div>
    
    <div class="leaderboard-container glass-panel">
        <div class="trophy-header">
            <img src="/leaderboard cup.png" alt="Trophy" class="trophy-icon" />
            <h3>TOP COMMANDERS</h3>
        </div>
        
        <div class="leaderboard-list">
            {#each leaderboardData as player, i}
                <button type="button" class="player-row" class:highlight={player.rank <= 3} class:you={player.isPlayer} on:click={() => openPlayerProfile(player)}>
                    <span class="rank">#{player.rank}</span>
                    <img src={getAvatarUrl(player)} alt={player.name} class="avatar" />
                    <span class="name">{player.name}</span>
                    <span class="score glow-text">{player.score.toLocaleString()}</span>
                </button>
            {/each}
        </div>
    </div>
    
    <div class="your-stats glass-panel">
        <div class="stat-item">
            <span class="label">YOUR BEST</span>
            <span class="value glow-text">{$gameStore.score}</span>
        </div>
        <div class="stat-item">
            <span class="label">YOUR RANK</span>
            <span class="value glow-text">#10</span>
        </div>
    </div>
</div>

<PlayerProfileModal player={selectedPlayer} onClose={closePlayerProfile} />

<style>
    .screen {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40px;
        gap: 30px;
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

    .leaderboard-container {
        margin-top: 100px;
        width: 500px;
        max-height: 500px;
        overflow-y: auto;
    }

    .trophy-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 242, 255, 0.2);
        margin-bottom: 15px;
    }

    .trophy-icon {
        width: 50px;
        height: 50px;
        object-fit: contain;
    }

    .trophy-header h3 {
        color: var(--neon-cyan);
        font-size: 1.2rem;
        letter-spacing: 2px;
    }

    .leaderboard-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .player-row {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        background: rgba(0, 242, 255, 0.05);
        border-radius: 8px;
        transition: all 0.3s;
        border: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        font-family: inherit;
        color: inherit;
    }

    .player-row:hover {
        background: rgba(0, 242, 255, 0.15);
        transform: translateX(5px);
    }

    .player-row.highlight {
        background: linear-gradient(90deg, rgba(255, 170, 0, 0.1), transparent);
        border-left: 3px solid var(--fiery-orange);
    }

    .player-row.you {
        background: linear-gradient(90deg, rgba(0, 242, 255, 0.2), transparent);
        border: 1px solid var(--neon-cyan);
    }

    .rank {
        width: 35px;
        font-size: 0.9rem;
        text-align: center;
        color: var(--neon-cyan);
        font-weight: 700;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--neon-cyan);
        margin-right: 12px;
    }

    .name {
        flex: 1;
        font-weight: 700;
        color: white;
        font-size: 0.9rem;
    }

    .score {
        font-size: 1.1rem;
        font-weight: 700;
    }

    .your-stats {
        display: flex;
        gap: 50px;
        padding: 20px 40px;
    }

    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .stat-item .label {
        font-size: 0.75rem;
        opacity: 0.7;
        letter-spacing: 1px;
    }

    .stat-item .value {
        font-size: 1.5rem;
        font-weight: 700;
    }
</style>
