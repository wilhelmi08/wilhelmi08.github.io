// PLATINUM EDITION + CELEBRATION UPGRADE
const christmasTexts = [
    "MERRY CHRISTMAS!", "HO HO HO!", "JINGLE BELLS!", "SANTA IS COMING!", "PEACE ON EARTH!",
    "JOY TO THE WORLD!", "LET IT SNOW!", "SILENT NIGHT!", "DECK THE HALLS!", "HAPPY HOLIDAYS!",
    "SEASON'S GREETINGS!", "FELIZ NAVIDAD!", "WINTER WONDERLAND!", "TIS THE SEASON!", "GOOD TIDINGS!",
    "FROSTY THE SNOWMAN!", "RUDOLPH ROCKS!", "NORTH POLE POWER!", "SANTA SLEIGH RIDE!", "CHRISTMAS MAGIC!",
    "HOLIDAY CHEER!", "SANTAS WORKSHOP!", "ELF SQUAD!", "REINDEER GAMES!", "SANTA CLAUS IS REAL!",
    "BELIEVE!", "CHRISTMAS SPIRIT!", "WARM WISHES!", "COZY NIGHTS!", "GIFT GIVER!",
    "STARRY NIGHT!", "ANGELIC CHORUS!", "CANDY CANE LANE!", "GINGERBREAD HOUSE!", "MISTLETOE MOMENT!",
    "LOVE AND LIGHT!", "FESTIVE FUN!", "HOLIDAY HUGS!", "CHRISTMAS COOKIES!", "EGGNOG TIME!",
    "SNOWFLAKE KISSES!", "WINTER BREEZE!", "SLEIGH BELLS RING!", "CHESTNUTS ROASTING!", "JACK FROST NIPPING!",
    "HOLIDAY MAGIC!", "CHRISTMAS JOY!", "FESTIVE FEAST!", "YULETIDE!", "NATIVITY SCENE!",
    "CHRISTMAS EVE!", "BOXING DAY!", "NEW YEAR SOON!", "LAST CHRISTMAS!", "ALL I WANT FOR CHRISTMAS!",
    "WONDERFUL TIME!", "SNOWY DAY!", "WHITE CHRISTMAS!", "RED AND GREEN!", "GOLDEN STAR!",
    "SILVER BELLS!", "LIT TREE!", "ORNAMENT ATTACK!", "TINSEL TOWN!", "HAVE A HOLLY JOLLY!",
    "ROCKIN AROUND!", "CHRISTMAS VACATION!", "HOME ALONE!", "THE GRINCH!", "SCROOGE NO MORE!",
    "BAH HUMBUG!", "TINY TIM!", "CHRISTMAS CAROL!", "MIDNIGHT MASS!", "STOCKING STUFFER!",
    "UNDER THE TREE!", "WRAPPING PAPER!", "BOWS AND RIBBONS!", "SECRET SANTA!", "BEST GIFT EVER!",
    "CHRISTMAS LIGHTS!", "SNOW BALL FIGHT!", "BUILD A SNOWMAN!", "HOT CHOCOLATE!", "MARSHMALLOWS!",
    "FIREPLACE BOOM!", "WINTER SOLSTICE!", "SHORTEST DAY!", "LONGEST NIGHT!", "NORTHERN LIGHTS!",
    "POLAR EXPRESS!", "SANTA HAS ARRIVED!", "MAKE A WISH!", "DREAM BIG!", "CHRISTMAS MIRACLE!",
    "HOLIDAY HERO!", "SUPER SANTA!", "FLYING HIGH!", "MAGIC DUST!", "TO THE MOON!"
];

function triggerCelebration() {
    // 1. Rainbow Explosion
    rainbowExplosion(playerGroup.position);

    // 2. Random Text
    const textEl = document.getElementById('celebration-text');
    textEl.innerText = christmasTexts[Math.floor(Math.random() * christmasTexts.length)];
    textEl.classList.add('show');
    setTimeout(() => textEl.classList.remove('show'), 3000);
}

// 1. SETUP
const scene = new THREE.Scene();
const nightColor = new THREE.Color(0x151940); // Deep but visible blue
scene.background = nightColor;
scene.fog = new THREE.FogExp2(0x151940, 0.004);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 2. INPUTS
const keys = { w: false, a: false, s: false, d: false, shift: false };
let viewYaw = Math.PI;
let viewPitch = 0;

document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);
document.body.addEventListener('click', () => { document.body.requestPointerLock(); });
document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement === document.body) {
        viewYaw -= event.movementX * 0.002;
        viewPitch -= event.movementY * 0.002;
        viewPitch = Math.max(-1.5, Math.min(1.5, viewPitch));
    }
});

// 3. LIGHTS
const ambientLight = new THREE.AmbientLight(0x7777ff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffeebb, 0.9);
dirLight.position.set(200, 300, 100);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 0.5; dirLight.shadow.camera.far = 1500;
const d = 600;
dirLight.shadow.camera.left = -d; dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d; dirLight.shadow.camera.bottom = -d;
scene.add(dirLight);

// 4. ENVIRONMENT (Restored)
// Ground
const plane = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }));
plane.rotation.x = -Math.PI / 2; plane.receiveShadow = true; scene.add(plane);

// Rolling Hills
const hillGroup = new THREE.Group(); scene.add(hillGroup);
const hillGeo = new THREE.SphereGeometry(40, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
const hillMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: false });
for (let i = 0; i < 60; i++) {
    const h = new THREE.Mesh(hillGeo, hillMat);
    h.position.set((Math.random() - 0.5) * 1200, -10, (Math.random() - 0.5) * 1200);
    h.scale.set(Math.random() * 4 + 2, 0.6, Math.random() * 4 + 2);
    h.receiveShadow = true; hillGroup.add(h);
}

// Stars
const starsGeo = new THREE.BufferGeometry();
const starPos = [];
for (let i = 0; i < 4000; i++) starPos.push((Math.random() - 0.5) * 1500, Math.random() * 800 + 100, (Math.random() - 0.5) * 1500);
starsGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starsGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, transparent: true, opacity: 0.8 })));

// Aurora
function createAurora() {
    const geo = new THREE.PlaneGeometry(1500, 300, 40, 5);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, Math.sin(pos.getX(i) * 0.01) * 50 + Math.random() * 20);
    geo.computeVertexNormals();
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.15, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 250, 0); mesh.rotation.x = Math.PI / 2; scene.add(mesh);
    const m2 = mesh.clone(); m2.material = mat.clone(); m2.material.color.setHex(0xaa00ff); m2.position.set(0, 280, 0); m2.rotation.z = 0.3; scene.add(m2);
}
createAurora();

// 5. ASSETS & COLLISION
const collidables = [];
const propGroup = new THREE.Group(); scene.add(propGroup);
const rand = (min, max) => Math.random() * (max - min) + min;

function addCollider(x, z, r) { collidables.push({ x, z, r }); }

// ASSET LIBRARY (FULL RESTORE)
function createTree(x, z) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 4, 6), new THREE.MeshStandardMaterial({ color: 0x3e2723 })).translateY(2));
    const lm = new THREE.MeshStandardMaterial({ color: 0x1b5e20, flatShading: true });
    g.add(new THREE.Mesh(new THREE.ConeGeometry(3, 5, 6), lm).translateY(4));
    g.add(new THREE.Mesh(new THREE.ConeGeometry(2, 4, 6), lm).translateY(6));
    g.position.set(x, 0, z); g.scale.setScalar(rand(1, 1.8)); addCollider(x, z, 1.5); return g;
}
function createSnowman(x, z) {
    const g = new THREE.Group();
    const m = new THREE.MeshStandardMaterial({ color: 0xffffff });
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.5), m).translateY(1.2));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(1.1), m).translateY(3.2));
    g.add(new THREE.Mesh(new THREE.SphereGeometry(0.8), m).translateY(4.8));
    g.add(new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.5), new THREE.MeshStandardMaterial({ color: 0xff6600 })).rotateZ(-1.57).translateY(4.8).translateX(0.8));
    g.position.set(x, 0, z); g.rotation.y = rand(0, 6); return g;
}
function createCabin(x, z) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(6, 4, 5), new THREE.MeshStandardMaterial({ color: 0x5d4037 })).translateY(2));
    const r = new THREE.Mesh(new THREE.ConeGeometry(5, 3, 4), new THREE.MeshStandardMaterial({ color: 0x3e2723 }));
    r.position.y = 5.5; r.rotation.y = 0.78; r.scale.set(1, 1, 1.4); g.add(r);
    g.add(new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.5), new THREE.MeshStandardMaterial({ color: 0xffd54f, emissive: 0xffab00 })).translateY(1.26).translateZ(2.51));
    g.position.set(x, 0, z); g.rotation.y = rand(0, 6); addCollider(x, z, 5); return g;
}
function createRock(x, z) { const g = new THREE.Mesh(new THREE.DodecahedronGeometry(rand(1, 2)), new THREE.MeshStandardMaterial({ color: 0x757575, flatShading: true })); g.position.set(x, 1, z); g.scale.set(1, 0.6, 1); g.castShadow = true; addCollider(x, z, 1.5); return g; }
function createBush(x, z) { const g = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5), new THREE.MeshStandardMaterial({ color: 0x2e7d32, flatShading: true })); g.position.set(x, 1, z); g.castShadow = true; return g; }
function createIgloo(x, z) { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xffffff }))); const t = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 2, 8, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })); t.rotation.x = Math.PI / 2; t.position.set(0, 0, 3); g.add(t); g.position.set(x, 0, z); addCollider(x, z, 3); return g; }
function createPenguin(x, z) { const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 1.2), new THREE.MeshStandardMaterial({ color: 0x212121 })); b.position.y = 0.6; g.add(b); const t = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.0, 8, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({ color: 0xffffff })); t.position.set(0, 0.6, 0.15); g.add(t); const h = new THREE.Mesh(new THREE.SphereGeometry(0.35), new THREE.MeshStandardMaterial({ color: 0x212121 })); h.position.y = 1.3; g.add(h); const bk = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3), new THREE.MeshStandardMaterial({ color: 0xffb300 })); bk.position.set(0, 1.3, 0.35); bk.rotation.x = 1.57; g.add(bk); g.position.set(x, 0, z); g.rotation.y = rand(0, 6); return g; }
function createSignPost(x, z) { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2), new THREE.MeshStandardMaterial({ color: 0x5d4037 })).translateY(1)); g.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x8d6e63 })).translateY(1.8)); g.position.set(x, 0, z); g.rotation.y = rand(0, 6); return g; }
function createGiftStack(x, z) { const g = new THREE.Group(); g.add(new THREE.Mesh(new THREE.BoxGeometry(1, 0.8, 1), new THREE.MeshStandardMaterial({ color: 0xff0000 })).translateY(0.4)); g.add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 0.7), new THREE.MeshStandardMaterial({ color: 0x00ff00 })).translateY(1.1).rotateY(0.5)); g.position.set(x, 0, z); return g; }

// Giant Tree
const gt = new THREE.Group();
const gtt = new THREE.Mesh(new THREE.CylinderGeometry(3, 4, 15, 8), new THREE.MeshStandardMaterial({ color: 0x3e2723 })); gtt.position.y = 7.5; gt.add(gtt);
const gtm = new THREE.MeshStandardMaterial({ color: 0x0f3b0f });
[15, 25, 35].forEach((y, i) => gt.add(new THREE.Mesh(new THREE.ConeGeometry(15 - i * 3, 15, 12), gtm).translateY(y)));
gt.add(new THREE.PointLight(0xffaa00, 3, 60).translateY(40));
gt.add(new THREE.Mesh(new THREE.DodecahedronGeometry(2), new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00 })).translateY(45));
scene.add(gt); collidables.push({ x: 0, z: 0, r: 6 });

// Populate
// 5a. TERRAIN UTILS
function getTerrainHeight(x, z) {
    let y = 0;
    hillGroup.children.forEach(h => {
        const dx = (x - h.position.x) / h.scale.x;
        const dz = (z - h.position.z) / h.scale.z;
        const rSq = 40 * 40 - dx * dx - dz * dz;
        if (rSq > 0) {
            const hY = h.position.y + Math.sqrt(rSq) * h.scale.y;
            if (hY > y) y = hY;
        }
    });
    return y;
}

// Populate
for (let i = 0; i < 1500; i++) {
    const x = rand(-500, 500), z = rand(-500, 500), d = Math.sqrt(x * x + z * z);
    if (d < 50) continue;

    let mesh = null;
    const r = Math.random();
    if (r < 0.05) mesh = createRock(x, z);
    else if (r < 0.10) mesh = createBush(x, z);
    else if (r < 0.12) mesh = createIgloo(x, z);
    else if (r < 0.14) mesh = createPenguin(x, z);
    else if (r < 0.15) mesh = createSignPost(x, z);
    else if (r < 0.18) mesh = createGiftStack(x, z);
    else if (r < 0.25) mesh = createSnowman(x, z);
    else if (r < 0.28) mesh = createCabin(x, z);
    else mesh = createTree(x, z);

    mesh.position.y += getTerrainHeight(x, z);
    propGroup.add(mesh);
}


// 6. PLAYER (Restored High Quality V4)
const playerGroup = new THREE.Group(); scene.add(playerGroup);
playerGroup.position.set(0, 40, 60);

const reindeerLegs = [];
function createSleigh() {
    const root = new THREE.Group();
    // Runners
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 2), new THREE.Vector3(0, 0, -2), new THREE.Vector3(0, 1, -2.5)]);
    const runnerGeo = new THREE.TubeGeometry(curve, 12, 0.08, 6, false);
    const gold = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8 });
    const r1 = new THREE.Mesh(runnerGeo, gold); r1.position.x = 1; root.add(r1);
    const r2 = new THREE.Mesh(runnerGeo, gold); r2.position.x = -1; root.add(r2);
    // Body
    const red = new THREE.MeshStandardMaterial({ color: 0xb71c1c });
    root.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 1, 3.5), red).translateY(1).translateX(1));
    root.add(new THREE.Mesh(new THREE.BoxGeometry(0.2, 1, 3.5), red).translateY(1).translateX(-1));
    root.add(new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.2, 3.5), red).translateY(0.5));
    root.add(new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.5, 0.2), red).translateY(1.2).translateZ(1.7));
    const front = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 2.2, 16, 1, true, 0, Math.PI), red);
    front.rotation.z = Math.PI / 2; front.position.set(0, 1, -1.75); root.add(front);
    // Santa
    const santa = new THREE.Group(); santa.position.set(0, 1.5, 0.5); santa.add(new THREE.Mesh(new THREE.SphereGeometry(0.6), red));
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.35), new THREE.MeshStandardMaterial({ color: 0xffccbc })); head.position.y = 0.8; santa.add(head);
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.8), red); hat.position.set(0, 1.2, -0.1); hat.rotation.x = -0.2; santa.add(hat); root.add(santa);
    // Reindeer
    function addDeer(x) {
        const d = new THREE.Group();
        const brown = new THREE.MeshStandardMaterial({ color: 0x5d4037 });
        d.add(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.7, 1.5), brown).translateY(1));
        d.add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 1), brown).translateY(1.8).translateZ(-1));
        [1, -1].forEach(mz => [1, -1].forEach(mx => {
            const l = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1, 0.15), brown); l.position.set(mx * 0.2, 0.5, mz * 0.6);
            d.add(l); reindeerLegs.push(l);
        }));
        d.position.set(x, 0, -4); root.add(d);
    }
    addDeer(1); addDeer(-1); return root;
}
playerGroup.add(createSleigh());


// Physics
const velocity = new THREE.Vector3();
let time = 0;

// Snow
const snowGeo = new THREE.BufferGeometry();
const snowPos = [];
for (let i = 0; i < 10000; i++) snowPos.push((Math.random() - 0.5) * 800, Math.random() * 800, (Math.random() - 0.5) * 800);
snowGeo.setAttribute('position', new THREE.Float32BufferAttribute(snowPos, 3));
const snowSys = new THREE.Points(snowGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true }));
scene.add(snowSys);

// Gifts w/ Ribbons
const gifts = []; const particles = []; const sBoard = document.getElementById('score-board'); let score = 0;
function spawnGift(x, y, z) {
    const g = new THREE.Group();
    const b = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0xff0000 : 0x00ff00 }));
    g.add(b);
    const rib = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8 });
    g.add(new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 0.3), rib));
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.6, 1.6), rib));
    g.position.set(x, y, z); scene.add(g); gifts.push(g);
}
for (let i = 0; i < 100; i++) spawnGift(rand(-300, 300), rand(10, 80), rand(-300, 300));

// Explosion Logic
function explode(pos) {
    for (let i = 0; i < 15; i++) {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        p.position.copy(pos);
        p.userData.vel = new THREE.Vector3(rand(-0.6, 0.6), rand(-0.6, 0.6), rand(-0.6, 0.6));
        p.userData.life = 1.0; scene.add(p); particles.push(p);
    }
}

function rainbowExplosion(pos) {
    for (let i = 0; i < 200; i++) { // BIG EXPLOSION
        const color = new THREE.Color().setHSL(Math.random(), 1.0, 0.5);
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), new THREE.MeshBasicMaterial({ color: color }));
        p.position.copy(pos);
        // Explosion sphere shape
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const speed = rand(1, 3); // Fast
        p.userData.vel = new THREE.Vector3(
            speed * Math.sin(phi) * Math.cos(theta),
            speed * Math.sin(phi) * Math.sin(theta),
            speed * Math.cos(phi)
        );
        p.userData.life = 2.0; // Longer life
        scene.add(p); particles.push(p);
    }
}

// 7. LOOP
function animate() {
    requestAnimationFrame(animate);
    time += 0.2;

    try {
        const viewDir = new THREE.Vector3(Math.sin(viewYaw) * Math.cos(viewPitch), Math.sin(viewPitch), Math.cos(viewYaw) * Math.cos(viewPitch)).normalize();
        const acc = new THREE.Vector3();
        if (keys.w) acc.add(viewDir);
        if (keys.s) acc.sub(viewDir);
        if (acc.length() > 0) acc.normalize().multiplyScalar(keys.shift ? 0.08 : 0.035);

        velocity.add(acc);
        velocity.multiplyScalar(0.975);

        // Next Pos
        const nextPos = playerGroup.position.clone().add(velocity);

        // Collision (Safe)
        if (nextPos.y < 30) {
            for (let c of collidables) {
                if (Math.abs(c.x - nextPos.x) < c.r + 3 && Math.abs(c.z - nextPos.z) < c.r + 3) {
                    velocity.multiplyScalar(-0.6); break;
                }
            }
        }

        playerGroup.position.add(velocity);
        if (playerGroup.position.y < 1) playerGroup.position.y = 1;

        // Visuals
        if (velocity.length() > 0.01) {
            const tQ = new THREE.Quaternion();
            const m = new THREE.Matrix4();
            m.lookAt(playerGroup.position, playerGroup.position.clone().add(velocity), new THREE.Vector3(0, 1, 0));
            tQ.setFromRotationMatrix(m);
            const bank = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), (keys.a ? 0.7 : (keys.d ? -0.7 : 0)));
            tQ.multiply(bank);
            playerGroup.quaternion.slerp(tQ, 0.1);
        }

        // Camera
        const speed = velocity.length();
        const camPos = playerGroup.position.clone().sub(viewDir.clone().multiplyScalar(16 + speed * 10)).add(new THREE.Vector3(0, 5, 0));
        camera.position.lerp(camPos, 0.15);
        camera.lookAt(playerGroup.position.clone().add(viewDir.clone().multiplyScalar(20)));
        camera.fov = THREE.MathUtils.clamp(60 + speed * 8, 60, 85);
        camera.updateProjectionMatrix();

        // Effects
        reindeerLegs.forEach((l, i) => l.rotation.x = Math.sin(time + i) * 1.5 * Math.min(1, speed * 4));
        snowSys.position.copy(playerGroup.position);

        // Sleigh Trail (Yellow Particles)
        if (speed > 0.1) {
            for (let k = 0; k < 2; k++) { // 2 particles per frame
                const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
                // Emit from back of sleigh runners
                const offset = new THREE.Vector3((Math.random() - 0.5) * 1.5, 0.5, 2 + Math.random() * 2);
                offset.applyMatrix4(playerGroup.matrixWorld);
                p.position.copy(offset);
                p.userData.vel = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
                p.userData.life = 0.5; // Short trail
                scene.add(p); particles.push(p);
            }
        }

        // Gifts
        for (let i = gifts.length - 1; i >= 0; i--) {
            if (gifts[i].position.distanceTo(playerGroup.position) < 5) {
                explode(gifts[i].position); scene.remove(gifts[i]); gifts.splice(i, 1);
                score += 100; sBoard.innerText = "Score: " + score;
                if (score % 1000 === 0) triggerCelebration();
                spawnGift(rand(-300, 300), rand(10, 80), rand(-300, 300));
            }
        }
        // Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]; p.position.add(p.userData.vel); p.rotation.x += 0.1; p.userData.life -= 0.05; p.scale.setScalar(p.userData.life);
            if (p.userData.life <= 0) { scene.remove(p); particles.splice(i, 1); }
        }

        renderer.render(scene, camera);

    } catch (e) {
        console.error("Animate Error:", e);
    }
}
animate();

window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
