class UIScene extends Phaser.Scene {
  constructor() { super('UIScene'); }

  init(data) { this.gameScene = data.gameScene; }

  create() {
    // Inventory panel
    this.invBg = this.add.rectangle(4, 4, 160, 110, 0x000000, 0.6)
      .setOrigin(0, 0).setDepth(100);

    this.add.text(12, 10, 'INVENTORY', {
      fontSize: '11px', fill: '#ffd700', fontStyle: 'bold'
    }).setDepth(101);

    this.invTexts = {};
    const items = ['wood', 'rope', 'fish', 'berries'];
    const icons  = ['🪵',   '🪢',  '🐟',  '🫐'];
    items.forEach((item, i) => {
      this.invTexts[item] = this.add.text(12, 26 + i * 18, `${icons[i]} ${item}: 0`, {
        fontSize: '11px', fill: '#ffffff'
      }).setDepth(101);
    });

    // Stats panel
    this.statBg = this.add.rectangle(796, 4, 160, 50, 0x000000, 0.6)
      .setOrigin(1, 0).setDepth(100);

    this.add.text(644, 10, 'Day:', { fontSize: '11px', fill: '#ffd700' }).setDepth(101);
    this.dayText = this.add.text(680, 10, '1', { fontSize: '11px', fill: '#fff' }).setDepth(101);

    this.add.text(644, 28, 'Hunger:', { fontSize: '11px', fill: '#ffd700' }).setDepth(101);
    this.hungerBar = this.add.rectangle(700, 34, 84, 10, 0x00cc44).setOrigin(0, 0.5).setDepth(101);
    this.add.rectangle(700, 34, 84, 10, 0x333333).setOrigin(0, 0.5).setDepth(100);

    // Tasks panel
    this.taskBg = this.add.rectangle(796, 58, 180, 110, 0x000000, 0.6)
      .setOrigin(1, 0).setDepth(100);
    this.add.text(624, 64, 'OBJECTIVES', {
      fontSize: '11px', fill: '#ffd700', fontStyle: 'bold'
    }).setDepth(101);

    const taskDefs = [
      { key: 'buildShelter',   label: 'Build a Shelter' },
      { key: 'buildSignalFire',label: 'Build Signal Fire' },
      { key: 'lightFire',      label: 'Light Signal Fire' },
      { key: 'buildRaft',      label: 'Build a Raft (bonus)' },
    ];
    this.taskTexts = {};
    taskDefs.forEach((t, i) => {
      this.taskTexts[t.key] = this.add.text(620, 80 + i * 18, `○ ${t.label}`, {
        fontSize: '10px', fill: '#aaaaaa'
      }).setDepth(101);
    });

    // Message box
    this.msgBg = this.add.rectangle(400, 560, 560, 70, 0x000000, 0.85)
      .setDepth(200).setVisible(false);
    this.msgText = this.add.text(400, 560, '', {
      fontSize: '13px', fill: '#ffffff', align: 'center',
      wordWrap: { width: 540 }
    }).setOrigin(0.5).setDepth(201).setVisible(false);
    this.msgTimer = null;

    // Wire up events
    const gs = this.gameScene;
    gs.events.on('inventoryChanged', inv => {
      Object.keys(this.invTexts).forEach(k => {
        const icons = { wood: '🪵', rope: '🪢', fish: '🐟', berries: '🫐' };
        this.invTexts[k].setText(`${icons[k]} ${k}: ${inv[k]}`);
      });
    });

    gs.events.on('dayChanged', day => {
      this.dayText.setText(String(day));
    });

    gs.events.on('hungerChanged', hunger => {
      const w = (hunger / 100) * 84;
      this.hungerBar.setSize(Math.max(0, w), 10);
      this.hungerBar.setFillStyle(hunger > 50 ? 0x00cc44 : hunger > 25 ? 0xffaa00 : 0xff3300);
    });

    gs.events.on('tasksChanged', tasks => {
      Object.keys(tasks).forEach(k => {
        if (this.taskTexts[k]) {
          const done = tasks[k];
          this.taskTexts[k].setText((done ? '✓ ' : '○ ') + this.taskTexts[k].text.slice(2));
          this.taskTexts[k].setFill(done ? '#00ff88' : '#aaaaaa');
        }
      });
    });

    gs.events.on('showMessage', text => {
      this.msgText.setText(text);
      this.msgBg.setVisible(true);
      this.msgText.setVisible(true);

      if (this.msgTimer) this.msgTimer.remove();
      this.msgTimer = this.time.delayedCall(4000, () => {
        this.msgBg.setVisible(false);
        this.msgText.setVisible(false);
      });
    });

    gs.events.on('rescued', () => {
      this.msgBg.setVisible(true);
      this.msgText.setVisible(true);
      if (this.msgTimer) this.msgTimer.remove();
    });
  }
}
