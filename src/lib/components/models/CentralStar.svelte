<script>
    import { T, useFrame } from '@threlte/core';
    
    let pulse = 0;
    
    useFrame((_, delta) => {
        pulse = Math.sin(Date.now() / 500) * 0.1;
    });
</script>

<!-- Central star sphere -->
<T.Mesh scale={[1 + pulse, 1 + pulse, 1 + pulse]}>
    <T.SphereGeometry args={[1, 32, 32]} />
    <T.MeshBasicMaterial color="#ffaa00" />
</T.Mesh>

<!-- Outer glow layer -->
<T.Mesh scale={[1.2 + pulse, 1.2 + pulse, 1.2 + pulse]}>
    <T.SphereGeometry args={[1, 32, 32]} />
    <T.MeshBasicMaterial color="#ff4400" transparent opacity={0.3} />
</T.Mesh>

<!-- Corona layer -->
<T.Mesh scale={[1.5 + pulse * 2, 1.5 + pulse * 2, 1.5 + pulse * 2]}>
    <T.SphereGeometry args={[1, 16, 16]} />
    <T.MeshBasicMaterial color="#ffaa00" transparent opacity={0.1} />
</T.Mesh>

<!-- Central light -->
<T.PointLight color="#ffaa00" intensity={10} distance={20} />
