// STRANDED - The Alien Star Hunt
// A Phaser 3 platformer game

// ─── BOOT SCENE (creates all textures from code, no image files needed) ────
class BootScene extends Phaser.Scene {
    constructor() { super({ key: 'Boot' }); }

    create() {
        this.makeBackground();
        this.makeGround();
        this.makePlayer();
        this.makeStar();
        this.makeEnemy();
        this.makeRocket();
        this.makeDot();
        this.scene.start('Title');
    }

    makeBackground() {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillGradientStyle(0x0a0a1a, 0x0a0a1a, 0x1a0a2e, 0x0a1a2e, 1);
        g.fillRect(0, 0, 800, 600);
        // Tiny background stars (seeded so they're always the same)
        const rng = new Phaser.Math.RandomDataGenerator(['stranded42']);
        for (let i = 0; i < 130; i++) {
            const x = rng.integerInRange(0, 799);
            const y = rng.integerInRange(0, 520);
            const size = rng.integerInRange(1, 2);
            g.fillStyle(0xffffff, rng.realInRange(0.3, 1.0));
            g.fillRect(x, y, size, size);
        }
        // Alien planet ground strip
        g.fillStyle(0x2d5a1b);
        g.fillRect(0, 560, 800, 40);
        g.generateTexture('background', 800, 600);
        g.destroy();
    }

    makeGround() {
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x3a7a2a);
        g.fillRect(0, 0, 32, 32);
        g.fillStyle(0x4dae38);  // bright top strip (alien grass)
        g.fillRect(0, 0, 32, 7);
        g.fillStyle(0x5dc847);  // highlight
        g.fillRect(2, 1, 6, 3);
        g.fillRect(14, 2, 5, 2);
        g.fillStyle(0x2a5a1a);  // dark detail dots
        g.fillRect(5, 10, 4, 4);
        g.fillRect(16, 14, 5, 3);
        g.fillRect(25, 9, 3, 5);
        g.generateTexture('ground', 32, 32);
        g.destroy();
    }

    makePlayer() {
        // Cute orange astronaut: 32x48
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Helmet
        g.fillStyle(0xecf0f1);
        g.fillCircle(16, 14, 13);
        // Visor
        g.fillStyle(0x2980b9, 0.85);
        g.fillEllipse(16, 14, 17, 13);
        // Visor shine
        g.fillStyle(0x74b9ff, 0.8);
        g.fillEllipse(21, 10, 6, 4);
        // Body suit
        g.fillStyle(0xe67e22);
        g.fillRoundedRect(7, 24, 18, 18, 3);
        // Belt
        g.fillStyle(0xd35400);
        g.fillRect(7, 31, 18, 4);
        g.fillStyle(0xf39c12);
        g.fillRect(13, 31, 6, 4);  // buckle
        // Arms
        g.fillStyle(0xe67e22);
        g.fillRoundedRect(1, 24, 7, 15, 2);
        g.fillRoundedRect(24, 24, 7, 15, 2);
        // Gloves
        g.fillStyle(0xdfe6e9);
        g.fillCircle(4, 39, 4);
        g.fillCircle(28, 39, 4);
        // Legs
        g.fillStyle(0xd35400);
        g.fillRect(8, 41, 7, 8);
        g.fillRect(17, 41, 7, 8);
        // Boots
        g.fillStyle(0x2c3e50);
        g.fillRoundedRect(6, 46, 10, 6, 2);
        g.fillRoundedRect(17, 46, 10, 6, 2);
        g.generateTexture('player', 32, 52);
        g.destroy();
    }

    makeStar() {
        // Glowing yellow power crystal star: 32x32
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Outer glow
        g.fillStyle(0xfff176, 0.25);
        g.fillCircle(16, 16, 15);
        g.fillStyle(0xfff176, 0.15);
        g.fillCircle(16, 16, 13);
        // Star shape (5-pointed)
        g.fillStyle(0xf1c40f);
        const pts = [];
        for (let i = 0; i < 10; i++) {
            const angle = (i * Math.PI * 2 / 10) - Math.PI / 2;
            const r = i % 2 === 0 ? 12 : 5;
            pts.push({ x: 16 + r * Math.cos(angle), y: 16 + r * Math.sin(angle) });
        }
        g.fillPoints(pts, true);
        // Inner shine
        g.fillStyle(0xfef9e7);
        g.fillCircle(13, 12, 3);
        g.generateTexture('star', 32, 32);
        g.destroy();
    }

    makeEnemy() {
        // Purple alien Zogblob: 36x36
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Body blobs on top (alien antenna-like)
        g.fillStyle(0x8e44ad);
        g.fillCircle(10, 10, 6);
        g.fillCircle(26, 10, 6);
        g.fillCircle(18, 7, 6);
        // Main round body
        g.fillStyle(0x9b59b6);
        g.fillCircle(18, 22, 15);
        // Eye whites
        g.fillStyle(0xffeaa7);
        g.fillCircle(11, 19, 7);
        g.fillCircle(25, 19, 7);
        // Pupils (red & angry)
        g.fillStyle(0xe74c3c);
        g.fillCircle(11, 20, 4);
        g.fillCircle(25, 20, 4);
        // Glint in eyes
        g.fillStyle(0xffffff);
        g.fillCircle(13, 18, 1);
        g.fillCircle(27, 18, 1);
        // Angry mouth
        g.fillStyle(0x2c1a40);
        g.fillRoundedRect(11, 29, 14, 5, 2);
        // Teeth
        g.fillStyle(0xffffff);
        g.fillRect(13, 29, 3, 3);
        g.fillRect(17, 29, 3, 3);
        g.fillRect(21, 29, 3, 3);
        g.generateTexture('enemy', 36, 36);
        g.destroy();
    }

    makeRocket() {
        // Little rocket ship: 40x72
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        // Engine flame
        g.fillStyle(0xf39c12, 0.6);
        g.fillTriangle(14, 60, 26, 60, 20, 75);
        g.fillStyle(0xf1c40f, 0.8);
        g.fillTriangle(16, 60, 24, 60, 20, 70);
        // Body
        g.fillStyle(0xbdc3c7);
        g.fillRect(12, 22, 16, 38);
        // Nose cone
        g.fillStyle(0xe74c3c);
        g.fillTriangle(12, 22, 28, 22, 20, 4);
        // Window
        g.fillStyle(0x3498db);
        g.fillCircle(20, 35, 6);
        g.fillStyle(0x74b9ff, 0.7);
        g.fillCircle(22, 33, 2);
        // Fins
        g.fillStyle(0xe74c3c);
        g.fillTriangle(12, 54, 4, 68, 12, 60);
        g.fillTriangle(28, 54, 36, 68, 28, 60);
        // Flag
        g.fillStyle(0x2ecc71);
        g.fillRect(20, 4, 12, 7);
        g.fillStyle(0xffffff);
        g.fillRect(21, 5, 5, 5);
        g.generateTexture('rocket', 40, 76);
        g.destroy();
    }

    makeDot() {
        // Small glowing dot for star-collect particles
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf1c40f);
        g.fillCircle(4, 4, 4);
        g.generateTexture('dot', 8, 8);
        g.destroy();
    }
}

// ─── TITLE SCENE ────────────────────────────────────────────────────────────
class TitleScene extends Phaser.Scene {
    constructor() { super({ key: 'Title' }); }

    create() {
        this.add.image(400, 300, 'background');

        // Floating rocket
        const rocket = this.add.image(400, 390, 'rocket').setScale(1.8);
        this.tweens.add({
            targets: rocket, y: 370,
            duration: 2200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        // Title
        this.add.text(400, 70, 'STRANDED', {
            fontSize: '76px', color: '#f1c40f',
            fontFamily: 'Arial Black, Impact, Arial',
            fontStyle: 'bold', stroke: '#000000', strokeThickness: 10
        }).setOrigin(0.5);

        this.add.text(400, 150, 'The Alien Star Hunt', {
            fontSize: '28px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000000', strokeThickness: 4
        }).setOrigin(0.5);

        // Story box
        const box = this.add.graphics();
        box.fillStyle(0x000000, 0.55);
        box.fillRoundedRect(180, 178, 440, 155, 12);
        box.lineStyle(2, 0x9b59b6);
        box.strokeRoundedRect(180, 178, 440, 155, 12);

        this.add.text(400, 198, [
            'You are ASTRO, stranded on Planet Zogg!',
            'Collect all the POWER STARS to fuel',
            'your rocket ship and fly home!',
            '',
            'Arrow keys or WASD  =  Move',
            'UP  /  W  /  SPACE   =  Jump'
        ], {
            fontSize: '17px', color: '#dfe6e9',
            fontFamily: 'Arial', align: 'center', lineSpacing: 6
        }).setOrigin(0.5, 0);

        // Play button (blinking)
        const playBtn = this.add.text(400, 495, '  PRESS SPACE TO START  ', {
            fontSize: '30px', color: '#2ecc71',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 5,
            backgroundColor: '#1a5e32', padding: { x: 14, y: 8 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: playBtn, alpha: 0.15,
            duration: 650, yoyo: true, repeat: -1
        });

        // Decorative floating stars along the bottom
        for (let i = 0; i < 6; i++) {
            const sx = 80 + i * 130;
            const star = this.add.image(sx, 555, 'star').setScale(0.55).setAlpha(0.45);
            this.tweens.add({
                targets: star, y: 545, rotation: Phaser.Math.PI2,
                duration: 1800 + i * 250, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });
        }

        const start = () => this.scene.start('Game');
        playBtn.on('pointerdown', start);
        this.input.keyboard.once('keydown-SPACE', start);
    }
}

// ─── GAME SCENE ─────────────────────────────────────────────────────────────
class GameScene extends Phaser.Scene {
    constructor() { super({ key: 'Game' }); }

    init() {
        this.score       = 0;
        this.lives       = 3;
        this.level       = 1;
        this.invincible  = false;
        this.state       = 'playing'; // 'playing' | 'transition' | 'dead'
        this.totalStars  = 12;
        this.starsLeft   = 12;
    }

    create() {
        this.add.image(400, 300, 'background');

        // ── Platforms ──────────────────────────────────────────────────────
        this.platforms = this.physics.add.staticGroup();
        this.buildLevel();

        // ── Player ─────────────────────────────────────────────────────────
        this.player = this.physics.add.sprite(80, 490, 'player');
        this.player.setBounce(0.05);
        this.player.setCollideWorldBounds(true);
        this.player.setDragX(600);

        // ── Stars ──────────────────────────────────────────────────────────
        this.stars = this.physics.add.group();
        this.spawnStars();

        // ── Enemies ────────────────────────────────────────────────────────
        this.enemies = this.physics.add.group();
        this.spawnEnemies();

        // ── Physics ────────────────────────────────────────────────────────
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars,  this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.stars,   this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy,    null, this);

        // ── Controls ───────────────────────────────────────────────────────
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up:    Phaser.Input.Keyboard.KeyCodes.W,
            left:  Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // ── Particles ──────────────────────────────────────────────────────
        this.sparkles = this.add.particles(0, 0, 'dot', {
            speed:    { min: 60, max: 200 },
            scale:    { start: 1.3, end: 0 },
            alpha:    { start: 1,   end: 0 },
            lifespan: 500,
            quantity: 12,
            emitting: false,
            tint:     [0xf1c40f, 0xfff176, 0xffeb3b, 0xfd79a8]
        });

        // ── HUD ────────────────────────────────────────────────────────────
        this.createHUD();
    }

    buildLevel() {
        // Ground row
        for (let x = 0; x < 800; x += 32) {
            this.platforms.create(x + 16, 575, 'ground');
        }
        // [center_x, y, width_in_tiles]
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
            const startX = cx - Math.floor(n / 2) * 32 + 16;
            for (let i = 0; i < n; i++) {
                this.platforms.create(startX + i * 32, y, 'ground');
            }
        });
    }

    spawnStars() {
        // One star near each platform + a few on the ground
        const positions = [
            { x: 100, y: 432 }, { x: 200, y: 432 },
            { x: 340, y: 372 }, { x: 420, y: 372 },
            { x: 590, y: 422 }, { x: 680, y: 422 },
            { x: 60,  y: 318 }, { x: 250, y: 270 },
            { x: 500, y: 280 }, { x: 700, y: 310 },
            { x: 430, y: 180 }, { x: 660, y: 190 },
        ];
        this.starsLeft = positions.length;
        this.totalStars = positions.length;
        positions.forEach(p => {
            const s = this.stars.create(p.x, p.y, 'star');
            s.setBounceY(0.15);
            s.setVelocityY(Phaser.Math.Between(-15, 0));
        });
        this.updateStarsHUD();
    }

    spawnEnemies() {
        // Enemies increase with level
        const count = Math.min(2 + this.level, 6);
        const slots = [
            { x: 350, y: 540, vx:  90 },
            { x: 640, y: 420, vx: -110 },
            { x: 130, y: 540, vx: -85 },
            { x: 510, y: 278, vx:  115 },
            { x: 730, y: 540, vx: -100 },
            { x: 260, y: 268, vx:  105 },
        ];
        const speedBoost = 1 + (this.level - 1) * 0.18;
        for (let i = 0; i < count; i++) {
            const { x, y, vx } = slots[i];
            const e = this.enemies.create(x, y, 'enemy');
            e.setVelocityX(vx * speedBoost);
            e.setBounce(1, 0);
            e.setCollideWorldBounds(true);
        }
    }

    createHUD() {
        // Semi-transparent top bar
        const bar = this.add.graphics().setScrollFactor(0).setDepth(9);
        bar.fillStyle(0x000000, 0.45);
        bar.fillRect(0, 0, 800, 44);

        this.starsHUD = this.add.text(12, 10, 'Stars: 0/12', {
            fontSize: '20px', color: '#f1c40f',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.livesHUD = this.add.text(210, 10, 'Lives: 3', {
            fontSize: '20px', color: '#e74c3c',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        this.levelHUD = this.add.text(400, 10, 'Level 1', {
            fontSize: '20px', color: '#2ecc71',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(10);

        this.scoreHUD = this.add.text(788, 10, 'Score: 0', {
            fontSize: '20px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(1, 0).setScrollFactor(0).setDepth(10);

        // Big centred message (level-clear, etc.)
        this.msgText = this.add.text(400, 290, '', {
            fontSize: '54px', color: '#f1c40f',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 7,
            align: 'center'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);
    }

    updateStarsHUD() {
        const collected = this.totalStars - this.starsLeft;
        this.starsHUD.setText('Stars: ' + collected + '/' + this.totalStars);
    }

    updateLivesHUD() {
        this.livesHUD.setText('Lives: ' + this.lives);
    }

    // ── Collect star ───────────────────────────────────────────────────────
    collectStar(player, star) {
        const sx = star.x, sy = star.y;
        star.destroy();
        this.starsLeft--;
        this.score += 10;

        this.sparkles.setPosition(sx, sy);
        this.sparkles.explode(12);
        this.updateStarsHUD();
        this.scoreHUD.setText('Score: ' + this.score);
        this.tweens.add({
            targets: this.scoreHUD, scaleX: 1.35, scaleY: 1.35,
            duration: 90, yoyo: true
        });

        if (this.starsLeft === 0) {
            this.levelClear();
        }
    }

    levelClear() {
        this.state = 'transition';
        this.score += 50;
        this.scoreHUD.setText('Score: ' + this.score);
        this.physics.pause();

        this.msgText.setText('LEVEL ' + this.level + ' CLEAR!\n+50 BONUS!');
        this.tweens.add({ targets: this.msgText, scaleX: 1.1, scaleY: 1.1, duration: 300, yoyo: true });

        this.time.delayedCall(2600, () => {
            this.msgText.setText('');
            this.physics.resume();
            this.level++;
            this.levelHUD.setText('Level ' + this.level);
            this.starsLeft = 0;
            this.spawnStars();

            // Speed up existing enemies
            this.enemies.getChildren().forEach(e => {
                const vx = e.body.velocity.x;
                e.setVelocityX(vx * 1.15);
            });

            // Extra enemy every 3 levels
            if (this.level % 3 === 0 && this.enemies.countActive() < 6) {
                const nx = Phaser.Math.Between(150, 650);
                const ne = this.enemies.create(nx, 540, 'enemy');
                const nv = (100 + this.level * 15) * (Math.random() < 0.5 ? 1 : -1);
                ne.setVelocityX(nv);
                ne.setBounce(1, 0);
                ne.setCollideWorldBounds(true);
            }

            this.state = 'playing';
        });
    }

    // ── Hit enemy ──────────────────────────────────────────────────────────
    hitEnemy(player, enemy) {
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

        // Knockback + camera shake
        const dir = enemy.x < player.x ? 1 : -1;
        this.player.setVelocity(dir * 320, -420);
        this.cameras.main.shake(250, 0.012);

        // Invincibility flash
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

    // ── Update (runs every frame) ──────────────────────────────────────────
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

        // Spin stars
        this.stars.getChildren().forEach(s => { s.rotation += 0.03; });
    }
}

// ─── GAME OVER SCENE ────────────────────────────────────────────────────────
class GameOverScene extends Phaser.Scene {
    constructor() { super({ key: 'GameOver' }); }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalLevel = data.level || 1;
    }

    create() {
        this.add.image(400, 300, 'background');

        // Panel
        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.72);
        panel.fillRoundedRect(160, 95, 480, 390, 18);
        panel.lineStyle(3, 0xe74c3c);
        panel.strokeRoundedRect(160, 95, 480, 390, 18);

        this.add.text(400, 140, 'GAME OVER', {
            fontSize: '58px', color: '#e74c3c',
            fontFamily: 'Arial Black, Impact, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(400, 225, 'Score: ' + this.finalScore, {
            fontSize: '38px', color: '#f1c40f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 282, 'Reached Level ' + this.finalLevel, {
            fontSize: '24px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        // Fun message based on score
        let msg = '';
        if      (this.finalScore >= 300) msg = 'STAR CHAMPION! You rule!';
        else if (this.finalScore >= 150) msg = 'Great job, space explorer!';
        else if (this.finalScore >= 60)  msg = 'Nice try! Keep going!';
        else                              msg = 'You can do it! Try again!';

        this.add.text(400, 330, msg, {
            fontSize: '21px', color: '#2ecc71',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        const btn = this.add.text(400, 405, '  PLAY AGAIN  ', {
            fontSize: '34px', color: '#2ecc71',
            fontFamily: 'Arial Black, Arial', fontStyle: 'bold',
            stroke: '#000000', strokeThickness: 5,
            backgroundColor: '#1a5e32', padding: { x: 16, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({ targets: btn, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });

        // Floating rockets (decorative)
        [110, 690].forEach((rx, i) => {
            const r = this.add.image(rx, 300, 'rocket').setAlpha(0.4).setScale(1.2);
            this.tweens.add({ targets: r, y: 280 + i * 20, duration: 1900 + i * 300, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        });

        const restart = () => this.scene.start('Game');
        btn.on('pointerdown', restart);
        this.input.keyboard.once('keydown-SPACE', restart);
    }
}

// ─── PHASER CONFIG ───────────────────────────────────────────────────────────
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#0a0a1a',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 620 }, debug: false }
    },
    scene: [BootScene, TitleScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
