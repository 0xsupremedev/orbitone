<script>
    import { gameStore } from '$lib/stores/gameStore.js';
    
    function goBack() {
        gameStore.setScreen('main-menu');
    }
</script>

<div class="screen">
    <div class="header-nav">
        <button class="back-btn" on:click={goBack}>
            <img src="/left arrow.png" alt="Back" />
        </button>
        <h2 class="glow-text">SETTINGS</h2>
        <div style="width: 50px;"></div>
    </div>
    
    <div class="settings-grid">
        <div class="settings-col">
            <div class="setting-item">
                <label for="music-volume">🎵 MUSIC VOLUME</label>
                <input 
                    type="range" 
                    id="music-volume"
                    class="neon-slider" 
                    value={$gameStore.settings.musicVolume * 100}
                    min="0" 
                    max="100"
                >
            </div>
            <div class="setting-item">
                <span class="setting-label">🔄 INVERT ORBIT</span>
                <button type="button" class="toggle" class:on={$gameStore.settings.invertOrbit} aria-pressed={$gameStore.settings.invertOrbit}></button>
            </div>
            <div class="setting-item">
                <label for="language-select">🌍 LANGUAGE</label>
                <select id="language-select" class="neon-select">
                    <option selected={$gameStore.settings.language === 'ENGLISH'}>ENGLISH</option>
                    <option selected={$gameStore.settings.language === 'SPANISH'}>SPANISH</option>
                    <option selected={$gameStore.settings.language === 'JAPANESE'}>JAPANESE</option>
                </select>
            </div>
        </div>
        
        <div class="settings-col">
            <div class="setting-item">
                <label for="sfx-volume">🔊 SFX VOLUME</label>
                <input 
                    type="range" 
                    id="sfx-volume"
                    class="neon-slider" 
                    value={$gameStore.settings.sfxVolume * 100}
                    min="0" 
                    max="100"
                >
            </div>
            <div class="setting-item">
                <span class="setting-label">✨ HIGH QUALITY</span>
                <button type="button" class="toggle" class:on={$gameStore.settings.highQuality} aria-pressed={$gameStore.settings.highQuality}></button>
            </div>
            <div class="setting-item">
                <span class="setting-label">👤 ACCOUNT</span>
                <button type="button" class="neon-button secondary">🔗 LINK GOOGLE PLAY</button>
            </div>
        </div>
    </div>

    <div class="footer-stats">
        <p class="glow-text">💰 CREDITS: {$gameStore.credits}</p>
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

    .settings-grid {
        display: flex;
        gap: 60px;
    }

    .settings-col {
        display: flex;
        flex-direction: column;
        gap: 30px;
        width: 300px;
    }

    .setting-item {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .setting-item label,
    .setting-label {
        font-size: 0.8rem;
        color: var(--neon-cyan);
        font-weight: 700;
    }

    .toggle {
        width: 60px;
        height: 30px;
        background: rgba(2, 4, 10, 0.8);
        border: 2px solid var(--neon-cyan);
        border-radius: 15px;
        position: relative;
        cursor: pointer;
        padding: 0;
    }

    .toggle::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: var(--neon-cyan);
        border-radius: 50%;
        top: 3px;
        left: 4px;
        transition: all 0.3s;
        box-shadow: 0 0 10px var(--neon-cyan);
    }

    .toggle.on::after {
        left: 32px;
    }

    .neon-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 4px;
        background: rgba(0, 242, 255, 0.2);
        border-radius: 2px;
        outline: none;
    }

    .neon-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: var(--neon-cyan);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 10px var(--neon-cyan);
    }

    .neon-select {
        background: rgba(2, 4, 10, 0.8);
        border: 1px solid var(--neon-cyan);
        color: white;
        padding: 10px;
        border-radius: 4px;
        outline: none;
    }

    .footer-stats {
        position: absolute;
        bottom: 40px;
        font-size: 1.2rem;
    }
</style>
