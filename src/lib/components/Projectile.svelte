<script>
    import { T } from '@threlte/core';
    
    export let x = 0;
    export let z = 0;
    export let angle = 0;
</script>

<T.Group position={[x, 0, z]} rotation={[0, -angle, 0]}>
    <T.Mesh>
        <T.CapsuleGeometry args={[0.05, 0.3, 4, 8]} />
        <T.MeshBasicMaterial color="#00f2ff" transparent opacity={0.9} />
    </T.Mesh>
    
    <!-- Glow effect -->
    <T.PointLight color="#00f2ff" intensity={2} distance={2} />
</T.Group>
