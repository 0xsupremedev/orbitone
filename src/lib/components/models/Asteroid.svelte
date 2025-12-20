<script>
    import { T, useFrame } from '@threlte/core';
    
    export let x = 0;
    export let z = 0;
    
    // Random rotation speeds for each asteroid
    let rotX = Math.random() * 2 - 1;
    let rotY = Math.random() * 2 - 1;
    let rotZ = Math.random() * 2 - 1;
    let rotation = { x: 0, y: 0, z: 0 };
    let scale = 0.8 + Math.random() * 0.6; // Random size variation
    
    useFrame((_, delta) => {
        rotation.x += rotX * delta * 2;
        rotation.y += rotY * delta * 2;
        rotation.z += rotZ * delta * 2;
    });
</script>

<T.Group position={[x, 0, z]}>
    <!-- Main asteroid body - irregular rocky shape -->
    <T.Mesh rotation={[rotation.x, rotation.y, rotation.z]} scale={scale}>
        <T.IcosahedronGeometry args={[0.5, 0]} />
        <T.MeshStandardMaterial 
            color="#8B7355" 
            roughness={0.9}
            metalness={0.1}
            flatShading={true}
        />
    </T.Mesh>
    
    <!-- Secondary rock detail -->
    <T.Mesh 
        position={[0.2, 0.1, 0.15]} 
        rotation={[rotation.x * 0.8, rotation.y * 1.2, rotation.z]}
        scale={scale * 0.4}
    >
        <T.IcosahedronGeometry args={[0.5, 0]} />
        <T.MeshStandardMaterial 
            color="#6B5344" 
            roughness={0.95}
            flatShading={true}
        />
    </T.Mesh>
    
    <!-- Subtle glow for visibility -->
    <T.PointLight color="#ff6600" intensity={0.5} distance={2} />
</T.Group>
