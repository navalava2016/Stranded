// STRANDED - Forest Survival
// Move: Arrow Keys / WASD   |   Attack: SPACE

class BootScene extends Phaser.Scene {
    constructor() { super({ key: 'Boot' }); }

    create() {
        // Forest background
        const bg = this.make.graphics({ x: 0, y: 0, add: false });
        bg.fillStyle(0x2d6a2d);
        bg.fillRect(0, 0, 800, 600);
        const rng = new Phaser.Math.RandomDataGenerator(['forest1']);
        for (let i = 0; i < 50; i++) {
            bg.fillStyle(rng.pick([0x1e5c1e, 0x3d8a3d, 0x255225, 0x1a4a1a]));
            bg.fillRect(
                rng.integerInRange(0, 780),
                rng.integerInRange(0, 580),
                rng.integerInRange(25, 70),
                rng.integerInRange(18, 45)
            );
        }
        bg.generateTexture('bg', 800, 600);
        bg.destroy();

        // Player - crash survivor
        const p = this.make.graphics({ x: 0, y: 0, add: false });
        p.fillStyle(0xf0c080);             // head
        p.fillCircle(16, 10, 10);
        p.fillStyle(0x000000);             // eyes
        p.fillRect(10, 8, 4, 4);
        p.fillRect(18, 8, 4, 4);
        p.fillStyle(0xe67e22);             // shirt
        p.fillRect(7, 19, 18, 17);
        p.fillStyle(0x5d4037);             // trousers
        p.fillRect(7, 35, 7, 10);
        p.fillRect(17, 35, 7, 10);
        p.fillStyle(0x3e2723);             // boots
        p.fillRect(6, 43, 8, 5);
        p.fillRect(16, 43, 8, 5);
        p.fillStyle(0x8b6914);             // stick
        p.fillRect(26, 14, 5, 22);
        p.generateTexture('player', 32, 48);
        p.destroy();

        // Bear
        const b = this.make.graphics({ x: 0, y: 0, add: false });
        b.fillStyle(0x7b4a24);             // body
        b.fillEllipse(24, 30, 36, 28);
        b.fillCircle(24, 13, 14);          // head
        b.fillCircle(13, 3, 7);            // left ear
        b.fillCircle(35, 3, 7);            // right ear
        b.fillStyle(0x5a3518);
        b.fillCircle(13, 3, 4);
        b.fillCircle(35, 3, 4);
        b.fillStyle(0x000000);             // eyes
        b.fillCircle(18, 11, 3);
        b.fillCircle(30, 11, 3);
        b.fillStyle(0x5a3518);             // snout
        b.fillEllipse(24, 18, 12, 8);
        b.fillStyle(0x000000);             // nose
        b.fillEllipse(24, 15, 7, 5);
        b.generateTexture('bear', 48, 44);
        b.destroy();

        // Rabbit
        const r = this.make.graphics({ x: 0, y: 0, add: false });
        r.fillStyle(0xc8cdd0);             // ears
        r.fillRect(5, 0, 6, 16);
        r.fillRect(17, 0, 6, 16);
        r.fillStyle(0xf1948a);
        r.fillRect(6, 2, 4, 12);
        r.fillRect(18, 2, 4, 12);
        r.fillStyle(0xd5d8dc);             // body
        r.fillCircle(14, 22, 12);
        r.fillStyle(0xffffff);             // tail
        r.fillCircle(24, 26, 5);
        r.fillStyle(0xe74c3c);             // eye
        r.fillCircle(9, 18, 3);
        r.generateTexture('rabbit', 30, 34);
        r.destroy();

        // Dead rabbit (food on ground)
        const f = this.make.graphics({ x: 0, y: 0, add: false });
        f.fillStyle(0x95a5a6);
        f.fillEllipse(18, 9, 32, 13);
        f.fillCircle(5, 8, 5);
        f.fillStyle(0xe74c3c);
        f.fillCircle(4, 7, 2);
        f.generateTexture('food', 36, 18);
        f.destroy();

        // Tree (decorative)
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
        this.lives          = 3;
        this.score          = 0;
        this.hunger         = 100;
        this.facing         = 'right';
        this.attackCooldown = 0;
        this.hitCooldown    = 0;
        this.dead           = false;
    }

    create() {
        this.add.image(400, 300, 'bg');

        // Decorative trees around the edges
        const treeSpots = [
            [55,55],[170,70],[700,45],[755,130],[45,200],[710,200],
            [760,310],[45,360],[95,490],[710,490],[760,565],
            [310,45],[510,38],[400,558],[195,565],[615,562],
            [125,145],[660,145],[75,415],[730,415],[280,530],[550,530]
        ];
        treeSpots.forEach(([x, y]) => this.add.image(x, y, 'tree').setDepth(1));

        // Player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(3);

        // Animal groups
        this.bears   = this.physics.add.group();
        this.rabbits = this.physics.add.group();
        this.foods   = this.physics.add.group();

        // Spawn starting animals
        for (let i = 0; i < 4; i++) this.spawnRabbit();
        this.spawnBear();

        // Timers
        this.time.addEvent({ delay: 15000, callback: this.spawnBear,   callbackScope: this, loop: true });
        this.time.addEvent({ delay: 22000, callback: () => { if (this.rabbits.countActive() < 8) this.spawnRabbit(); }, loop: true });
        this.time.addEvent({ delay: 1500,  callback: this.tickHunger,  callbackScope: this, loop: true });
        this.time.addEvent({ delay: 1000,  callback: () => { if (!this.dead) { this.score++; this.updateScore(); } }, loop: true });

        // Physics overlaps
        this.physics.add.overlap(this.player, this.bears,  this.bearAttacksPlayer, null, this);
        this.physics.add.overlap(this.player, this.foods,  this.playerEatsFood,    null, this);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up:    Phaser.Input.Keyboard.KeyCodes.W,
            left:  Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            down:  Phaser.Input.Keyboard.KeyCodes.S
        });

        // Graphics for HP bars (redrawn every frame)
        this.hpBars = this.add.graphics().setDepth(5);

        this.buildHUD();

        this.showMsg('Bears are hunting you!\nCollect rabbits to eat. SPACE = attack!', '#f9e79f', 3000);
    }

    // ── Spawning ────────────────────────────────────────────────────────────

    spawnBear() {
        if (this.dead) return;
        if (this.bears.countActive() >= Math.min(2 + Math.floor(this.score / 80), 5)) return;
        const edges = [
            [Phaser.Math.Between(100, 700), 70],
            [Phaser.Math.Between(100, 700), 530],
            [100, Phaser.Math.Between(100, 500)],
            [700, Phaser.Math.Between(100, 500)],
        ];
        const [x, y] = Phaser.Utils.Array.GetRandom(edges);
        const bear = this.bears.create(x, y, 'bear');
        bear.hp = 5;
        bear.setDepth(3);
        bear.setCollideWorldBounds(true);
    }

    spawnRabbit() {
        let x, y, tries = 0;
        do {
            x = Phaser.Math.Between(100, 700);
            y = Phaser.Math.Between(100, 500);
            tries++;
        } while (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 160 && tries < 20);

        const rabbit = this.rabbits.create(x, y, 'rabbit');
        rabbit.hp       = 3;
        rabbit.hopTimer = 0;
        rabbit.setDepth(3);
        rabbit.setCollideWorldBounds(true);
    }

    // ── Hunger ──────────────────────────────────────────────────────────────

    tickHunger() {
        if (this.dead) return;
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

        // Offset the hit zone in the direction the player faces
        const off = { right: [50, 0], left: [-50, 0], up: [0, -50], down: [0, 50] };
        const [ox, oy] = off[this.facing];
        const hx = this.player.x + ox;
        const hy = this.player.y + oy;
        const RANGE = 68;

        // Visual flash
        const fx = this.add.image(hx, hy, 'slash').setDepth(6).setAlpha(0.9);
        this.tweens.add({ targets: fx, alpha: 0, scaleX: 1.6, scaleY: 1.6, duration: 220, onComplete: () => fx.destroy() });

        // Hit bears
        this.bears.getChildren().forEach(bear => {
            if (!bear.active) return;
            if (Phaser.Math.Distance.Between(hx, hy, bear.x, bear.y) < RANGE + 5) {
                bear.hp--;
                this.floatText(bear.x, bear.y - 24, 'HIT  ' + bear.hp + '/5 HP left', '#ffff00');
                if (bear.hp <= 0) {
                    bear.destroy();
                    this.score += 20;
                    this.updateScore();
                    this.floatText(bear.x, bear.y - 30, 'Bear down! +20', '#f1c40f');
                }
            }
        });

        // Hit rabbits
        this.rabbits.getChildren().forEach(rabbit => {
            if (!rabbit.active) return;
            if (Phaser.Math.Distance.Between(hx, hy, rabbit.x, rabbit.y) < RANGE) {
                rabbit.hp--;
                this.floatText(rabbit.x, rabbit.y - 18, 'HIT  ' + rabbit.hp + '/3 HP left', '#ffff00');
                if (rabbit.hp <= 0) {
                    const food = this.foods.create(rabbit.x, rabbit.y, 'food');
                    food.setDepth(2);
                    food.body.allowGravity = false;
                    rabbit.destroy();
                    this.score += 5;
                    this.updateScore();
                    this.floatText(rabbit.x, rabbit.y, 'Walk over to eat!', '#2ecc71');
                }
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
        food.destroy();
        const gain = Math.min(40, 100 - this.hunger);
        this.hunger = Math.min(100, this.hunger + 40);
        this.redrawHungerBar();
        this.floatText(player.x, player.y - 20, '+' + (gain || 40) + ' hunger (rabbit)', '#2ecc71');
        this.score += 10;
        this.updateScore();
    }

    // ── HUD ─────────────────────────────────────────────────────────────────

    buildHUD() {
        // Top bar backdrop
        const hud = this.add.graphics().setScrollFactor(0).setDepth(9);
        hud.fillStyle(0x000000, 0.55);
        hud.fillRect(0, 0, 800, 50);

        // Hunger label + bar container
        this.add.text(12, 7, 'HUNGER', {
            fontSize: '13px', color: '#ffffff',
            fontFamily: 'Arial', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(12);

        const barBg = this.add.graphics().setScrollFactor(0).setDepth(10);
        barBg.fillStyle(0x333333);
        barBg.fillRect(10, 22, 204, 18);

        this.hungerBar = this.add.graphics().setScrollFactor(0).setDepth(11);
        this.redrawHungerBar();

        // Lives
        this.livesText = this.add.text(230, 10, 'Lives: 3', {
            fontSize: '20px', color: '#e74c3c',
            fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setScrollFactor(0).setDepth(10);

        // Score
        this.scoreText = this.add.text(400, 10, 'Score: 0', {
            fontSize: '20px', color: '#f1c40f',
            fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(10);

        // Controls hint at bottom
        this.add.text(400, 596, 'Arrow Keys / WASD = Move   |   SPACE = Attack with stick', {
            fontSize: '14px', color: '#ecf0f1',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5, 1).setScrollFactor(0).setDepth(10);

        // Message display
        this.msgDisplay = this.add.text(400, 285, '', {
            fontSize: '30px', color: '#ffffff',
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
    updateScore()  { this.scoreText.setText('Score: ' + this.score); }

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
        this.time.delayedCall(800, () => this.scene.start('GameOver', { score: this.score }));
    }

    // ── Main loop ────────────────────────────────────────────────────────────

    update(time, delta) {
        if (this.dead) return;

        this.attackCooldown = Math.max(0, this.attackCooldown - delta);
        this.hitCooldown    = Math.max(0, this.hitCooldown    - delta);

        // Player movement
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

        // Attack
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) this.doAttack();

        // Bear AI: walk toward player
        this.bears.getChildren().forEach(bear => {
            if (!bear.active) return;
            const angle = Phaser.Math.Angle.Between(bear.x, bear.y, this.player.x, this.player.y);
            bear.setVelocity(Math.cos(angle) * 68, Math.sin(angle) * 68);
            bear.setFlipX(this.player.x < bear.x);
        });

        // Rabbit AI: random hops, flee when player is close
        this.rabbits.getChildren().forEach(rabbit => {
            if (!rabbit.active) return;
            rabbit.hopTimer = (rabbit.hopTimer || 0) - delta;
            const dist = Phaser.Math.Distance.Between(rabbit.x, rabbit.y, this.player.x, this.player.y);
            if (dist < 130) {
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, rabbit.x, rabbit.y);
                rabbit.setVelocity(Math.cos(angle) * 150, Math.sin(angle) * 150);
                rabbit.hopTimer = 700;
            } else if (rabbit.hopTimer <= 0) {
                const angle = Math.random() * Math.PI * 2;
                rabbit.setVelocity(Math.cos(angle) * 80, Math.sin(angle) * 80);
                rabbit.hopTimer = Phaser.Math.Between(900, 2400);
            }
        });

        // HP bars above animals
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

    init(data) { this.finalScore = data.score || 0; }

    create() {
        this.add.image(400, 300, 'bg');

        const panel = this.add.graphics();
        panel.fillStyle(0x000000, 0.80);
        panel.fillRoundedRect(200, 140, 400, 320, 16);
        panel.lineStyle(3, 0xe74c3c);
        panel.strokeRoundedRect(200, 140, 400, 320, 16);

        this.add.text(400, 185, 'YOU DIED', {
            fontSize: '58px', color: '#e74c3c',
            fontFamily: 'Arial Black, Impact, Arial',
            stroke: '#000', strokeThickness: 8
        }).setOrigin(0.5);

        this.add.text(400, 265, 'Score: ' + this.finalScore, {
            fontSize: '36px', color: '#f1c40f',
            fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5);

        const msg =
            this.finalScore >= 200 ? 'Incredible survivor!' :
            this.finalScore >= 100 ? 'Great job out there!' :
            this.finalScore >= 50  ? 'Keep practicing!'     :
                                     'Watch out for bears!';

        this.add.text(400, 320, msg, {
            fontSize: '22px', color: '#2ecc71',
            fontFamily: 'Arial', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        const btn = this.add.text(400, 390, '  PLAY AGAIN  ', {
            fontSize: '30px', color: '#ffffff',
            fontFamily: 'Arial Black, Arial',
            stroke: '#000', strokeThickness: 4,
            backgroundColor: '#922b21', padding: { x: 16, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.tweens.add({ targets: btn, alpha: 0.2, duration: 600, yoyo: true, repeat: -1 });
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
    scene: [BootScene, GameScene, GameOverScene]
};

new Phaser.Game(config);
