<script>
    import { onMount, onDestroy } from 'svelte';
    import Chart from 'chart.js/auto';
    import { gameStore } from '$lib/stores/gameStore.js';
    
    export let player = null;
    export let onClose = () => {};
    
    // Format wallet address for display (show first 6 and last 4 chars)
    function formatWalletAddress(address) {
        if (!address) return null;
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
    
    // Get wallet address for display
    $: walletAddress = player?.isPlayer ? $gameStore.walletAddress : (player?.walletAddress || null);
    
    // Generate mock stats based on player
    $: playerStats = player ? {
        gamesPlayed: Math.floor(player.score / 100) + 50,
        winRate: Math.min(95, Math.floor(50 + (player.rank * -3) + 30)),
        avgScore: Math.floor(player.score / (Math.floor(player.score / 100) + 50)),
        killsTotal: Math.floor(player.score / 10),
        accuracy: Math.min(98, Math.floor(60 + Math.random() * 30)),
        playTime: Math.floor(player.score / 50) + ' hrs',
        longestStreak: Math.floor(Math.random() * 50) + 10,
        asteroidsDestroyed: Math.floor(player.score / 8),
        aliensDestroyed: Math.floor(player.score / 15),
        dragonsDestroyed: Math.floor(player.score / 25)
    } : {};
    
    // Mock performance history (last 10 games)
    $: performanceHistory = player ? Array.from({ length: 10 }, (_, i) => 
        Math.floor(player.score * (0.7 + Math.random() * 0.5) / 10)
    ) : [];
    
    // Mock kill distribution
    $: killDistribution = player ? [
        playerStats.asteroidsDestroyed,
        playerStats.aliensDestroyed,
        playerStats.dragonsDestroyed
    ] : [];
    
    // Generate skill stats for radar chart
    $: skillStats = player ? {
        speed: Math.min(100, Math.floor(60 + (11 - player.rank) * 4)),
        accuracy: playerStats.accuracy,
        efficiency: Math.min(100, Math.floor(50 + (11 - player.rank) * 5)),
        defense: Math.min(100, Math.floor(40 + Math.random() * 40)),
        streak: Math.min(100, Math.floor(30 + Math.random() * 50))
    } : {};
    
    let radarChartCanvas;
    let pieChartCanvas;
    let radarChart;
    let pieChart;
    
    function getAvatarUrl() {
        if (!player) return '';
        if (player.isPlayer) return 'https://avatar.iran.liara.run/public';
        const gender = player.avatarId % 2 === 0 ? 'boy' : 'girl';
        return `https://avatar.iran.liara.run/public/${gender}?username=${player.name}`;
    }
    
    onMount(() => {
        if (!player) return;
        
        // Radar chart - Skill distribution
        radarChart = new Chart(radarChartCanvas, {
            type: 'radar',
            data: {
                labels: ['Speed', 'Accuracy', 'Efficiency', 'Defense', 'Streak'],
                datasets: [{
                    label: 'Skills',
                    data: [skillStats.speed, skillStats.accuracy, skillStats.efficiency, skillStats.defense, skillStats.streak],
                    backgroundColor: 'rgba(102, 102, 255, 0.5)',
                    borderColor: '#6666ff',
                    borderWidth: 2,
                    pointBackgroundColor: '#6666ff',
                    pointBorderColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: '#888',
                            backdropColor: 'transparent',
                            font: { size: 10 }
                        },
                        pointLabels: {
                            color: '#00f2ff',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: {
                            color: 'rgba(0, 242, 255, 0.2)'
                        },
                        angleLines: {
                            color: 'rgba(0, 242, 255, 0.2)'
                        }
                    }
                }
            }
        });
        
        // Doughnut chart - Kill distribution
        pieChart = new Chart(pieChartCanvas, {
            type: 'doughnut',
            data: {
                labels: ['Asteroids', 'Aliens', 'Dragons'],
                datasets: [{
                    data: killDistribution,
                    backgroundColor: ['#ff6600', '#00ff00', '#ff0066'],
                    borderColor: '#050a1b',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#fff', font: { size: 11 } }
                    }
                }
            }
        });
    });
    
    onDestroy(() => {
        if (radarChart) radarChart.destroy();
        if (pieChart) pieChart.destroy();
    });
</script>

{#if player}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-overlay" on:click={onClose}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-content glass-panel" on:click|stopPropagation on:keydown|stopPropagation role="dialog" aria-modal="true">
        <button class="close-btn" on:click={onClose}>✕</button>
        
        <div class="profile-header">
            <img src={getAvatarUrl()} alt={player.name} class="large-avatar" />
            <div class="profile-info">
                <h2 class="glow-text">{player.name}</h2>
                <p class="rank-badge">RANK #{player.rank}</p>
                <p class="total-score">Total Score: <span class="glow-text">{player.score.toLocaleString()}</span></p>
                {#if walletAddress}
                    <p class="wallet-address">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="Wallet" class="wallet-icon" />
                        {formatWalletAddress(walletAddress)}
                    </p>
                {/if}
            </div>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <span class="stat-value">{playerStats.gamesPlayed}</span>
                <span class="stat-label">Games Played</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{playerStats.winRate}%</span>
                <span class="stat-label">Win Rate</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{playerStats.avgScore}</span>
                <span class="stat-label">Avg Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{playerStats.accuracy}%</span>
                <span class="stat-label">Accuracy</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{playerStats.killsTotal}</span>
                <span class="stat-label">Total Kills</span>
            </div>
            <div class="stat-card">
                <span class="stat-value">{playerStats.playTime}</span>
                <span class="stat-label">Play Time</span>
            </div>
        </div>
        
        <div class="charts-container">
            <div class="chart-box">
                <h4>📊 SKILL DISTRIBUTION</h4>
                <div class="chart-wrapper radar">
                    <canvas bind:this={radarChartCanvas}></canvas>
                </div>
            </div>
            <div class="chart-box small">
                <h4>🎯 KILL BREAKDOWN</h4>
                <div class="chart-wrapper">
                    <canvas bind:this={pieChartCanvas}></canvas>
                </div>
            </div>
        </div>
        
        <div class="achievements">
            <h4>🏆 ACHIEVEMENTS</h4>
            <div class="achievement-list">
                {#if player.rank <= 3}
                    <span class="achievement gold">🥇 TOP 3 PLAYER</span>
                {/if}
                {#if playerStats.killsTotal > 1000}
                    <span class="achievement">💀 1000 KILLS</span>
                {/if}
                {#if playerStats.accuracy > 80}
                    <span class="achievement">🎯 SHARPSHOOTER</span>
                {/if}
                {#if playerStats.gamesPlayed > 100}
                    <span class="achievement">🎮 VETERAN</span>
                {/if}
                <span class="achievement">🚀 PILOT</span>
                <span class="achievement">⭐ DEFENDER</span>
            </div>
        </div>
    </div>
</div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(2, 4, 10, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        width: 700px;
        max-width: 95vw;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        padding: 30px;
    }
    
    .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: transparent;
        border: none;
        color: var(--neon-cyan);
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .close-btn:hover {
        transform: scale(1.2);
        color: var(--fiery-orange);
    }
    
    .profile-header {
        display: flex;
        align-items: center;
        gap: 25px;
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 242, 255, 0.2);
    }
    
    .large-avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 3px solid var(--neon-cyan);
        box-shadow: 0 0 20px var(--neon-cyan);
    }
    
    .profile-info h2 {
        font-size: 1.8rem;
        margin-bottom: 5px;
    }
    
    .rank-badge {
        display: inline-block;
        background: linear-gradient(90deg, var(--fiery-orange), var(--fiery-red));
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 700;
        margin-bottom: 8px;
    }
    
    .total-score {
        font-size: 1rem;
    }

    .wallet-address {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
        padding: 6px 12px;
        background: rgba(246, 133, 27, 0.15);
        border: 1px solid #f6851b;
        border-radius: 20px;
        font-size: 0.8rem;
        color: #f6851b;
        font-family: 'Courier New', monospace;
    }

    .wallet-icon {
        width: 18px;
        height: 18px;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 15px;
        margin-bottom: 25px;
    }
    
    .stat-card {
        background: rgba(0, 242, 255, 0.05);
        border: 1px solid rgba(0, 242, 255, 0.2);
        border-radius: 10px;
        padding: 15px;
        text-align: center;
    }
    
    .stat-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--neon-cyan);
        text-shadow: 0 0 10px var(--neon-cyan);
    }
    
    .stat-label {
        font-size: 0.7rem;
        opacity: 0.7;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .charts-container {
        display: flex;
        gap: 20px;
        margin-bottom: 25px;
    }
    
    .chart-box {
        flex: 2;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        padding: 15px;
    }
    
    .chart-box.small {
        flex: 1;
    }
    
    .chart-box h4 {
        color: var(--neon-cyan);
        font-size: 0.8rem;
        margin-bottom: 10px;
        letter-spacing: 1px;
    }
    
    .chart-wrapper {
        height: 150px;
    }

    .chart-wrapper.radar {
        height: 200px;
    }
    
    .achievements h4 {
        color: var(--fiery-orange);
        margin-bottom: 12px;
    }
    
    .achievement-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .achievement {
        background: rgba(255, 170, 0, 0.1);
        border: 1px solid var(--fiery-orange);
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .achievement.gold {
        background: linear-gradient(90deg, rgba(255, 170, 0, 0.3), rgba(255, 68, 0, 0.2));
        border-color: gold;
        color: gold;
    }
</style>
