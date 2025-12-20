<script>
    import { T, useFrame } from '@threlte/core';
    import { useTexture } from '@threlte/extras';
    import { DoubleSide } from 'three';
    
    export let x = 0;
    export let z = 0;
    export let type = 'asteroid'; // 'asteroid', 'alien', or 'dragon'
    export let isLocked = false;
    
    // Load textures based on type
    const textures = {
        asteroid: useTexture('/level 1 asteroid.png'),
        alien: useTexture('/levl 2 alien.png'),
        dragon: useTexture('/level 3 dragon.png')
    };
    
    const targetIcon = useTexture('/target icon.png');
    
    let rotation = 0;
    let bobOffset = Math.random() * Math.PI * 2;
    // BIGGER scale for all targets
    let baseScale = type === 'dragon' ? 3.0 : (type === 'alien' ? 2.5 : 2.0);
    
    // Face toward center
    $: angle = Math.atan2(-z, -x);
    
    // Pulse effect when locked
    let lockPulse = 0;
    
    useFrame((_, delta) => {
        rotation += delta * 0.5;
        if (isLocked) {
            lockPulse = Math.sin(Date.now() / 100) * 0.2 + 1;
        } else {
            lockPulse = 1;
        }
    });
</script>

{#await textures[type] then texture}
    <T.Group position={[x, Math.sin(bobOffset + rotation) * 0.1, z]}>
        <!-- Billboard sprite that always faces the camera -->
        <T.Sprite scale={[baseScale, baseScale, 1]}>
            <T.SpriteMaterial 
                map={texture} 
                transparent={true}
            />
        </T.Sprite>
        
        <!-- Target lock icon when locked -->
        {#if isLocked}
            {#await targetIcon then lockTexture}
                <T.Sprite scale={[baseScale * lockPulse * 1.2, baseScale * lockPulse * 1.2, 1]} position={[0, 0, 0.1]}>
                    <T.SpriteMaterial 
                        map={lockTexture} 
                        transparent={true}
                        opacity={0.9}
                    />
                </T.Sprite>
            {/await}
            <!-- Enhanced glow when locked -->
            <T.PointLight color="#ff0000" intensity={5} distance={4} />
        {/if}
        
        <!-- Glow effect based on type -->
        {#if type === 'asteroid'}
            <T.PointLight color="#ff6600" intensity={1.5} distance={3} />
        {:else if type === 'alien'}
            <T.PointLight color="#00ff00" intensity={2} distance={3} />
        {:else}
            <T.PointLight color="#ff0066" intensity={3} distance={4} />
        {/if}
    </T.Group>
{/await}

