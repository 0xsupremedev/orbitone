<script>
    import { T } from '@threlte/core';
    
    export let x = 0;
    export let z = 0;
    
    $: angle = Math.atan2(-z, -x);
</script>

<T.Group position={[x, 0, z]} rotation={[0, -angle, 0]}>
    <!-- Enemy ship body -->
    <T.Mesh>
        <T.ConeGeometry args={[0.3, 0.6, 6]} />
        <T.MeshStandardMaterial 
            color="#ff4400" 
            emissive="#ff4400" 
            emissiveIntensity={0.3}
        />
    </T.Mesh>
    
    <!-- Wings -->
    <T.Mesh position={[0.3, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
        <T.BoxGeometry args={[0.4, 0.05, 0.2]} />
        <T.MeshStandardMaterial color="#ffaa00" />
    </T.Mesh>
    <T.Mesh position={[-0.3, 0, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
        <T.BoxGeometry args={[0.4, 0.05, 0.2]} />
        <T.MeshStandardMaterial color="#ffaa00" />
    </T.Mesh>
    
    <!-- Glow -->
    <T.PointLight color="#ff4400" intensity={2} distance={2} />
</T.Group>
