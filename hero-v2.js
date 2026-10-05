import * as THREE from 'three';
import moonTextureUrl from './assets/moon-texture.jpg';

const canvas = document.getElementById('hero-v2-canvas');

if (canvas) {
    const scene = new THREE.Scene();

    let aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
        frustumSize * aspect / -2,
        frustumSize * aspect / 2,
        frustumSize / 2,
        frustumSize / -2,
        0.1,
        1000
    );
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Soft radial glow texture used as an additive halo behind the moon
    function makeGlowTexture() {
        const size = 256;
        const c = document.createElement('canvas');
        c.width = c.height = size;
        const ctx = c.getContext('2d');
        const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        gradient.addColorStop(0, 'rgba(243, 229, 201, 0.85)');
        gradient.addColorStop(0.15, 'rgba(243, 229, 201, 0.5)');
        gradient.addColorStop(0.35, 'rgba(243, 229, 201, 0.25)');
        gradient.addColorStop(0.55, 'rgba(243, 229, 201, 0.11)');
        gradient.addColorStop(0.75, 'rgba(243, 229, 201, 0.04)');
        gradient.addColorStop(0.9, 'rgba(243, 229, 201, 0.01)');
        gradient.addColorStop(1, 'rgba(243, 229, 201, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        return new THREE.CanvasTexture(c);
    }

    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: makeGlowTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    }));
    glowSprite.scale.set(6.5, 6.5, 1);

    // Moon: a single sphere shaded into a crescent by real directional
    // lighting (no second occluding sphere, no seam to blend away).
    // Starts as a flat color; once the surface texture (Solar System Scope,
    // CC BY 4.0, solarsystemscope.com/textures) loads, it's blended down
    // with a flat cream fill so the crater detail reads as a subtle relief
    // rather than a photographic image against the site's flat, illustrated
    // look, then swapped in as the map.
    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 64, 64),
        new THREE.MeshStandardMaterial({
            color: 0xfbeedc,
            emissive: 0x1a1235,
            emissiveIntensity: 0.55,
            roughness: 1,
        })
    );

    new THREE.TextureLoader().load(moonTextureUrl, (loaded) => {
        const img = loaded.image;
        const c = document.createElement('canvas');
        c.width = img.width;
        c.height = img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = '#f3e5c9';
        ctx.fillRect(0, 0, c.width, c.height);
        const blended = new THREE.CanvasTexture(c);
        blended.colorSpace = THREE.SRGBColorSpace;
        moon.material.map = blended;
        moon.material.needsUpdate = true;
    });

    const moonGroup = new THREE.Group();
    moonGroup.add(glowSprite);
    moonGroup.add(moon);
    moonGroup.position.set(0, 2.2, -3);
    scene.add(moonGroup);

    // Keep the moon inside the visible frustum on narrow/portrait screens:
    // its x was tuned for a wide desktop view and gets clipped on mobile
    // if left fixed, since the orthographic frustum's width shrinks with
    // the viewport's aspect ratio.
    function updateMoonX() {
        const halfWidth = frustumSize * aspect / 2;
        moonGroup.position.x = Math.min(2.4, Math.max(0.6, halfWidth - 1.6));
    }
    updateMoonX();

    // Twinkling starfield: three depth layers pulsing at different phases
    const starLayers = [];
    function createStarLayer(count, spreadX, spreadY, size, baseOpacity) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push(
                (Math.random() - 0.5) * spreadX,
                Math.random() * spreadY,
                -4 - Math.random() * 6
            );
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0xf3e5c9,
            size,
            transparent: true,
            opacity: baseOpacity,
        });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        starLayers.push({ material, baseOpacity, phase: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.4 });
    }
    createStarLayer(130, 26, 9, 0.045, 0.8);
    createStarLayer(90, 26, 8, 0.03, 0.5);
    createStarLayer(60, 26, 7, 0.02, 0.3);

    scene.add(new THREE.AmbientLight(0x3a2f60, 0.35));
    // The light orbits with the moon's own rotation (see animate()) so the
    // lit/dark split stays attached to the same craters instead of the
    // terminator staying fixed on screen while the texture spins under it.
    const moonLightBaseOffset = new THREE.Vector3(-9, 1, -6);
    const moonLight = new THREE.DirectionalLight(0xf3e5c9, 2.2);
    moonLight.position.copy(moonLightBaseOffset);
    const moonLightTarget = new THREE.Object3D();
    scene.add(moonLightTarget);
    moonLight.target = moonLightTarget;
    scene.add(moonLight);

    // Mouse parallax: camera drifts gently, dune layers shift per depth
    const duneLayers = [
        { el: document.querySelector('.dune-back'), amount: 6 },
        { el: document.querySelector('.dune-mid'), amount: 14 },
        { el: document.querySelector('.dune-front'), amount: 26 },
    ];

    let targetX = 0;
    let targetY = 0;
    // Touch devices have no real hover/mousemove: a tap fires a single
    // synthetic mousemove, snapping the dunes sideways in one abrupt jump
    // instead of gliding, and can expose the darker layer underneath. Only
    // wire this up for pointers that can actually hover continuously.
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            targetX = nx * 0.6;
            targetY = ny * 0.3;

            duneLayers.forEach(({ el, amount }) => {
                if (el) el.style.transform = `translateX(${nx * amount}px)`;
            });
        });
    }

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        moonGroup.position.y = 2.2 + Math.sin(t * 0.15) * 0.1;
        moon.rotation.y = t * 0.14;

        const rotatedLightOffset = moonLightBaseOffset.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), moon.rotation.y);
        moonLight.position.copy(moonGroup.position).add(rotatedLightOffset);
        moonLightTarget.position.copy(moonGroup.position);

        camera.position.x += (targetX - camera.position.x) * 0.02;
        camera.position.y += (-targetY - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        starLayers.forEach(layer => {
            layer.material.opacity = layer.baseOpacity + Math.sin(t * layer.speed + layer.phase) * 0.15;
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        aspect = window.innerWidth / window.innerHeight;
        camera.left = -frustumSize * aspect / 2;
        camera.right = frustumSize * aspect / 2;
        camera.top = frustumSize / 2;
        camera.bottom = -frustumSize / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        updateMoonX();
    });
}

// Drifting sand: lightweight 2D canvas layer, blown across the dunes by the wind
const sandCanvas = document.getElementById('sand-canvas');

if (sandCanvas) {
    const ctx = sandCanvas.getContext('2d');
    let width;
    let height;
    // On phones the same pixel speed/spread reads as way too fast and too
    // tall relative to the smaller dune art underneath, so slow it down and
    // keep grains confined closer to the dunes instead of the full hero.
    let isMobile = window.matchMedia('(max-width: 768px)').matches;

    function resizeSand() {
        width = sandCanvas.width = window.innerWidth;
        height = sandCanvas.height = window.innerHeight;
        isMobile = window.matchMedia('(max-width: 768px)').matches;
    }
    resizeSand();
    window.addEventListener('resize', resizeSand);

    function spawnGrain(anywhereOnX) {
        const depth = Math.random(); // 0 = far/small/slow, 1 = near/big/fast
        const yStart = isMobile ? 0.72 : 0.52;
        const ySpread = isMobile ? 0.26 : 0.46;
        const speedScale = isMobile ? 0.45 : 1;
        return {
            x: anywhereOnX ? Math.random() * width : -20,
            y: height * (yStart + Math.random() * ySpread),
            depth,
            size: 0.6 + depth * 2.2,
            speed: (18 + depth * 55) * speedScale,
            driftPhase: Math.random() * Math.PI * 2,
            driftSpeed: 0.5 + Math.random() * 1,
            opacity: 0.12 + depth * 0.3,
        };
    }

    const GRAIN_COUNT = 70;
    const grains = Array.from({ length: GRAIN_COUNT }, () => spawnGrain(true));

    let lastTime = performance.now();
    function animateSand(now) {
        requestAnimationFrame(animateSand);
        const dt = Math.min((now - lastTime) / 1000, 0.05);
        lastTime = now;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f3e5c9';

        grains.forEach((grain) => {
            grain.x += grain.speed * dt;
            grain.y += Math.sin(now * 0.001 * grain.driftSpeed + grain.driftPhase) * 0.3;

            if (grain.x > width + 20) {
                Object.assign(grain, spawnGrain(false));
            }

            ctx.globalAlpha = grain.opacity;
            ctx.beginPath();
            ctx.ellipse(grain.x, grain.y, grain.size, grain.size * 0.4, 0.3, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;
    }
    requestAnimationFrame(animateSand);
}
