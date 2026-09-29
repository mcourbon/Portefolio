import * as THREE from 'three';

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
        gradient.addColorStop(0, 'rgba(243, 229, 201, 0.9)');
        gradient.addColorStop(0.3, 'rgba(243, 229, 201, 0.35)');
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

    // Moon (crescent phase via a dark occluding sphere, same trick as V1)
    const moon = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 64, 64),
        new THREE.MeshStandardMaterial({
            color: 0xf3e5c9,
            emissive: 0x4a3a1e,
            emissiveIntensity: 0.15,
            roughness: 0.9,
        })
    );

    const mask = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x150f2e })
    );
    mask.position.set(0.45, 0.1, 0.35);

    const moonGroup = new THREE.Group();
    moonGroup.add(glowSprite);
    moonGroup.add(moon);
    moonGroup.add(mask);
    moonGroup.position.set(2.4, 2.2, -3);
    scene.add(moonGroup);

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const rimLight = new THREE.DirectionalLight(0xf3e5c9, 0.6);
    rimLight.position.set(-3, 2, 4);
    scene.add(rimLight);

    // Mouse parallax: camera drifts gently, dune layers shift per depth
    const duneLayers = [
        { el: document.querySelector('.dune-back'), amount: 6 },
        { el: document.querySelector('.dune-mid'), amount: 14 },
        { el: document.querySelector('.dune-front'), amount: 26 },
    ];

    let targetX = 0;
    let targetY = 0;
    window.addEventListener('mousemove', (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        targetX = nx * 0.6;
        targetY = ny * 0.3;

        duneLayers.forEach(({ el, amount }) => {
            if (el) el.style.transform = `translateX(${nx * amount}px)`;
        });
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        moonGroup.position.y = 2.2 + Math.sin(t * 0.15) * 0.1;
        moonGroup.rotation.y = Math.sin(t * 0.05) * 0.15;

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
    });
}

// Drifting sand: lightweight 2D canvas layer, blown across the dunes by the wind
const sandCanvas = document.getElementById('sand-canvas');

if (sandCanvas) {
    const ctx = sandCanvas.getContext('2d');
    let width;
    let height;

    function resizeSand() {
        width = sandCanvas.width = window.innerWidth;
        height = sandCanvas.height = window.innerHeight;
    }
    resizeSand();
    window.addEventListener('resize', resizeSand);

    function spawnGrain(anywhereOnX) {
        const depth = Math.random(); // 0 = far/small/slow, 1 = near/big/fast
        return {
            x: anywhereOnX ? Math.random() * width : -20,
            y: height * (0.52 + Math.random() * 0.46),
            depth,
            size: 0.6 + depth * 2.2,
            speed: 18 + depth * 55,
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
