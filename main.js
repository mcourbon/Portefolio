import * as THREE from 'three';

const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();

let aspect = window.innerWidth / window.innerHeight;
const frustumSize = 10;
const camera = new THREE.OrthographicCamera( // OrthographicCamera to avoid perspective distortion
    frustumSize * aspect / -2, // Left
    frustumSize * aspect / 2,  // Right
    frustumSize / 2,          // Top
    frustumSize / -2,         // Bottom
    0.1,                      // Near plane
    1000                      // Far plane
);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Principal sphere (moon)
const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xD5D8DC,
});
const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

// Stars
const starCount = 200;
const starGeometry = new THREE.BufferGeometry();
const starPositions = [];
for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 30;
    const y = (Math.random() - 0.5) * 15;
    const z = -5 + Math.random() * -5;
    starPositions.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);


// Create a mask for the moon (a sphere with the same size as the moon)
const maskGeometry = new THREE.SphereGeometry(1, 64, 64);
const maskMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
});
const mask = new THREE.Mesh(maskGeometry, maskMaterial);

// Moon group
const moonGroup = new THREE.Group();
moonGroup.add(moon);
moonGroup.add(mask);

mask.position.set(0.4, 0, 0.3); // Shifting the mask 

moonGroup.position.set(-8, 3, -4);
scene.add(moonGroup);

// Light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

camera.position.set(0, 0, 10); // Position of camera 
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Camera looks at the center of the scene

function getFrustumBounds() {
    const halfWidth = (frustumSize * aspect) / 2;
    const margin = halfWidth * 0.1; // 10% of bounds for margin
    return {
        left: -halfWidth + margin,
        right: halfWidth - margin
    };
}

function getSpeedFactor() {
    const screenWidth = window.innerWidth;
    const baseSpeed = 0.005; // Normal speed for a normal screen
    const minSpeedFactor = 0.005; // Minimum speed
    const maxSpeedFactor = 0.01; // Maximum speed for large screens
    let speedFactor = baseSpeed * (screenWidth / 1920); // 1920px being the reference width
    if (speedFactor < minSpeedFactor) {
        speedFactor = minSpeedFactor;
    } else if (speedFactor > maxSpeedFactor) {
        speedFactor = maxSpeedFactor;
    }
    return speedFactor;
}

const bounds = getFrustumBounds();
let moonPositionX = bounds.left;

// Calculate dynamic rotation speed
function getRotationSpeed() {
    const screenWidth = window.innerWidth;
    const baseRotationSpeed = 0.5; // Normal rotation speed (in radians per second)
    const minRotationSpeed = 0.25; // Minimum speed
    const maxRotationSpeed = 1; // Maximum speed for large screens
    let rotationSpeed = baseRotationSpeed * (screenWidth / 1920); // Adjust rotation speed based on screen size
    if (rotationSpeed < minRotationSpeed) {
        rotationSpeed = minRotationSpeed;
    } else if (rotationSpeed > maxRotationSpeed) {
        rotationSpeed = maxRotationSpeed;
    }
    return rotationSpeed;
}

let direction = 1;

// Animation
function animate() {
    requestAnimationFrame(animate);
    const speed = getSpeedFactor();
    // Calculate the progress of the movement (between 0 and 1)
    const progress = (moonPositionX - bounds.left) / (bounds.right - bounds.left);
    // Calculation of the rotation to make a single complete turn during the movement
    const phaseRotation = progress * Math.PI * 2; // 0 to 2 * PI (360°) for a full turn
    moonGroup.rotation.y = phaseRotation; // Apply the rotation for the phases
    // If the moon has reached the right limit go back to the left
    if (moonPositionX >= bounds.right) {
        moonPositionX = bounds.right;
        direction = -1;
    } else if (moonPositionX <= bounds.left) {
        moonPositionX = bounds.left;
        direction = 1;
    }
    // Move the moon
    moonPositionX += speed * direction;
    // Apply the movement
    moonGroup.position.x = moonPositionX;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    aspect = window.innerWidth / window.innerHeight;

    camera.left = -frustumSize * aspect / 2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = -frustumSize / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    Object.assign(bounds, getFrustumBounds());
});

animate();
