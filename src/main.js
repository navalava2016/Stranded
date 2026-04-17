const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#4a8f3f',
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, GameScene, UIScene]
};

const game = new Phaser.Game(config);
