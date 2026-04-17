class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.inventory = { wood: 0, rope: 0, fish: 0, berries: 0 };
    this.tasks = {
      buildShelter: false,
      buildSignalFire: false,
      buildRaft: false,
      lightFire: false
    };
    this.day = 1;
    this.hunger = 100;
    this.dayTimer = 0;
    this.DAY_LENGTH = 60000; // 60 seconds per day
    this.rescued = false;
  }

  create() {
    this._buildIsland();
    this._spawnPlayer();
    this._spawnResources();
    this._spawnInteractables();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // Camera follows player
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Launch UI overlay
    this.scene.launch('UIScene', { gameScene: this });

    // Day/night cycle overlay
    this.nightOverlay = this.add.rectangle(800, 600, 1600, 1200, 0x000033, 0)
      .setDepth(50);

    this._showMessage('You crash-landed on a deserted island!\nFind wood, build a signal fire, and get rescued!\nMove: Arrow Keys  |  Interact: E');
  }

  update(time, delta) {
    if (this.rescued) return;

    this._handleMovement();
    this._checkInteractions();
    this._updateDayCycle(delta);
    this._updateHunger(delta);
  }

  _buildIsland() {
    const MAP_W = 50, MAP_H = 37, TILE = 32;

    // Water border
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const isEdge = x < 3 || x >= MAP_W - 3 || y < 3 || y >= MAP_H - 3;
        const dist = Math.hypot(x - MAP_W / 2, y - MAP_H / 2);
        const isWater = isEdge || dist > 18;
        this.add.image(x * TILE + 16, y * TILE + 16, isWater ? 'water' : (dist > 14 ? 'sand' : 'grass'))
          .setDepth(0);
      }
    }

    // Water physics boundary
    this.waterBounds = this.physics.add.staticGroup();
    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const isEdge = x < 3 || x >= MAP_W - 3 || y < 3 || y >= MAP_H - 3;
        const dist = Math.hypot(x - MAP_W / 2, y - MAP_H / 2);
        if (isEdge || dist > 18) {
          this.waterBounds.create(x * TILE + 16, y * TILE + 16, 'water')
            .setVisible(false).refreshBody();
        }
      }
    }

    // Decorative palm trees
    const palmPositions = [
      [640, 160], [480, 200], [720, 240], [320, 480], [800, 480],
      [560, 640], [400, 320], [880, 320], [640, 880]
    ];
    this.trees = this.physics.add.staticGroup();
    palmPositions.forEach(([x, y]) => {
      this.add.image(x, y, 'palm').setDepth(3);
      this.trees.create(x, y + 16, 'rock').setVisible(false).refreshBody();
    });
  }

  _spawnPlayer() {
    this.player = this.physics.add.sprite(800, 600, 'player')
      .setDepth(5)
      .setCollideWorldBounds(true);
    this.player.body.setSize(12, 12).setOffset(2, 4);

    this.physics.add.collider(this.player, this.waterBounds);
    this.physics.add.collider(this.player, this.trees);
  }

  _spawnResources() {
    this.resources = this.physics.add.staticGroup();
    const items = [
      { key: 'wood',    x: 700, y: 500, type: 'wood',    label: 'Driftwood' },
      { key: 'wood',    x: 620, y: 700, type: 'wood',    label: 'Driftwood' },
      { key: 'wood',    x: 880, y: 440, type: 'wood',    label: 'Driftwood' },
      { key: 'rope',    x: 540, y: 560, type: 'rope',    label: 'Vine Rope' },
      { key: 'rope',    x: 760, y: 680, type: 'rope',    label: 'Vine Rope' },
      { key: 'fish',    x: 960, y: 560, type: 'fish',    label: 'Fish' },
      { key: 'fish',    x: 640, y: 760, type: 'fish',    label: 'Fish' },
      { key: 'berries', x: 480, y: 400, type: 'berries', label: 'Berries' },
      { key: 'berries', x: 820, y: 380, type: 'berries', label: 'Berries' },
      { key: 'wood',    x: 440, y: 640, type: 'wood',    label: 'Driftwood' },
      { key: 'rope',    x: 900, y: 720, type: 'rope',    label: 'Vine Rope' },
    ];

    items.forEach(item => {
      const sprite = this.resources.create(item.x, item.y, item.key)
        .setDepth(2).refreshBody();
      sprite.itemType = item.type;
      sprite.itemLabel = item.label;

      // Bobbing tween
      this.tweens.add({
        targets: sprite, y: item.y - 4,
        yoyo: true, repeat: -1, duration: 800 + Math.random() * 400,
        ease: 'Sine.easeInOut'
      });
    });

    this.physics.add.overlap(this.player, this.resources, this._collectItem, null, this);
  }

  _spawnInteractables() {
    this.interactables = [];

    const spots = [
      { x: 560, y: 480, key: 'chest', label: 'Shipwreck Chest', action: 'chest' },
    ];

    spots.forEach(s => {
      const sprite = this.physics.add.staticSprite(s.x, s.y, s.key)
        .setDepth(3).refreshBody();
      sprite.actionType = s.action;
      sprite.actionLabel = s.label;
      this.interactables.push(sprite);

      const hint = this.add.text(s.x, s.y - 28, '[E] ' + s.label, {
        fontSize: '10px', fill: '#fff', backgroundColor: '#000',
        padding: { x: 3, y: 2 }
      }).setOrigin(0.5).setDepth(10).setVisible(false);
      sprite.hintText = hint;
    });

    // Craft spots (invisible triggers)
    this.craftZones = [
      { x: 750, y: 520, recipe: { wood: 3, rope: 1 }, result: 'shelter',    label: 'Build Shelter here',     built: false },
      { x: 680, y: 620, recipe: { wood: 2, rope: 1 }, result: 'signalFire', label: 'Build Signal Fire here', built: false },
      { x: 780, y: 700, recipe: { wood: 4, rope: 2 }, result: 'raft',       label: 'Build Raft here',        built: false },
    ];

    this.craftZones.forEach(zone => {
      zone.sprite = null;
      zone.marker = this.add.circle(zone.x, zone.y, 22, 0xffd700, 0.25).setDepth(1);
      zone.text = this.add.text(zone.x, zone.y - 30, zone.label, {
        fontSize: '10px', fill: '#ffd700', backgroundColor: '#00000088',
        padding: { x: 3, y: 2 }
      }).setOrigin(0.5).setDepth(10);
    });
  }

  _handleMovement() {
    const SPEED = 120;
    const body = this.player.body;
    body.setVelocity(0);

    if (this.cursors.left.isDown)  body.setVelocityX(-SPEED);
    if (this.cursors.right.isDown) body.setVelocityX(SPEED);
    if (this.cursors.up.isDown)    body.setVelocityY(-SPEED);
    if (this.cursors.down.isDown)  body.setVelocityY(SPEED);

    body.velocity.normalize().scale(SPEED);
  }

  _collectItem(player, item) {
    this.inventory[item.itemType]++;
    this._showFloatingText(item.x, item.y, '+1 ' + item.itemLabel, '#ffd700');
    item.destroy();
    this.events.emit('inventoryChanged', this.inventory);
  }

  _checkInteractions() {
    // Interactable objects
    this.interactables.forEach(obj => {
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, obj.x, obj.y);
      obj.hintText.setVisible(dist < 60);

      if (dist < 60 && Phaser.Input.Keyboard.JustDown(this.keyE)) {
        this._doInteraction(obj);
      }
    });

    // Craft zones
    this.craftZones.forEach(zone => {
      if (zone.built) return;
      const dist = Phaser.Math.Distance.Between(this.player.x, this.player.y, zone.x, zone.y);
      zone.marker.setAlpha(dist < 60 ? 0.6 : 0.25);

      if (dist < 60 && Phaser.Input.Keyboard.JustDown(this.keyE)) {
        this._tryCraft(zone);
      }
    });
  }

  _doInteraction(obj) {
    if (obj.actionType === 'chest') {
      this.inventory.wood += 2;
      this.inventory.rope += 1;
      this._showMessage('You opened the chest!\nFound 2 wood and 1 rope!');
      obj.hintText.destroy();
      obj.destroy();
      this.interactables = this.interactables.filter(o => o !== obj);
      this.events.emit('inventoryChanged', this.inventory);
    } else if (obj.actionType === 'lightFire') {
      this.tasks.lightFire = true;
      obj.hintText.destroy();
      obj.destroy();
      this.interactables = this.interactables.filter(o => o !== obj);
      this.events.emit('tasksChanged', this.tasks);
      this.triggerRescue();
    }
  }

  _tryCraft(zone) {
    const recipe = zone.recipe;
    const canCraft = Object.keys(recipe).every(k => this.inventory[k] >= recipe[k]);

    if (!canCraft) {
      const needed = Object.keys(recipe).map(k => `${recipe[k]} ${k}`).join(', ');
      this._showMessage(`Need: ${needed}\nKeep exploring!`);
      return;
    }

    Object.keys(recipe).forEach(k => { this.inventory[k] -= recipe[k]; });
    zone.built = true;
    zone.marker.setVisible(false);
    zone.text.setVisible(false);

    const key = zone.result;
    const spriteKey = key === 'signalFire' ? 'signal_fire' : key;
    zone.sprite = this.add.image(zone.x, zone.y, spriteKey).setDepth(4);

    this.events.emit('inventoryChanged', this.inventory);

    if (key === 'shelter') {
      this.tasks.buildShelter = true;
      this._showMessage('Shelter built! You can now survive the nights.\nNow build a signal fire to call for rescue!');
    } else if (key === 'signalFire') {
      this.tasks.buildSignalFire = true;
      this._showMessage('Signal fire built! Light it when you\'re ready\nto signal passing ships. Press E near it!');
      // Make it interactive
      const fireInteract = this.physics.add.staticSprite(zone.x, zone.y, 'signal_fire')
        .setDepth(4).setAlpha(0).refreshBody();
      fireInteract.actionType = 'lightFire';
      fireInteract.actionLabel = 'Light Signal Fire';
      const hint = this.add.text(zone.x, zone.y - 36, '[E] Light Signal Fire', {
        fontSize: '10px', fill: '#fff', backgroundColor: '#000',
        padding: { x: 3, y: 2 }
      }).setOrigin(0.5).setDepth(10).setVisible(false);
      fireInteract.hintText = hint;
      this.interactables.push(fireInteract);
    } else if (key === 'raft') {
      this.tasks.buildRaft = true;
      this._showMessage('Raft built! Now build and light a signal fire\nto get rescued!');
    }

    this.events.emit('tasksChanged', this.tasks);
  }

  _updateDayCycle(delta) {
    this.dayTimer += delta;
    if (this.dayTimer >= this.DAY_LENGTH) {
      this.dayTimer = 0;
      this.day++;
      this.events.emit('dayChanged', this.day);

      if (!this.tasks.buildShelter && this.day > 2) {
        this.hunger = Math.max(0, this.hunger - 20);
        this._showMessage(`Night ${this.day - 1}: Cold without shelter!\nHunger drops faster. Build a shelter!`);
      }
    }

    // Day/night alpha
    const progress = this.dayTimer / this.DAY_LENGTH;
    const nightAlpha = progress > 0.75 ? (progress - 0.75) * 4 * 0.6 :
                       progress < 0.1  ? (0.1 - progress) * 10 * 0.6 : 0;
    this.nightOverlay.setAlpha(nightAlpha);
  }

  _updateHunger(delta) {
    const rate = this.tasks.buildShelter ? 0.002 : 0.004;
    this.hunger = Math.max(0, this.hunger - rate * delta / 100);

    if (this.hunger <= 0) {
      this._showMessage('You\'re starving! Eat fish or berries.\nPress E near food items on the ground.');
      this.hunger = 20;
    }

    this.events.emit('hungerChanged', this.hunger);
  }

  triggerRescue() {
    if (this.rescued) return;
    if (!this.tasks.buildSignalFire) {
      this._showMessage('You need to build a signal fire first!');
      return;
    }
    this.rescued = true;

    // Celebration
    this.cameras.main.flash(1000, 255, 255, 255);
    this.time.delayedCall(1200, () => {
      this._showMessage(
        `RESCUED! A ship spotted your signal fire!\n` +
        `You survived ${this.day} days on the island.\n` +
        `Well done, survivor!`
      );
      this.events.emit('rescued');
    });
  }

  _showMessage(text) {
    this.events.emit('showMessage', text);
  }

  _showFloatingText(x, y, text, color = '#ffffff') {
    const t = this.add.text(x, y - 10, text, {
      fontSize: '12px', fill: color, stroke: '#000', strokeThickness: 3
    }).setOrigin(0.5).setDepth(20);

    this.tweens.add({
      targets: t, y: y - 40, alpha: 0, duration: 900,
      onComplete: () => t.destroy()
    });
  }
}
