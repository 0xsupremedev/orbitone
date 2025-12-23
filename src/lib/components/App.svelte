<script>
    import { Canvas } from '@threlte/core';
    import Scene from './Scene.svelte';
    import LoginScreen from './ui/LoginScreen.svelte';
    import MainMenu from './ui/MainMenu.svelte';
    import UpgradeScreen from './ui/UpgradeScreen.svelte';
    import SettingsScreen from './ui/SettingsScreen.svelte';
    import GameOverScreen from './ui/GameOverScreen.svelte';
    import ShopScreen from './ui/ShopScreen.svelte';
    import LeaderboardScreen from './ui/LeaderboardScreen.svelte';
    import HUD from './ui/HUD.svelte';
    import { gameStore } from '$lib/stores/gameStore.js';
</script>

<div class="game-container">
    <Canvas rendererParameters={{ alpha: true, antialias: true }}>
        <Scene />
    </Canvas>
    
    <div class="screen-overlay">
        {#if $gameStore.currentScreen === 'login'}
            <LoginScreen />
        {:else if $gameStore.currentScreen === 'main-menu'}
            <MainMenu />
        {:else if $gameStore.currentScreen === 'upgrades'}
            <UpgradeScreen />
        {:else if $gameStore.currentScreen === 'settings'}
            <SettingsScreen />
        {:else if $gameStore.currentScreen === 'shop'}
            <ShopScreen />
        {:else if $gameStore.currentScreen === 'leaderboard'}
            <LeaderboardScreen />
        {:else if $gameStore.currentScreen === 'game-over'}
            <GameOverScreen />
        {:else if $gameStore.currentScreen === 'gameplay'}
            <HUD />
        {/if}
    </div>
</div>

<style>
    .game-container {
        width: 100vw;
        height: 100vh;
        position: relative;
        background: transparent;
    }

    .game-container :global(canvas) {
        background: transparent !important;
    }

    .screen-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        pointer-events: none;
    }

    .screen-overlay > :global(*) {
        pointer-events: auto;
    }
</style>
