<script>
    import { T, useFrame } from '@threlte/core';
    import { onMount } from 'svelte';
    
    export let x = 0;
    export let z = 0;
    export let onComplete = () => {};
    
    let scale = 1;
    let opacity = 1;
    let particles = [];
    let lifetime = 0;
    
    // Create explosion particles
    for (let i = 0; i < 8; i++) {
        particles.push({
            x: (Math.random() - 0.5) * 0.3,
            y: (Math.random() - 0.5) * 0.3,
            z: (Math.random() - 0.5) * 0.3,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            vz: (Math.random() - 0.5) * 3,
            size: 0.1 + Math.random() * 0.2
        });
    }
    
    useFrame((_, delta) => {
        lifetime += delta;
        scale = 1 + lifetime * 3;
        opacity = Math.max(0, 1 - lifetime * 2);
        
        particles = particles.map(p => ({
            ...p,
            x: p.x + p.vx * delta,
            y: p.y + p.vy * delta,
            z: p.z + p.vz * delta,
            size: p.size * (1 - lifetime)
        }));
        
        if (lifetime > 0.5) {
            onComplete();
        }
    });
</script>

<T.Group position={[x, 0, z]}>
    <!-- Central flash -->
    <T.Mesh scale={[scale, scale, scale]}>
        <T.SphereGeometry args={[0.3, 8, 8]} />
        <T.MeshBasicMaterial color="#ffaa00" transparent opacity={opacity} />
    </T.Mesh>
    
    <!-- Explosion particles -->
    {#each particles as particle}
        <T.Mesh position={[particle.x, particle.y, particle.z]}>
            <T.SphereGeometry args={[particle.size, 4, 4]} />
            <T.MeshBasicMaterial color="#ff4400" transparent opacity={opacity} />
        </T.Mesh>
    {/each}
    
    <!-- Bright light flash -->
    <T.PointLight color="#ffaa00" intensity={10 * opacity} distance={5} />
</T.Group>
