// STRANDED - Escape from Crash Island!
// A Phaser 3 platformer game

// ─── BOOT SCENE (draws all textures in code, no image files needed) ──────────
class BootScene extends Phaser.Scene {
    constructor() { super({ key: 'Boot' }); }

    create() {
        this.makeSky();
        this.makeGround();
        this.makeSand();
        this.makePlayer();
        this.makeFlare();
        this.makeCrab();
        this.makeHelicopter();
        this.makeDot();
        this.scene.start('Title');
    }

    makeSky() {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Blue sky gradient
        g.fillGradientStyle(0x87ceeb, 0x87ceeb, 0x4a9eda, 0x2176ae, 1);
        g.fillRect(0, 0, 800, 600);
        // Clouds
        const drawCloud = (x, y, s) => {
            g.fillStyle(0xffffff, 0.85);
            g.fillCircle(x, y, 22 * s);
            g.fillCircle(x + 28 * s, y - 8 * s, 18 * s);
            g.fillCircle(x - 28 * s, y - 4 * s, 16 * s);
            g.fillCircle(x + 10 * s, y - 18 * s, 20 * s);
        };
        drawCloud(120, 80,  1);
        drawCloud(400, 60,  1.2);
        drawCloud(650, 95,  0.9);
        drawCloud(260, 120, 0.7);
        // Ocean horizon
        g.fillGradientStyle(0x1e90ff, 0x1e90ff, 0x006994, 0x004f7c, 1);
        g.fillRect(0, 460, 800, 140);
        // Waves (light lines)
        g.lineStyle(2, 0x5eb8ff, 0.4);
        for (let wx = 0; wx < 800; wx += 60) {
            g.beginPath();
            g.arc(wx + 20, 480, 18, 0, Math.PI, false);
            g.strokePath();
            g.beginPath();
            g.arc(wx + 50, 500, 14, 0, Math.PI, false);
            g.strokePath();
        }
        g.generateTexture('background', 800, 600);
        g.destroy();
    }

    makeGround() {
        // Grassy cliff edge tile 32x32
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x8b4513); // brown dirt
        g.fillRect(0, 0, 32, 32);
        g.fillStyle(0x5a8a00); // dark green grass
        g.fillRect(0, 0, 32, 9);
        g.fillStyle(0x76b800); // bright grass on top
        g.fillRect(1, 1, 8, 4);
        g.fillRect(15, 2, 7, 3);
        g.fillStyle(0x6b3410); // dirt details
        g.fillRect(5, 12, 4, 4);
        g.fillRect(18, 15, 5, 3);
        g.fillRect(24, 10, 4, 5);
        g.generateTexture('ground', 32, 32);
        g.destroy();
    }

    makeSand() {
        // Sandy beach tile 32x32 (used for ground row near ocean)
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf4d03f);
        g.fillRect(0, 0, 32, 32);
        g.fillStyle(0xe8c32a);
        g.fillRect(3, 5, 5, 3);
        g.fillRect(14, 10, 4, 4);
        g.fillRect(24, 6, 4, 3);
        g.fillRect(8, 18, 6, 3);
        g.fillRect(20, 20, 5, 4);
        g.generateTexture('sand', 32, 32);
        g.destroy();
    }

    makePlayer() {
        // Crash survivor: torn shirt, shorts, messy hair — 30x48
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Hair (messy brown)
        g.fillStyle(0x6b3a2a);
        g.fillCircle(15, 8, 10);
        g.fillRect(6, 5, 4, 6);    // tuft left
        g.fillRect(20, 4, 5, 5);   // tuft right
        // Face (skin tone)
        g.fillStyle(0xf0c08a);
        g.fillCircle(15, 13, 9);
        // Eyes
        g.fillStyle(0x2c2c2c);
        g.fillCircle(11, 12, 2);
        g.fillCircle(19, 12, 2);
        // Mouth (determined smile)
        g.fillStyle(0xc0705a);
        g.fillRect(12, 17, 6, 2);
        // Torn shirt (blue, ragged edges)
        g.fillStyle(0x2980b9);
        g.fillRect(6, 22, 18, 16);
        // Torn strips on shirt
        g.fillStyle(0x1a5e8a);
        g.fillRect(6, 33, 3, 5);
        g.fillRect(21, 35, 3, 3);
        // Shorts (khaki)
        g.fillStyle(0xc8a96e);
        g.fillRect(7, 37, 16, 8);
        // Legs
        g.fillStyle(0xf0c08a);
        g.fillRect(7, 44, 6, 8);
        g.fillRect(17, 44, 6, 8);
        // Shoes (dark, worn)
        g.fillStyle(0x3d2b1f);
        g.fillRoundedRect(5, 49, 9, 5, 2);
        g.fillRoundedRect(16, 49, 9, 5, 2);
        g.generateTexture('player', 30, 54);
        g.destroy();
    }

    makeFlare() {
        // Orange signal flare: 28x28
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Glow
        g.fillStyle(0xff6b00, 0.2);
        g.fillCircle(14, 14, 14);
        g.fillStyle(0xff6b00, 0.3);
        g.fillCircle(14, 14, 10);
        // Flare body (metal cylinder)
        g.fillStyle(0xc0392b);
        g.fillRoundedRect(9, 10, 10, 16, 3);
        // Top cap
        g.fillStyle(0x922b21);
        g.fillRect(9, 10, 10, 4);
        // Burning flame tip
        g.fillStyle(0xff6b00);
        g.fillTriangle(10, 10, 18, 10, 14, 2);
        g.fillStyle(0xffcc00);
        g.fillTriangle(12, 10, 16, 10, 14, 5);
        // Smoke puff
        g.fillStyle(0xcccccc, 0.5);
        g.fillCircle(14, 1, 3);
        g.generateTexture('flare', 28, 28);
        g.destroy();
    }

    makeCrab() {
        // Red island crab: 36x28
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Body (round, red)
        g.fillStyle(0xc0392b);
        g.fillEllipse(18, 18, 22, 16);
        // Shell highlight
        g.fillStyle(0xe74c3c);
        g.fillEllipse(18, 15, 14, 8);
        // Claws (big pincers)
        g.fillStyle(0xc0392b);
        g.fillEllipse(5,  14, 10, 7);  // left claw body
        g.fillEllipse(31, 14, 10, 7);  // right claw body
        // Pincer tips
        g.fillStyle(0x922b21);
        g.fillEllipse(2,  10, 6, 4);   // left tip
        g.fillEllipse(34, 10, 6, 4);   // right tip
        // Legs (3 per side)
        g.lineStyle(2, 0x922b21);
        // Left legs
        g.beginPath(); g.moveTo(8, 18); g.lineTo(2, 24); g.strokePath();
        g.beginPath(); g.moveTo(10, 21); g.lineTo(5, 28); g.strokePath();
        g.beginPath(); g.moveTo(13, 23); g.lineTo(9, 28); g.strokePath();
        // Right legs
        g.beginPath(); g.moveTo(28, 18); g.lineTo(34, 24); g.strokePath();
        g.beginPath(); g.moveTo(26, 21); g.lineTo(31, 28); g.strokePath();
        g.beginPath(); g.moveTo(23, 23); g.lineTo(27, 28); g.strokePath();
        // Eyes (stalks + pupils)
        g.fillStyle(0xffffff);
        g.fillCircle(13, 10, 4);
        g.fillCircle(23, 10, 4);
        g.fillStyle(0x000000);
        g.fillCircle(13, 10, 2);
        g.fillCircle(23, 10, 2);
        g.generateTexture('crab', 36, 28);
        g.destroy();
    }

    makeHelicopter() {
        // Rescue helicopter: 70x40
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Body
        g.fillStyle(0xe74c3c);       // red rescue helicopter
        g.fillEllipse(32, 24, 52, 26);
        // Cockpit (glass bubble)
        g.fillStyle(0x5dade2, 0.85);
        g.fillEllipse(16, 22, 24, 20);
        g.fillStyle(0xaed6f1, 0.5);
        g.fillEllipse(13, 19, 12, 10);
        // Tail boom
        g.fillStyle(0xc0392b);
        g.fillRect(52, 20, 18, 8);
        // Tail fin
        g.fillTriangle(66, 20, 70, 14, 70, 28);
        // Main rotor (spinning blades shown as lines)
        g.lineStyle(4, 0x2c3e50);
        g.beginPath(); g.moveTo(4, 8); g.lineTo(60, 8); g.strokePath();
        g.lineStyle(3, 0x2c3e50);
        g.beginPath(); g.moveTo(32, 2); g.lineTo(32, 14); g.strokePath();
        // Rotor hub
        g.fillStyle(0x2c3e50);
        g.fillCircle(32, 8, 4);
        // Tail rotor
        g.lineStyle(2, 0x2c3e50);
        g.beginPath(); g.moveTo(68, 16); g.lineTo(68, 28); g.strokePath();
        // Rescue rope/hook
        g.lineStyle(2, 0xf0f0f0);
        g.beginPath(); g.moveTo(30, 37); g.lineTo(30, 46); g.strokePath();
        g.fillStyle(0xf0f0f0);
        g.fillRect(27, 46, 6, 3);
        g.generateTexture('helicopter', 70, 50);
        g.destroy();
    }

    makeDot() {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xff6b00);
        g.fillCircle(4, 4, 4);
        g.generateTexture('dot', 8, 8);
        g.destroy();
    }
}

// ─── TITLE SCENE ─────────────────────────────────────────────────────────────
class TitleScene extends Phaser.Scene {
    constructor() { super({ key: 'Title' }); }

    create() {
        this.add.image(400, 300, 'background');

        // Floating helicopter
        const heli = this.add.image(400, 110, 'helicopter').setScale(1.6);
        this.tweens.add({
            targets: heli, y: 95, duration: 2000,
            yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });
        // Rotor spin effect (just bob the helicopter a tiny bit side to side too)
        this.tweens.add({
            targets: heli, angle: -2,
            duration: 600, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        // Title
        this.add.text(400, 175, 'STRANDED', {
            fontSize: '76px', color: '#ffffff',
            fontFamily: 'Arial Black, Impact, Arial', fontStyle: 'bold',
            stroke: '#1a5276', strokeThickness: 10
        }).setOrigin(0.5);

        this.add.text(400, 255, 'Escape from Crash Island!', {
            fontSize: '26px', color: '#f9e79f',
            fontFamily: 'Arial', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        // Story box
        const box = this.add.graphics();
        box.fillStyle(0x000000, 0.55);
        box.fillRoundedRect(180, 285, 440, 160, 12);
        box.lineStyle(2, 0xe67e22);
        box.strokeRoundedRect(180, 285, 440, 160, 12);

        this.add.text(400, 298, [
            'Your plane crashed on a deserted island!',
            'Collect 10 signal flares to light the',
            'rescue fire and call the helicopter!',
            '',
            'Arrow Keys or WASD  =  Move',
            'UP  /  W  /  SPACE  =  Jump',
            'Watch out for the crabs!'
        ], {
            fontSize: '17px', color: '#dfe6e9',
            fontFamily: 'Arial', align: 'center', lineSpacing: 5
        }).setOrigin(0.5, 0);

        // Play button
        const playBtn = this.add.text(400, 490, '  PRESS SPACE TO START  ', {
            fontSize: '30px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 5,
            backgroundColor: '#c0392b', padding: { x: 14, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: playBtn, alpha: 0.2,
            duration: 650, yoyo: true, repeat: -1
        });

        // Decorative flares along the bottom
        for (let i = 0; i < 6; i++) {
            const fx = 80 + i * 130;
            const fl = this.add.image(fx, 558, 'flare').setScale(0.7).setAlpha(0.5);
            this.tweens.add({
                targets: fl, y: 548, duration: 1700 + i * 200,
                yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });
        }

        const start = () => this.scene.start('Game');
        playBtn.on('pointerdown', start);
        this.input.keyboard.once('keydown-SPACE', start);
    }
}

// ─── GAME SCENE ──────────────────────────────────────────────────────────────
class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'Game' }); }

    init() {
        this.score      = 0;
        this.lives      = 3;
        this.level      = 1;
        this.invincible = false;
        this.state      = 'playing'; // 'playing' | 'transition' | 'dead'
        this.totalFlares = 10;
        this.flaresLeft  = 10;
    }

    create() {
        this.add.image(400, 300, 'background');

        // ── Platforms ────────────────────────────────────────────────────
        this.platforms = this.physics.add.staticGroup();
        this.buildLevel();

        // ── Player ───────────────────────────────────────────────────────
        this.player = this.physics.add.sprite(80, 490, 'player');
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.setDragX(600);

        // ── Flares ───────────────────────────────────────────────────────
        this.flares = this.physics.add.group();
        this.spawnFlares();

        // ── Crabs ────────────────────────────────────────────────────────
        this.crabs = this.physics.add.group();
        this.spawnCrabs();

        // ── Physics ──────────────────────────────────────────────────────
        this.physics.add.collider(this.player,  this.platforms);
        this.physics.add.collider(this.flares,  this.platforms);
        this.physics.add.collider(this.crabs,   this.platforms);
        this.physics.add.overlap(this.player, this.flares, this.collectFlare, null, this);
        this.physics.add.overlap(this.player, this.crabs,  this.hitCrab,     null, this);

        // ── Controls ─────────────────────────────────────────────────────
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up:    Phaser.Input.Keyboard.KeyCodes.W,
            left:  Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // ── Particles (spark burst when flare collected) ──────────────────
        this.sparkles = this.add.particles(0, 0, 'dot', {
            speed:    { min: 60, max: 200 },
            scale:    { start: 1.2, end: 0 },
            alpha:    { start: 1,   end: 0 },
            lifespan: 500,
            quantity: 10,
            emitting: false,
            tint:     [0xff6b00, 0xffcc00, 0xff4500]
        });

        // ── HUD ──────────────────────────────────────────────────────────
        this.createHUD();
    }

    buildLevel() {
        // Ground row (sandy beach at the bottom)
        for (let x = 0; x < 800; x += 32) {
            this.platforms.create(x + 16, 575, 'sand');
        }
        // Cliffs and platforms (center_x, y, tile_count)
        const layout = [
            [148,  462, 4],
            [388,  402, 5],
            [628,  452, 4],
            [80,   348, 3],
            [280,  300, 4],
            [516,  310, 4],
            [716,  340, 3],
            [164,  220, 3],
            [436,  210, 4],
            [668,  220, 3],
        ];
        layout.forEach(([cx, y, n]) => {
            const sx = cx - Math.floor(n / 2) * 32 + 16;
            for (let i = 0; i < n; i++) {
                this.platforms.create(sx + i * 32, y, 'ground');
            }
        });
    }

    spawnFlares() {
        const positions = [
            { x: 100, y: 432 }, { x: 200, y: 432 },
            { x: 340, y: 372 }, { x: 430, y: 372 },
            { x: 590, y: 422 }, { x: 680, y: 422 },
            { x: 60,  y: 318 }, { x: 500, y: 280 },
            { x: 430, y: 180 }, { x: 660, y: 190 },
        ];
        this.totalFlares = positions.length;
        this.flaresLeft  = positions.length;
        positions.forEach(p => {
            const f = this.flares.create(p.x, p.y, 'flare');
            f.setBounceY(0.15);
            f.setVelocityY(Phaser.Math.Between(-15, 0));
        });
        this.updateFlaresHUD();
    }

    spawnCrabs() {
        const count = Math.min(2 + this.level, 6);
        const slots = [
            { x: 350, y: 540, vx:  80 },
            { x: 640, y: 420, vx: -100 },
            { x: 130, y: 540, vx: -80 },
            { x: 510, y: 278, vx:  110 },
            { x: 730, y: 540, vx: -95 },
            { x: 260, y: 268, vx:  100 },
        ];
        const boost = 1 + (this.level - 1) * 0.18;
        for (let i = 0; i < count; i++) {
            const { x, y, vx } = slots[i];
            const c = this.crabs.create(x, y, 'crab');
            c.setVelocityX(vx * boost);
            c.setBounce(1, 0);
            c.setCollideWorldBounds(true);
        }
    }

    createHUD() {
        const bar = this.add.graphics().setScrollFactor(0).setDepth(9);
        bar.fillStyle(0x000000, 0.45);
        bar.fillRect(0, 0, 800, 44);

        this.flaresHUD = this.add.text(12, 10, 'Flares: 0/10', {
            fontSize: '20px', color: '#ff6b00',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.livesHUD = this.add.text(210, 10, 'Lives: 3', {
            fontSize: '20px', color: '#e74c3c',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.levelHUD = this.add.text(400, 10, 'Level 1', {
            fontSize: '20px', color: '#f9e79f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(10);

        this.scoreHUD = this.add.text(788, 10, 'Score: 0', {
            fontSize: '20px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(10);

        this.msgText = this.add.text(400, 290, '', {
            fontSize: '50px', color: '#f9e79f',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 7, align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);
    }

    updateFlaresHUD() {
        const got = this.totalFlares - this.flaresLeft;
        this.flaresHUD.setText('Flares: ' + got + '/' + this.totalFlares);
    }

    updateLivesHUD() {
        this.livesHUD.setText('Lives: ' + this.lives);
    }

    collectFlare(player, flare) {
        const fx = flare.x, fy = flare.y;
        flare.destroy();
        this.flaresLeft--;
        this.score += 10;
        this.sparkles.setPosition(fx, fy);
        this.sparkles.explode(10);
        this.updateFlaresHUD();
        this.scoreHUD.setText('Score: ' + this.score);
        this.tweens.add({
            targets: this.scoreHUD, scaleX: 1.35, scaleY: 1.35,
            duration: 90, yoyo: true
        });
        if (this.flaresLeft === 0) this.levelClear();
    }

    levelClear() {
        this.state = 'transition';
        this.score += 50;
        this.scoreHUD.setText('Score: ' + this.score);
        this.physics.pause();

        const msg = this.level === 1
            ? 'FIRE LIT!\nHelicopter is coming!\n+50 BONUS!'
            : 'RESCUED AGAIN!\nLevel ' + this.level + ' Clear!\n+50 BONUS!';
        this.msgText.setText(msg);
        this.tweens.add({
            targets: this.msgText, scaleX: 1.1, scaleY: 1.1,
            duration: 300, yoyo: true
        });

        this.time.delayedCall(2800, () => {
            this.msgText.setText('');
            this.physics.resume();
            this.level++;
            this.levelHUD.setText('Level ' + this.level);
            this.spawnFlares();

            // Speed up crabs each level
            this.crabs.getChildren().forEach(c => {
                const vx = c.body.velocity.x;
                c.setVelocityX(vx * 1.15);
            });
            // Extra crab every 3 levels
            if (this.level % 3 === 0 && this.crabs.countActive() < 6) {
                const nx = Phaser.Math.Between(150, 650);
                const nc = this.crabs.create(nx, 540, 'crab');
                const nv = (90 + this.level * 12) * (Math.random() < 0.5 ? 1 : -1);
                nc.setVelocityX(nv);
                nc.setBounce(1, 0);
                nc.setCollideWorldBounds(true);
            }
            this.state = 'playing';
        });
    }

    hitCrab(player, crab) {
        if (this.invincible || this.state !== 'playing') return;
        this.lives--;
        this.updateLivesHUD();

        if (this.lives <= 0) {
            this.state = 'dead';
            this.physics.pause();
            this.player.setTint(0xff4444);
            this.cameras.main.shake(400, 0.02);
            this.time.delayedCall(900, () => {
                this.scene.start('GameOver', { score: this.score, level: this.level });
            });
            return;
        }

        const dir = crab.x < player.x ? 1 : -1;
        this.player.setVelocity(dir * 320, -420);
        this.cameras.main.shake(250, 0.012);

        this.invincible = true;
        this.tweens.add({
            targets: this.player, alpha: 0.15,
            duration: 75, yoyo: true, repeat: 11,
            onComplete: () => {
                this.player.setAlpha(1);
                this.invincible = false;
            }
        });
    }

    update() {
        if (this.state === 'dead') return;

        const left  = this.cursors.left.isDown  || this.wasd.left.isDown;
        const right = this.cursors.right.isDown || this.wasd.right.isDown;
        const jump  = Phaser.Input.Keyboard.JustDown(this.cursors.up)    ||
                      Phaser.Input.Keyboard.JustDown(this.wasd.up)       ||
                      Phaser.Input.Keyboard.JustDown(this.cursors.space);

        if (this.state === 'transition') return;

        if (left) {
            this.player.setVelocityX(-230);
            this.player.setFlipX(true);
        } else if (right) {
            this.player.setVelocityX(230);
            this.player.setFlipX(false);
        }

        if (jump && this.player.body.blocked.down) {
            this.player.setVelocityY(-570);
        }

        // Bob flares gently
        this.flares.getChildren().forEach(f => { f.rotation += 0.02; });
    }
}

// ─── GAME OVER SCENE ─────────────────────────────────────────────────────────
class GameOverScene extends Phaser.Scene {
    constructor() { super({ key: 'GameOver' }); }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalLevel = data.level || 1;
    }

    create() {
        this.add.image(400, 300, 'background');

        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.75);
        panel.fillRoundedRect(160, 95, 480, 400, 18);
        panel.lineStyle(3, 0xc0392b);
        panel.strokeRoundedRect(160, 95, 480, 400, 18);

        this.add.text(400, 140, 'NOT RESCUED!', {
            fontSize: '52px', color: '#e74c3c',
            fontFamily: 'Arial Black, Impact, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(400, 210, 'The crabs got you...', {
            fontSize: '22px', color: '#bdc3c7',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        this.add.text(400, 260, 'Score: ' + this.finalScore, {
            fontSize: '38px', color: '#f9e79f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 315, 'Reached Level ' + this.finalLevel, {
            fontSize: '24px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        let msg = '';
        if      (this.finalScore >= 300) msg = 'Amazing survivor! You legend!';
        else if (this.finalScore >= 150) msg = 'Great effort, survivor!';
        else if (this.finalScore >= 60)  msg = 'Keep trying - you can do it!';
        else                              msg = 'Watch out for those crabs!';

        this.add.text(400, 358, msg, {
            fontSize: '20px', color: '#2ecc71',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        const btn = this.add.text(400, 420, '  TRY AGAIN  ', {
            fontSize: '34px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 5,
            backgroundColor: '#c0392b', padding: { x: 16, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({ targets: btn, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });

        // Floating helicopter (help was so close!)
        const heli = this.add.image(400, 540, 'helicopter').setScale(1.1).setAlpha(0.5);
        this.tweens.add({ targets: heli, y: 525, duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });

        const restart = () => this.scene.start('Game');
        btn.on('pointerdown', restart);
        this.input.keyboard.once('keydown-SPACE', restart);
    }
}

// ─── PHASER CONFIG ────────────────────────────────────────────────────────────
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87ceeb',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 620 }, debug: false }
    },
    scene: [BootScene, TitleScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
