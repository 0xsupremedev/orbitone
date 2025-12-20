<script>
    import { T, useFrame } from '@threlte/core';
    import { Instance, InstancedMesh, useTexture } from '@threlte/extras';
    import { Color, DoubleSide, Vector3 } from 'three';

    let STARS_COUNT = 400;
    let colors = ['#fcaa67', '#C75D59', '#ffffc7', '#8CC5C6', '#A5898C', '#00f2ff'];
    let stars = [];

    const map = useTexture('/textures/star.png');

    function r(min, max) {
        return min + Math.random() * (max - min);
    }

    function resetStar(star) {
        star.pos = new Vector3(
            r(-30, 30),
            r(-20, 20),
            r(-30, 30)
        );
        star.len = r(0.5, 2);
        star.speed = r(5, 15);
        star.rad = r(0.02, 0.05);
        star.color = new Color(colors[Math.floor(Math.random() * colors.length)])
            .convertSRGBToLinear()
            .multiplyScalar(1.5);
        return star;
    }

    for (let i = 0; i < STARS_COUNT; i++) {
        let star = { pos: null, len: null, speed: null, color: null };
        stars.push(resetStar(star));
    }

    useFrame((_, delta) => {
        stars.forEach((star) => {
            star.pos.y -= star.speed * delta;
            if (star.pos.y < -20) {
                star.pos.y = 20;
                star.pos.x = r(-30, 30);
                star.pos.z = r(-30, 30);
            }
        });
        stars = stars;
    });
</script>

{#await map then value}
    <InstancedMesh limit={STARS_COUNT} range={STARS_COUNT}>
        <T.PlaneGeometry args={[0.1, 0.5]} />
        <T.MeshBasicMaterial side={DoubleSide} alphaMap={value} transparent />

        {#each stars as star}
            <Instance
                position={[star.pos.x, star.pos.y, star.pos.z]}
                scale={[1, star.len, 1]}
                color={star.color}
                rotation={[Math.PI / 2, 0, 0]}
            />
        {/each}
    </InstancedMesh>
{/await}
