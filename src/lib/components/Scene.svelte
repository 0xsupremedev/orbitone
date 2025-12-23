<script>
    import { T, useRender, useThrelte } from '@threlte/core';
    import { OrbitControls } from '@threlte/extras';
    import Spaceship from './models/Spaceship.svelte';
    import CentralStar from './models/CentralStar.svelte';
    import Target from './models/Target.svelte';
    import Explosion from './Explosion.svelte';
    import Stars from './Stars.svelte';
    import Projectile from './Projectile.svelte';
    import HUD from './ui/HUD.svelte';
    import { Color, Vector2, Vector3, Raycaster, Plane } from 'three';
    import { onMount } from 'svelte';
    import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
    import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
    import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
    import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
    import { gameStore, fireRate } from '$lib/stores/gameStore.js';

    const { scene, camera, renderer } = useThrelte();
    
    
    let spaceshipRef;
    let playerX = 0; // Horizontal position (-8 to 8)
    let targetX = 0; // Target X position based on mouse
    const playerZ = 6; // Fixed Z position at bottom of play area (moved up for visibility)
    let projectiles = [];
    let targets = [];
    let explosions = [];
    let spawnTimer = 0;
    let spawnRate = 2;
    let currentLevel = 1;
    
    // Mouse state
    let mouseX = 0;
    let mouseY = 0;
    let lockedTargetId = null; // ID of target currently locked by mouse
    
    const composer = new EffectComposer(renderer);
    const raycaster = new Raycaster();
    const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
    const mouseVec = new Vector2();
    const intersectionPoint = new Vector3();
    
    const setupEffectComposer = () => {
        composer.setSize(window.innerWidth, window.innerHeight);
        const renderPass = new RenderPass(scene, camera.current);
        composer.addPass(renderPass);
        
        const bloomPass = new UnrealBloomPass(
            new Vector2(window.innerWidth, window.innerHeight),
            0.4, 1, 0
        );
        composer.addPass(bloomPass);
        
        const outputPass = new OutputPass();
        composer.addPass(outputPass);
    };
    // Laser sound effect
    let laserSound;
    
    function initLaserSound() {
        laserSound = new Audio('/sounds/laser.mp3');
        laserSound.volume = 0.3;
    }

    function shoot() {
        if (!$gameStore.isPlaying) return;
        
        // Play laser sound
        if (laserSound) {
            laserSound.currentTime = 0;
            laserSound.play().catch(() => {}); // Ignore autoplay errors
        }
        
        // Fire upward (toward center) from horizontal position
        projectiles = [...projectiles, {
            id: Date.now(),
            x: playerX,
            z: playerZ,
            angle: -Math.PI / 2, // Fire upward (negative Z direction)
            speed: 25
        }];
    }

    onMount(() => {
        // IMPORTANT: Set scene transparency immediately on mount
        scene.background = null;
        if (renderer) {
            renderer.setClearColor(0x000000, 0); // Fully transparent
            renderer.setClearAlpha(0);
        }
        
        setupEffectComposer();
        initLaserSound();
        
        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            
            // Map mouse X position to horizontal movement range (-8 to 8)
            targetX = mouseX * 8;
        };
        
        const handleClick = (e) => {
            if (e.button === 0) { // Left click
                if (!$gameStore.isPlaying) return;
                
                // Find nearest target to mouse aim and lock onto it
                const aimAngle = Math.atan2(mouseX, mouseY);
                const aimX = Math.cos(aimAngle) * 15;
                const aimZ = Math.sin(aimAngle) * 15;
                
                let nearestDist = 5; // Lock threshold
                let nearestTarget = null;
                
                targets.forEach(t => {
                    const dist = Math.sqrt((t.x - aimX) * (t.x - aimX) + (t.z - aimZ) * (t.z - aimZ));
                    if (dist < nearestDist) {
                        nearestDist = dist;
                        nearestTarget = t;
                    }
                });
                
                if (nearestTarget) {
                    lockedTargetId = nearestTarget.id;
                }
                
                shoot();
            }
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        
        window.addEventListener('resize', () => {
            composer.setSize(window.innerWidth, window.innerHeight);
        });
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    });

    useRender(({ clock }, delta) => {
        if (!$gameStore.isPlaying) {
            composer.render();
            return;
        }
        
        // Smooth horizontal interpolation - ship follows mouse X position
        const xDiff = targetX - playerX;
        playerX += xDiff * 8 * delta; // Smooth follow with spring-like movement
        
        // Clamp player position to bounds
        playerX = Math.max(-8, Math.min(8, playerX));
        
        // Update projectiles
        projectiles = projectiles.map(p => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed * delta,
            z: p.z + Math.sin(p.angle) * p.speed * delta
        })).filter(p => Math.sqrt(p.x * p.x + p.z * p.z) < 20);
        
        // Target lock detection - keep current lock if valid, otherwise find hover target
        // Check if currently locked target still exists
        const lockedTargetExists = lockedTargetId && targets.some(t => t.id === lockedTargetId);
        
        if (!lockedTargetExists) {
            // No valid lock, show hover highlight for nearest target
            const aimAngle = Math.atan2(mouseX, mouseY);
            const aimX = Math.cos(aimAngle) * 15;
            const aimZ = Math.sin(aimAngle) * 15;
            
            let nearestDist = 5;
            lockedTargetId = null;
            
            targets.forEach(t => {
                const dist = Math.sqrt((t.x - aimX) * (t.x - aimX) + (t.z - aimZ) * (t.z - aimZ));
                if (dist < nearestDist) {
                    nearestDist = dist;
                    lockedTargetId = t.id;
                }
            });
        }
        // If locked target exists, keep it locked until destroyed!
        
        // Determine target type based on score
        let targetType = 'asteroid';
        if ($gameStore.score >= 200) {
            targetType = 'dragon';
            currentLevel = 3;
        } else if ($gameStore.score >= 100) {
            targetType = 'alien';
            currentLevel = 2;
        }
        
        // Spawn targets
        spawnTimer += delta;
        if (spawnTimer >= spawnRate) {
            const angle = Math.random() * Math.PI * 2;
            targets = [...targets, {
                id: Date.now(),
                x: Math.cos(angle) * 18,
                z: Math.sin(angle) * 18,
                speed: 1.5 + Math.random() * 1.5 + (currentLevel * 0.3),
                type: targetType
            }];
            spawnTimer = 0;
            spawnRate = Math.max(0.5, spawnRate * 0.99);
        }
        
        // Update targets - move toward center
        targets = targets.map(t => {
            const dx = -t.x;
            const dz = -t.z;
            const dist = Math.sqrt(dx * dx + dz * dz);
            return {
                ...t,
                x: t.x + (dx / dist) * t.speed * delta,
                z: t.z + (dz / dist) * t.speed * delta
            };
        });
        
        // Collision detection - projectiles vs targets
        projectiles.forEach(p => {
            targets.forEach(t => {
                const dx = p.x - t.x;
                const dz = p.z - t.z;
                const dist = Math.sqrt(dx * dx + dz * dz);
                if (dist < 1.2) {
                    // Create explosion at target position
                    explosions = [...explosions, {
                        id: Date.now() + Math.random(),
                        x: t.x,
                        z: t.z
                    }];
                    projectiles = projectiles.filter(proj => proj.id !== p.id);
                    targets = targets.filter(tgt => tgt.id !== t.id);
                    // Score based on target type
                    const points = t.type === 'dragon' ? 30 : (t.type === 'alien' ? 20 : 10);
                    gameStore.addScore(points);
                    gameStore.addCredits(Math.floor(points / 10));
                }
            });
        });
        
        // Star collision - target hits planet
        targets = targets.filter(t => {
            const dist = Math.sqrt(t.x * t.x + t.z * t.z);
            if (dist < 1.5) {
                // Explosion at impact
                explosions = [...explosions, {
                    id: Date.now() + Math.random(),
                    x: t.x,
                    z: t.z
                }];
                const damage = t.type === 'dragon' ? 20 : (t.type === 'alien' ? 15 : 10);
                gameStore.damagestar(damage);
                if ($gameStore.starHealth <= 0) {
                    gameStore.endGame();
                    gameStore.setScreen('game-over');
                }
                return false;
            }
            return true;
        });
        
        composer.render();
    });
</script>

<T.PerspectiveCamera makeDefault position={[0, 15, 0]} fov={60} rotation={[-Math.PI / 2, 0, 0]}>
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />
<T.DirectionalLight intensity={1.5} position={[5, 10, 5]} />

<CentralStar />

{#if $gameStore.isPlaying}
    <Spaceship bind:ref={spaceshipRef} x={playerX} z={playerZ} />
    
    {#each projectiles as projectile (projectile.id)}
        <Projectile x={projectile.x} z={projectile.z} angle={projectile.angle} />
    {/each}
    
    {#each targets as target (target.id)}
        <Target x={target.x} z={target.z} type={target.type} isLocked={lockedTargetId === target.id} />
    {/each}
    
    {#each explosions as explosion (explosion.id)}
        <Explosion 
            x={explosion.x} 
            z={explosion.z} 
            onComplete={() => {
                explosions = explosions.filter(e => e.id !== explosion.id);
            }}
        />
    {/each}
{/if}

