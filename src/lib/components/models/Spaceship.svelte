<script>
    import { AddEquation, CustomBlending, Group, LessEqualDepth, OneFactor } from 'three';
    import { T, forwardEventHandlers } from '@threlte/core';
    import { useGltf, useTexture } from '@threlte/extras';

    export let ref = new Group();
    export let angle = 0;
    export let radius = 5;

    const gltf = useGltf('/models/spaceship.glb');
    const map = useTexture('/textures/energy-beam-opacity.png');

    gltf.then((model) => {
        function alphaFix(material) {
            material.transparent = true;
            material.alphaToCoverage = true;
            material.depthFunc = LessEqualDepth;
            material.depthTest = true;
            material.depthWrite = true;
        }
        alphaFix(model.materials.spaceship_racer);
        alphaFix(model.materials.cockpit);
    });

    $: x = Math.cos(angle) * radius;
    $: z = Math.sin(angle) * radius;

    const component = forwardEventHandlers();
</script>

<T is={ref} dispose={false} bind:this={$component}>
    <T.Group position={[x, 0, z]} rotation={[0, -angle + Math.PI, 0]}>
        {#await gltf}
            <!-- Loading fallback -->
            <T.Mesh>
                <T.ConeGeometry args={[0.3, 0.8, 8]} />
                <T.MeshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={0.5} />
            </T.Mesh>
        {:then gltf}
            <T.Group scale={0.0008} rotation={[0, Math.PI * 0.5, 0]} position={[0, 0, 0]}>
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.26, -64.81, 64.77]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cylinder002_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.69, -59.39, -553.38]}
                    rotation={[Math.PI / 2, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cylinder003_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[742.15, -64.53, -508.88]}
                    rotation={[Math.PI / 2, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube003_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[737.62, 46.84, -176.41]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cylinder004_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[789.52, 59.45, -224.91]}
                    rotation={[1, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_RExtr001_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[745.54, 159.32, -5.92]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_RPanel003_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.26, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_RPanel003_RExtr_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.26, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube002_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[736.79, -267.14, -33.21]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_RPanel001_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.26, 0, 0]}
                />
                <T.Mesh
                    castShadow
                    receiveShadow
                    geometry={gltf.nodes.Cube001_RPanel003_RExtr001_spaceship_racer_0.geometry}
                    material={gltf.materials.spaceship_racer}
                    position={[739.26, 0, 0]}
                />
                <T.Mesh
                    geometry={gltf.nodes.Cube005_cockpit_0.geometry}
                    material={gltf.materials.cockpit}
                    position={[739.45, 110.44, 307.18]}
                    rotation={[0.09, 0, 0]}
                />
                <T.Mesh
                    geometry={gltf.nodes.Sphere_cockpit_0.geometry}
                    material={gltf.materials.cockpit}
                    position={[739.37, 145.69, 315.6]}
                    rotation={[0.17, 0, 0]}
                />
                {#await map then mapValue}
                    <T.Mesh position={[740, -60, -1350]} rotation.x={Math.PI * 0.5}>
                        <T.CylinderGeometry args={[70, 25, 1600, 15]} />
                        <T.MeshBasicMaterial
                            color={[1.0, 0.4, 0.02]}
                            alphaMap={mapValue}
                            transparent
                            blending={CustomBlending}
                            blendDst={OneFactor}
                            blendEquation={AddEquation}
                        />
                    </T.Mesh>
                {/await}
            </T.Group>
        {:catch error}
            <T.Mesh>
                <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
                <T.MeshStandardMaterial color="red" />
            </T.Mesh>
        {/await}
        
        <!-- Engine glow -->
        <T.PointLight color="#ffaa00" intensity={3} distance={3} position={[0, 0, -0.5]} />
    </T.Group>
</T>
