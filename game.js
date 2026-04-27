// STRANDED - Island Survival
// Move: Arrow Keys / WASD   |   Attack: SPACE   |   Sleep on the bag at night

const ZONES = {
    forest:  { x1:   0, x2: 400, y1:   0, y2: 300, name: 'Forest' },
    beach:   { x1: 400, x2: 800, y1:   0, y2: 300, name: 'Beach' },
    field:   { x1:   0, x2: 400, y1: 300, y2: 600, name: 'Field' },
    bearDen: { x1: 400, x2: 800, y1: 300, y2: 600, name: 'Bear Den' }
};

function zoneOf(x, y) {
    if (x < 400 && y < 300) return 'forest';
    if (x >= 400 && y < 300) return 'beach';
    if (x < 400 && y >= 300) return 'field';
    return 'bearDen';
}

function clampToZone(zone, x, y, pad) {
    const z = ZONES[zone];
    pad = pad == null ? 20 : pad;
    return {
        x: Math.max(z.x1 + pad, Math.min(z.x2 - pad, x)),
        y: Math.max(z.y1 + pad, Math.min(z.y2 - pad, y))
    };
}

function randomInZone(zone, pad) {
    const z = ZONES[zone];
    pad = pad == null ? 30 : pad;
    return {
        x: Phaser.Math.Between(z.x1 + pad, z.x2 - pad),
        y: Phaser.Math.Between(z.y1 + pad, z.y2 - pad)
    };
}

class BootScene extends Phaser.Scene {
    constructor() { super({ key: 'Boot' }); }

    create() {
        const bg = this.make.graphics({ x: 0, y: 0, add: false });
        const rng = new Phaser.Math.RandomDataGenerator(['stranded42']);

        // Forest (top-left)
        bg.fillStyle(0x2d6a2d);
        bg.fillRect(0, 0, 400, 300);
        for (let i = 0; i < 28; i++) {
            bg.fillStyle(rng.pick([0x1e5c1e, 0x3d8a3d, 0x255225, 0x1a4a1a]));
            bg.fillRect(rng.integerInRange(0, 380), rng.integerInRange(0, 280),
                        rng.integerInRange(20, 50), rng.integerInRange(15, 40));
        }

        // Beach (top-right)
        bg.fillStyle(0xefd9a3);
        bg.fillRect(400, 0, 400, 300);
        for (let i = 0; i < 18; i++) {
            bg.fillStyle(rng.pick([0xe8cc8a, 0xf5e3b3, 0xdcc081]));
            bg.fillRect(rng.integerInRange(400, 690), rng.integerInRange(0, 290),
                        rng.integerInRange(15, 30), rng.integerInRange(8, 18));
        }
        // Ocean strip on the right edge
        bg.fillStyle(0x4a90c8);
        bg.fillRect(720, 0, 80, 300);
        bg.fillStyle(0x6dabd6);
        bg.fillRect(720, 0, 30, 300);
        for (let i = 0; i < 14; i++) {
            bg.fillStyle(0xffffff, 0.7);
            bg.fillRect(rng.integerInRange(720, 790), rng.integerInRange(5, 290),
                        rng.integerInRange(8, 18), 2);
        }

        // Field (bottom-left)
        bg.fillStyle(0x88c270);
        bg.fillRect(0, 300, 400, 300);
        for (let i = 0; i < 22; i++) {
            bg.fillStyle(rng.pick([0x76b25e, 0x9bcd80, 0x6ea24f]));
            bg.fillRect(rng.integerInRange(0, 380), rng.integerInRange(300, 580),
                        rng.integerInRange(15, 35), rng.integerInRange(10, 20));
        }
        // Flowers
        for (let i = 0; i < 24; i++) {
            bg.fillStyle(rng.pick([0xf1c40f, 0xe74c3c, 0xffffff, 0xe0a0e0]));
            bg.fillCircle(rng.integerInRange(20, 380), rng.integerInRange(320, 580), 2);
        }

        // Bear Den (bottom-right) - rocky terrain
        bg.fillStyle(0x4a4a4a);
        bg.fillRect(400, 300, 400, 300);
        for (let i = 0; i < 28; i++) {
            bg.fillStyle(rng.pick([0x363636, 0x5a5a5a, 0x2e2e2e, 0x424242]));
            bg.fillRect(rng.integerInRange(400, 780), rng.integerInRange(300, 580),
                        rng.integerInRange(20, 50), rng.integerInRange(15, 35));
        }

        // Subtle borders between zones
        bg.fillStyle(0x000000, 0.25);
        bg.fillRect(398, 0, 4, 600);
        bg.fillRect(0, 298, 800, 4);

        bg.generateTexture('bg', 800, 600);
        bg.destroy();

        // Player - girl with long brown hair and red dress
        const p = this.make.graphics({ x: 0, y: 0, add: false });
        p.fillStyle(0x5d3a1a);
        p.fillEllipse(16, 14, 26, 22);
        p.fillRect(3, 12, 6, 28);
        p.fillRect(23, 12, 6, 28);
        p.fillEllipse(16, 40, 26, 8);
        p.fillStyle(0xf9d5a0);
        p.fillEllipse(16, 13, 13, 13);
        p.fillStyle(0x5d3a1a);
        p.fillRect(10, 7, 12, 3);
        p.fillRect(9, 9, 3, 3);
        p.fillRect(20, 9, 3, 3);
        p.fillStyle(0x000000);
        p.fillCircle(13, 14, 1.5);
        p.fillCircle(19, 14, 1.5);
        p.fillRect(14, 18, 4, 1);
        p.fillRect(13, 19, 1, 1);
        p.fillRect(18, 19, 1, 1);
        p.fillStyle(0xc0392b);
        p.fillRect(8, 20, 16, 18);
        p.fillRect(5, 21, 4, 9);
        p.fillRect(23, 21, 4, 9);
        p.fillStyle(0xf9d5a0);
        p.fillRect(11, 38, 4, 8);
        p.fillRect(17, 38, 4, 8);
        p.generateTexture('player', 32, 48);
        p.destroy();

        // Bear
        const b = this.make.graphics({ x: 0, y: 0, add: false });
        b.fillStyle(0x7b4a24);
        b.fillEllipse(24, 30, 36, 28);
        b.fillCircle(24, 13, 14);
        b.fillCircle(13, 3, 7);
        b.fillCircle(35, 3, 7);
        b.fillStyle(0x5a3518);
        b.fillCircle(13, 3, 4);
        b.fillCircle(35, 3, 4);
        b.fillStyle(0x000000);
        b.fillCircle(18, 11, 3);
        b.fillCircle(30, 11, 3);
        b.fillStyle(0x5a3518);
        b.fillEllipse(24, 18, 12, 8);
        b.fillStyle(0x000000);
        b.fillEllipse(24, 15, 7, 5);
        b.generateTexture('bear', 48, 44);
        b.destroy();

        // Rabbit
        const r = this.make.graphics({ x: 0, y: 0, add: false });
        r.fillStyle(0xc8cdd0);
        r.fillRect(5, 0, 6, 16);
        r.fillRect(17, 0, 6, 16);
        r.fillStyle(0xf1948a);
        r.fillRect(6, 2, 4, 12);
        r.fillRect(18, 2, 4, 12);
        r.fillStyle(0xd5d8dc);
        r.fillCircle(14, 22, 12);
        r.fillStyle(0xffffff);
        r.fillCircle(24, 26, 5);
        r.fillStyle(0xe74c3c);
        r.fillCircle(9, 18, 3);
        r.generateTexture('rabbit', 30, 34);
        r.destroy();

        // Crab - 1 HP beach creature
        const c = this.make.graphics({ x: 0, y: 0, add: false });
        c.fillStyle(0xc0392b);
        c.fillEllipse(16, 14, 22, 14);
        c.fillStyle(0x922b21);
        c.fillCircle(4, 10, 5);
        c.fillCircle(28, 10, 5);
        c.fillStyle(0x000000);
        c.fillCircle(13, 11, 1.5);
        c.fillCircle(19, 11, 1.5);
        c.fillStyle(0x922b21);
        c.fillRect(6, 16, 2, 6);
        c.fillRect(10, 18, 2, 5);
        c.fillRect(20, 18, 2, 5);
        c.fillRect(24, 16, 2, 6);
        c.generateTexture('crab', 32, 24);
        c.destroy();

        // Food (rabbit/crab meat)
        const f = this.make.graphics({ x: 0, y: 0, add: false });
        f.fillStyle(0x95a5a6);
        f.fillEllipse(18, 9, 32, 13);
        f.fillCircle(5, 8, 5);
        f.fillStyle(0xe74c3c);
        f.fillCircle(4, 7, 2);
        f.generateTexture('food', 36, 18);
        f.destroy();

        // Tree
        const t = this.make.graphics({ x: 0, y: 0, add: false });
        t.fillStyle(0x5d4037);
        t.fillRect(17, 36, 10, 16);
        t.fillStyle(0x1b5e20);
        t.fillCircle(22, 26, 20);
        t.fillStyle(0x2e7d32);
        t.fillCircle(14, 30, 14);
        t.fillCircle(30, 30, 14);
        t.fillStyle(0x388e3c);
        t.fillCircle(22, 18, 14);
        t.generateTexture('tree', 44, 52);
        t.destroy();

        // Sleeping bag
        const sb = this.make.graphics({ x: 0, y: 0, add: false });
        sb.fillStyle(0x2c3e50);
        sb.fillRoundedRect(2, 4, 44, 20, 8);
        sb.fillStyle(0xecf0f1);
        sb.fillRoundedRect(2, 4, 14, 20, 8);
        sb.fillStyle(0x34495e);
        sb.fillRect(22, 4, 3, 20);
        sb.fillRect(32, 4, 3, 20);
        sb.generateTexture('bag', 48, 28);
        sb.destroy();

        // Campfire (logs + flame)
        const cf = this.make.graphics({ x: 0, y: 0, add: false });
        cf.fillStyle(0x5d4037);
        cf.fillRect(4, 22, 28, 6);
        cf.fillStyle(0x3e2723);
        cf.fillRect(8, 23, 20, 2);
        cf.fillStyle(0xe74c3c);
        cf.fillTriangle(8, 22, 28, 22, 18, 4);
        cf.fillStyle(0xf39c12);
        cf.fillTriangle(12, 22, 24, 22, 18, 8);
        cf.fillStyle(0xf1c40f);
        cf.fillTriangle(15, 22, 21, 22, 18, 14);
        cf.generateTexture('fire', 36, 32);
        cf.destroy();

        // Explorer (visiting NPC, day 20)
        const e = this.make.graphics({ x: 0, y: 0, add: false });
        e.fillStyle(0xf9d5a0);
        e.fillCircle(16, 12, 8);
        e.fillStyle(0x000000);
        e.fillCircle(13, 13, 1.5);
        e.fillCircle(19, 13, 1.5);
        e.fillRect(14, 17, 4, 1);
        e.fillStyle(0x6b4a2a);             // hat brim
        e.fillRect(5, 4, 22, 3);
        e.fillRect(10, 0, 12, 5);
        e.fillStyle(0xa0824a);             // khaki shirt
        e.fillRect(8, 20, 16, 16);
        e.fillStyle(0x6b4a2a);             // backpack strap
        e.fillRect(8, 20, 3, 16);
        e.fillRect(21, 20, 3, 16);
        e.fillStyle(0x4a3a2a);             // pants
        e.fillRect(10, 36, 5, 10);
        e.fillRect(17, 36, 5, 10);
        e.fillStyle(0x222222);             // boots
        e.fillRect(9, 44, 7, 4);
        e.fillRect(16, 44, 7, 4);
        e.generateTexture('explorer', 32, 48);
        e.destroy();

        // Helicopter
        const h = this.make.graphics({ x: 0, y: 0, add: false });
        h.fillStyle(0x2c3e50);
        h.fillRoundedRect(20, 28, 70, 24, 6);
        h.fillRect(82, 36, 32, 6);
        h.fillRect(108, 30, 8, 18);
        h.fillStyle(0x6dabd6);
        h.fillRect(28, 32, 22, 14);
        h.fillStyle(0x111111);
        h.fillRect(8, 22, 100, 3);
        h.fillStyle(0x444444);
        h.fillRect(52, 18, 4, 10);
        h.fillRect(28, 56, 50, 3);
        h.fillRect(28, 52, 3, 6);
        h.fillRect(75, 52, 3, 6);
        h.generateTexture('helicopter', 120, 60);
        h.destroy();

        // Attack flash
        const a = this.make.graphics({ x: 0, y: 0, add: false });
        a.fillStyle(0xf1c40f, 0.85);
        a.fillCircle(18, 18, 17);
        a.fillStyle(0xffffff, 0.7);
        a.fillCircle(18, 18, 9);
        a.generateTexture('slash', 36, 36);
        a.destroy();

        this.scene.start('Game');
    }
}

class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'Game' }); }

    init() {
        this.lives             = 3;
        this.score             = 0;
        this.hunger            = 100;
        this.facing            = 'right';
        this.attackCooldown    = 0;
        this.hitCooldown       = 0;
        this.dead              = false;
        this.day               = 1;
        this.isNight           = false;
        this.dayMs             = 0;
        this.dayLengthMs       = 4 * 60 * 1000;   // 4 minutes between nights
        this.nightLengthMs     = 3 * 1000;        // 3 second night
        this.explorerSpawned   = false;
        this.helicopterTriggered = false;
    }

    create() {
        this.add.image(400, 300, 'bg');

        // Trees only in forest
        const forestTrees = [
            [55, 60], [170, 80], [310, 50], [60, 180], [200, 220],
            [330, 240], [275, 130], [120, 270], [380, 130], [240, 60]
        ];
        forestTrees.forEach(([x, y]) => this.add.image(x, y, 'tree').setDepth(1));

        // Rocks decorate the bear den
        const denDeco = this.add.graphics().setDepth(1);
        const rockSpots = [
            [450, 350], [600, 380], [750, 400], [500, 480], [680, 530],
            [560, 560], [780, 320], [430, 420], [720, 460]
        ];
        rockSpots.forEach(([x, y]) => {
            denDeco.fillStyle(0x2a2a2a);
            denDeco.fillCircle(x, y, 14);
            denDeco.fillStyle(0x5a5a5a);
            denDeco.fillCircle(x - 4, y - 4, 7);
        });

        // Sleeping bag and campfire (Field)
        this.bag = this.physics.add.staticImage(120, 460, 'bag').setDepth(2);
        this.fire = this.add.image(280, 460, 'fire').setDepth(2);
        this.tweens.add({
            targets: this.fire, scaleX: 1.1, scaleY: 1.05,
            duration: 350, yoyo: true, repeat: -1
        });

        // Player starts in the field, the safe zone
        this.player = this.physics.add.sprite(200, 380, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(3);

        // Animal groups
        this.bears   = this.physics.add.group();
        this.rabbits = this.physics.add.group();
        this.crabs   = this.physics.add.group();
        this.foods   = this.physics.add.group();

        // Initial population
        for (let i = 0; i < 4; i++) this.spawnRabbit();
        for (let i = 0; i < 3; i++) this.spawnCrab();
        this.spawnBear();
        this.spawnBear();

        // Periodic spawners
        this.time.addEvent({ delay: 18000, callback: this.spawnBear,   callbackScope: this, loop: true });
        this.time.addEvent({ delay: 22000, callback: this.spawnRabbit, callbackScope: this, loop: true });
        this.time.addEvent({ delay: 14000, callback: this.spawnCrab,   callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1500,  callback: this.tickHunger,  callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1000,  callback: () => { if (!this.dead) { this.score++; this.updateScore(); } }, loop: true });

        // Overlaps
        this.physics.add.overlap(this.player, this.bears, this.bearAttacksPlayer, null, this);
        this.physics.add.overlap(this.player, this.foods, this.playerEatsFood,    null, this);
        this.physics.add.overlap(this.player, this.bag,   this.tryToSleep,        null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up:    Phaser.Input.Keyboard.KeyCodes.W,
            left:  Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down:  Phaser.Input.Keyboard.KeyCodes.S
        });

        this.hpBars = this.add.graphics().setDepth(5);
        this.nightOverlay = this.add.graphics().setDepth(7);

        this.buildHUD();

        this.showMsg('You are stranded.\nSurvive 50 days for rescue.', '#f9e79f', 3500);
    }

    // ── Spawning ────────────────────────────────────────────────────────────

    spawnBear() {
        if (this.dead) return;
        if (this.bears.countActive() >= Math.min(2 + Math.floor(this.day / 6), 5)) return;
        const p = randomInZone('bearDen', 40);
        const bear = this.bears.create(p.x, p.y, 'bear');
        bear.hp = 5;
        bear.wanderTarget = randomInZone('bearDen', 40);
        bear.setDepth(3);
    }

    spawnRabbit() {
        if (this.dead) return;
        if (this.rabbits.countActive() >= 8) return;
        const p = randomInZone('forest', 30);
        const rabbit = this.rabbits.create(p.x, p.y, 'rabbit');
        rabbit.hp = 3;
        rabbit.hopTimer = 0;
        rabbit.setDepth(3);
    }

    spawnCrab() {
        if (this.dead) return;
        if (this.crabs.countActive() >= 6) return;
        const p = randomInZone('beach', 30);
        const crab = this.crabs.create(p.x, p.y, 'crab');
        crab.hp = 1;
        crab.wanderTimer = 0;
        crab.setDepth(3);
    }

    // ── Hunger ──────────────────────────────────────────────────────────────

    tickHunger() {
        if (this.dead || this.isNight) return;
        this.hunger = Math.max(0, this.hunger - 1);
        this.redrawHungerBar();
        if (this.hunger <= 0) {
            this.lives--;
            this.hunger = 60;
            this.redrawHungerBar();
            this.updateLives();
            this.showMsg('You are starving!  -1 Life', '#e74c3c', 2000);
            if (this.lives <= 0) this.endGame();
        }
    }

    // ── Attack ──────────────────────────────────────────────────────────────

    doAttack() {
        if (this.attackCooldown > 0) return;
        this.attackCooldown = 600;

        const off = { right: [50, 0], left: [-50, 0], up: [0, -50], down: [0, 50] };
        const [ox, oy] = off[this.facing];
        const hx = this.player.x + ox;
        const hy = this.player.y + oy;
        const RANGE = 68;

        const fx = this.add.image(hx, hy, 'slash').setDepth(6).setAlpha(0.9);
        this.tweens.add({ targets: fx, alpha: 0, scaleX: 1.6, scaleY: 1.6, duration: 220, onComplete: () => fx.destroy() });

        this.bears.getChildren().forEach(bear => {
            if (!bear.active) return;
            if (Phaser.Math.Distance.Between(hx, hy, bear.x, bear.y) < RANGE + 5) {
                bear.hp--;
                this.floatText(bear.x, bear.y - 24, 'HIT  ' + bear.hp + '/5 HP', '#ffff00');
                if (bear.hp <= 0) {
                    bear.destroy();
                    this.score += 30;
                    this.updateScore();
                    this.floatText(bear.x, bear.y - 30, 'Bear down! +30', '#f1c40f');
                }
            }
        });

        this.rabbits.getChildren().forEach(rabbit => {
            if (!rabbit.active) return;
            if (Phaser.Math.Distance.Between(hx, hy, rabbit.x, rabbit.y) < RANGE) {
                rabbit.hp--;
                this.floatText(rabbit.x, rabbit.y - 18, 'HIT  ' + rabbit.hp + '/3 HP', '#ffff00');
                if (rabbit.hp <= 0) {
                    const food = this.foods.create(rabbit.x, rabbit.y, 'food');
                    food.foodValue = 40;
                    food.setDepth(2);
                    food.body.allowGravity = false;
                    rabbit.destroy();
                    this.score += 5;
                    this.updateScore();
                    this.floatText(rabbit.x, rabbit.y, 'Walk over to eat!', '#2ecc71');
                }
            }
        });

        this.crabs.getChildren().forEach(crab => {
            if (!crab.active) return;
            if (Phaser.Math.Distance.Between(hx, hy, crab.x, crab.y) < RANGE) {
                const food = this.foods.create(crab.x, crab.y, 'food');
                food.foodValue = 20;
                food.setDepth(2);
                food.body.allowGravity = false;
                crab.destroy();
                this.score += 3;
                this.updateScore();
                this.floatText(crab.x, crab.y, 'Crab! Walk over to eat.', '#f39c12');
            }
        });
    }

    // ── Collision callbacks ─────────────────────────────────────────────────

    bearAttacksPlayer(player, bear) {
        if (this.hitCooldown > 0 || this.dead) return;
        this.hitCooldown = 1500;
        this.time.delayedCall(1500, () => { this.hitCooldown = 0; });
        this.lives--;
        this.updateLives();
        this.cameras.main.shake(350, 0.015);
        this.showMsg('BEAR ATTACK!  -1 Life', '#e74c3c', 1800);
        if (this.lives <= 0) this.endGame();
    }

    playerEatsFood(player, food) {
        const gain = food.foodValue || 40;
        const before = this.hunger;
        this.hunger = Math.min(100, this.hunger + gain);
        this.redrawHungerBar();
        food.destroy();
        this.floatText(player.x, player.y - 20, '+' + (this.hunger - before) + ' hunger', '#2ecc71');
        this.score += 10;
        this.updateScore();
    }

    tryToSleep(player, bag) {
        if (!this.isNight) return;
        if (this.hunger >= 100) return;
        this.hunger = 100;
        this.redrawHungerBar();
        this.floatText(player.x, player.y - 30, 'Z z z z ...', '#aed6f1');
        this.score += 5;
        this.updateScore();
    }

    // ── Day/Night ───────────────────────────────────────────────────────────

    triggerNight() {
        if (this.dead || this.isNight) return;
        this.isNight = true;
        this.nightOverlay.clear();
        this.nightOverlay.fillStyle(0x000033, 0.55);
        this.nightOverlay.fillRect(0, 50, 800, 550);
        this.showMsg('Night falls. Sleep at the bag!', '#aed6f1', 1200);
    }

    endNight() {
        this.isNight = false;
        this.nightOverlay.clear();
        this.dayMs = 0;
        this.day++;
        this.updateDay();
        this.showMsg('Day ' + this.day, '#f9e79f', 1100);
        if (this.day === 20 && !this.explorerSpawned) this.spawnExplorer();
        if (this.day >= 50 && !this.helicopterTriggered) this.startRescue();
    }

    spawnExplorer() {
        this.explorerSpawned = true;
        const exp = this.physics.add.sprite(-30, 480, 'explorer');
        exp.setDepth(3);
        exp.setVelocityX(60);
        this.showMsg('An explorer landed!\nThey set off to find help.', '#a3e4d7', 3500);
        this.time.delayedCall(15000, () => { if (exp.active) exp.setVelocityX(120); });
        this.time.delayedCall(35000, () => { if (exp.active) exp.destroy(); });
    }

    startRescue() {
        this.helicopterTriggered = true;
        this.showMsg('A helicopter is coming!', '#f9e79f', 2500);
        const heli = this.add.image(900, 180, 'helicopter').setDepth(8);
        this.tweens.add({
            targets: heli, x: 400, duration: 5000, ease: 'Sine.easeInOut',
            onComplete: () => {
                this.time.delayedCall(1500, () => {
                    this.scene.start('Victory', { score: this.score, day: this.day });
                });
            }
        });
    }

    // ── HUD ─────────────────────────────────────────────────────────────────

    buildHUD() {
        const hud = this.add.graphics().setScrollFactor(0).setDepth(9);
        hud.fillStyle(0x000000, 0.55);
        hud.fillRect(0, 0, 800, 50);

        this.add.text(12, 7, 'HUNGER', {
            fontSize: '13px', color: '#ffffff',
            fontFamily: 'Arial', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(12);

        const barBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        barBg.fillStyle(0x333333);
        barBg.fillRect(10, 22, 204, 18);

        this.hungerBar = this.add.graphics().setScrollFactor(0).setDepth(11);
        this.redrawHungerBar();

        this.livesText = this.add.text(230, 12, 'Lives: 3', {
            fontSize: '17px', color: '#e74c3c', fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.dayText = this.add.text(345, 12, 'Day 1', {
            fontSize: '17px', color: '#f9e79f', fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.zoneText = this.add.text(440, 12, 'Field', {
            fontSize: '17px', color: '#aed6f1', fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.scoreText = this.add.text(790, 12, 'Score: 0', {
            fontSize: '17px', color: '#f1c40f', fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(10);

        // Faint zone labels in-world
        const labelStyle = {
            fontSize: '14px', color: '#ffffff',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        };
        this.add.text(200, 60,  'FOREST',   labelStyle).setOrigin(0.5).setAlpha(0.55).setDepth(2);
        this.add.text(600, 60,  'BEACH',    labelStyle).setOrigin(0.5).setAlpha(0.55).setDepth(2);
        this.add.text(200, 312, 'FIELD',    labelStyle).setOrigin(0.5).setAlpha(0.55).setDepth(2);
        this.add.text(600, 312, 'BEAR DEN', labelStyle).setOrigin(0.5).setAlpha(0.55).setDepth(2);

        this.add.text(400, 596, 'Move: WASD/Arrows  |  SPACE Attack  |  Sleep on the bag at night', {
            fontSize: '13px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(10);

        this.msgDisplay = this.add.text(400, 285, '', {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 6, align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);
    }

    redrawHungerBar() {
        this.hungerBar.clear();
        const pct = this.hunger / 100;
        const color = pct > 0.5 ? 0x27ae60 : pct > 0.25 ? 0xf39c12 : 0xe74c3c;
        this.hungerBar.fillStyle(color);
        this.hungerBar.fillRect(11, 23, Math.floor(202 * pct), 16);
    }

    updateLives() { this.livesText.setText('Lives: ' + this.lives); }
    updateScore() { this.scoreText.setText('Score: ' + this.score); }
    updateDay()   { this.dayText.setText('Day ' + this.day); }

    showMsg(text, color, duration) {
        this.msgDisplay.setText(text).setColor(color || '#ffffff');
        if (duration) this.time.delayedCall(duration, () => { if (this.msgDisplay) this.msgDisplay.setText(''); });
    }

    floatText(x, y, text, color) {
        const t = this.add.text(x, y, text, {
            fontSize: '17px', color: color, fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(8);
        this.tweens.add({ targets: t, y: y - 55, alpha: 0, duration: 1100, onComplete: () => t.destroy() });
    }

    endGame() {
        this.dead = true;
        this.physics.pause();
        this.time.delayedCall(800, () => this.scene.start('GameOver', { score: this.score, day: this.day }));
    }

    // ── Main loop ────────────────────────────────────────────────────────────

    update(time, delta) {
        if (this.dead) return;

        this.attackCooldown = Math.max(0, this.attackCooldown - delta);
        this.hitCooldown    = Math.max(0, this.hitCooldown    - delta);

        // Day/night clock
        if (!this.isNight) {
            this.dayMs += delta;
            if (this.dayMs >= this.dayLengthMs) {
                this.triggerNight();
                this.time.delayedCall(this.nightLengthMs, () => this.endNight());
            }
        }

        // Movement
        const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
        const right = this.cursors.right.isDown || this.wasd.right.isDown;
        const up    = this.cursors.up.isDown    || this.wasd.up.isDown;
        const down  = this.cursors.down.isDown  || this.wasd.down.isDown;

        let vx = 0, vy = 0;
        if (left)  { vx = -160; this.facing = 'left';  this.player.setFlipX(true);  }
        if (right) { vx =  160; this.facing = 'right'; this.player.setFlipX(false); }
        if (up)    { vy = -160; this.facing = 'up';   }
        if (down)  { vy =  160; this.facing = 'down'; }
        if (vx && vy) { vx *= 0.707; vy *= 0.707; }
        this.player.setVelocity(vx, vy);

        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) this.doAttack();

        // Zone label
        const playerZone = zoneOf(this.player.x, this.player.y);
        if (this.zoneText.text !== ZONES[playerZone].name) {
            this.zoneText.setText(ZONES[playerZone].name);
        }

        // Bear AI: chase only when player is in den; clamp inside den
        const playerInDen = playerZone === 'bearDen';
        this.bears.getChildren().forEach(bear => {
            if (!bear.active) return;
            if (playerInDen) {
                const angle = Phaser.Math.Angle.Between(bear.x, bear.y, this.player.x, this.player.y);
                bear.setVelocity(Math.cos(angle) * 70, Math.sin(angle) * 70);
                bear.setFlipX(this.player.x < bear.x);
            } else {
                if (!bear.wanderTarget ||
                    Phaser.Math.Distance.Between(bear.x, bear.y, bear.wanderTarget.x, bear.wanderTarget.y) < 20) {
                    bear.wanderTarget = randomInZone('bearDen', 40);
                }
                const angle = Phaser.Math.Angle.Between(bear.x, bear.y, bear.wanderTarget.x, bear.wanderTarget.y);
                bear.setVelocity(Math.cos(angle) * 30, Math.sin(angle) * 30);
                bear.setFlipX(bear.wanderTarget.x < bear.x);
            }
            const c = clampToZone('bearDen', bear.x, bear.y, 22);
            bear.x = c.x; bear.y = c.y;
        });

        // Rabbit AI: confined to forest, hops around, flees if player nearby
        const playerInForest = playerZone === 'forest';
        this.rabbits.getChildren().forEach(rabbit => {
            if (!rabbit.active) return;
            rabbit.hopTimer = (rabbit.hopTimer || 0) - delta;
            const dist = Phaser.Math.Distance.Between(rabbit.x, rabbit.y, this.player.x, this.player.y);
            if (playerInForest && dist < 130) {
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, rabbit.x, rabbit.y);
                rabbit.setVelocity(Math.cos(angle) * 150, Math.sin(angle) * 150);
                rabbit.hopTimer = 700;
            } else if (rabbit.hopTimer <= 0) {
                const angle = Math.random() * Math.PI * 2;
                rabbit.setVelocity(Math.cos(angle) * 80, Math.sin(angle) * 80);
                rabbit.hopTimer = Phaser.Math.Between(900, 2400);
            }
            const c = clampToZone('forest', rabbit.x, rabbit.y, 18);
            rabbit.x = c.x; rabbit.y = c.y;
        });

        // Crab AI: scuttle randomly on beach
        this.crabs.getChildren().forEach(crab => {
            if (!crab.active) return;
            crab.wanderTimer = (crab.wanderTimer || 0) - delta;
            if (crab.wanderTimer <= 0) {
                const angle = Math.random() * Math.PI * 2;
                crab.setVelocity(Math.cos(angle) * 50, Math.sin(angle) * 50);
                crab.wanderTimer = Phaser.Math.Between(800, 2000);
            }
            const c = clampToZone('beach', crab.x, crab.y, 16);
            crab.x = c.x; crab.y = c.y;
        });

        // HP bars
        this.hpBars.clear();
        this.bears.getChildren().forEach(bear => {
            if (!bear.active) return;
            this.hpBars.fillStyle(0x111111);
            this.hpBars.fillRect(bear.x - 22, bear.y - 38, 44, 8);
            this.hpBars.fillStyle(0xe74c3c);
            this.hpBars.fillRect(bear.x - 21, bear.y - 37, Math.floor((bear.hp / 5) * 42), 6);
        });
        this.rabbits.getChildren().forEach(rabbit => {
            if (!rabbit.active) return;
            this.hpBars.fillStyle(0x111111);
            this.hpBars.fillRect(rabbit.x - 16, rabbit.y - 30, 32, 7);
            this.hpBars.fillStyle(0x27ae60);
            this.hpBars.fillRect(rabbit.x - 15, rabbit.y - 29, Math.floor((rabbit.hp / 3) * 30), 5);
        });
    }
}

class GameOverScene extends Phaser.Scene {
    constructor() { super({ key: 'GameOver' }); }

    init(data) {
        this.finalScore = data.score || 0;
        this.day        = data.day   || 1;
    }

    create() {
        this.add.image(400, 300, 'bg');

        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.80);
        panel.fillRoundedRect(200, 130, 400, 340, 16);
        panel.lineStyle(3, 0xe74c3c);
        panel.strokeRoundedRect(200, 130, 400, 340, 16);

        this.add.text(400, 180, 'YOU DIED', {
            fontSize: '54px', color: '#e74c3c',
            fontFamily: 'Arial Black, Impact, Arial',
            stroke: '#000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(400, 250, 'Survived ' + this.day + ' day' + (this.day === 1 ? '' : 's'), {
            fontSize: '24px', color: '#ecf0f1',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        this.add.text(400, 295, 'Score: ' + this.finalScore, {
            fontSize: '32px', color: '#f1c40f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        const msg =
            this.day >= 40 ? 'So close to rescue!'    :
            this.day >= 20 ? 'You met the explorer!'  :
            this.day >= 10 ? 'Keep pushing through!'  :
                             'Watch out for bears!';

        this.add.text(400, 345, msg, {
            fontSize: '20px', color: '#2ecc71',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        const btn = this.add.text(400, 410, '  PLAY AGAIN  ', {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial',
            stroke: '#000', strokeThickness: 4,
            backgroundColor: '#922b21', padding: { x: 16, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({ targets: btn, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });
        btn.on('pointerdown', () => this.scene.start('Game'));
        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
    }
}

class VictoryScene extends Phaser.Scene {
    constructor() { super({ key: 'Victory' }); }

    init(data) {
        this.finalScore = data.score || 0;
        this.day        = data.day   || 50;
    }

    create() {
        this.add.image(400, 300, 'bg');

        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.82);
        panel.fillRoundedRect(180, 120, 440, 360, 16);
        panel.lineStyle(3, 0x2ecc71);
        panel.strokeRoundedRect(180, 120, 440, 360, 16);

        this.add.text(400, 170, 'RESCUED!', {
            fontSize: '52px', color: '#2ecc71',
            fontFamily: 'Arial Black, Impact, Arial',
            stroke: '#000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(400, 235, 'Survived ' + this.day + ' days', {
            fontSize: '24px', color: '#ecf0f1',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        this.add.text(400, 280, 'Score: ' + this.finalScore, {
            fontSize: '32px', color: '#f1c40f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        const heli = this.add.image(400, 355, 'helicopter');
        this.tweens.add({ targets: heli, y: 350, duration: 600, yoyo: true, repeat: -1 });

        const btn = this.add.text(400, 425, '  PLAY AGAIN  ', {
            fontSize: '28px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial',
            stroke: '#000', strokeThickness: 4,
            backgroundColor: '#1e8449', padding: { x: 16, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({ targets: btn, alpha: 0.3, duration: 600, yoyo: true, repeat: -1 });
        btn.on('pointerdown', () => this.scene.start('Game'));
        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [BootScene, GameScene, GameOverScene, VictoryScene]
};

new Phaser.Game(config);
