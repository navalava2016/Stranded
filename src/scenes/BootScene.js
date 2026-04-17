class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this._makeTexture('player', 16, 16, (g) => {
      // Body
      g.fillStyle(0xf4a460); g.fillRect(4, 4, 8, 10);
      // Head
      g.fillStyle(0xf4a460); g.fillRect(5, 0, 6, 5);
      // Hair
      g.fillStyle(0x8b4513); g.fillRect(4, 0, 8, 2);
      // Eyes
      g.fillStyle(0x000000); g.fillRect(6, 2, 1, 1); g.fillRect(9, 2, 1, 1);
      // Shirt (torn)
      g.fillStyle(0x87ceeb); g.fillRect(4, 5, 8, 5);
      // Legs
      g.fillStyle(0x4169e1); g.fillRect(4, 12, 3, 4); g.fillRect(9, 12, 3, 4);
    });

    this._makeTexture('sand', 32, 32, (g) => {
      g.fillStyle(0xf5deb3); g.fillRect(0, 0, 32, 32);
      g.fillStyle(0xe8c99a);
      for (let i = 0; i < 12; i++) {
        g.fillRect((i * 7) % 30, (i * 11) % 30, 2, 2);
      }
    });

    this._makeTexture('water', 32, 32, (g) => {
      g.fillStyle(0x006994); g.fillRect(0, 0, 32, 32);
      g.fillStyle(0x0080b3);
      g.fillRect(2, 8, 28, 3); g.fillRect(2, 20, 28, 3);
      g.fillStyle(0x40a0c8);
      g.fillRect(4, 10, 10, 1); g.fillRect(18, 22, 10, 1);
    });

    this._makeTexture('grass', 32, 32, (g) => {
      g.fillStyle(0x4a8f3f); g.fillRect(0, 0, 32, 32);
      g.fillStyle(0x3d7a35);
      for (let i = 0; i < 8; i++) {
        g.fillRect((i * 9) % 28, (i * 13) % 28, 4, 4);
      }
    });

    this._makeTexture('palm', 32, 48, (g) => {
      // Trunk
      g.fillStyle(0x8b6914); g.fillRect(13, 24, 6, 24);
      // Leaves
      g.fillStyle(0x228b22);
      g.fillTriangle(16, 0, 0, 20, 8, 18);
      g.fillTriangle(16, 0, 32, 20, 24, 18);
      g.fillTriangle(16, 0, 4, 12, 16, 20);
      g.fillTriangle(16, 0, 28, 12, 16, 20);
      g.fillTriangle(16, 0, 16, 24, 8, 10);
      // Coconuts
      g.fillStyle(0x4a3728); g.fillCircle(10, 22, 3); g.fillCircle(22, 22, 3);
    });

    this._makeTexture('rock', 24, 20, (g) => {
      g.fillStyle(0x808080); g.fillEllipse(12, 10, 24, 20);
      g.fillStyle(0x696969); g.fillEllipse(10, 8, 14, 10);
      g.fillStyle(0x999999); g.fillEllipse(16, 14, 6, 4);
    });

    this._makeTexture('wood', 20, 14, (g) => {
      g.fillStyle(0x8b4513); g.fillRect(0, 3, 20, 8);
      g.fillStyle(0xa0522d); g.fillRect(2, 4, 16, 2); g.fillRect(4, 7, 12, 2);
      g.fillStyle(0x6b3410); g.fillRect(0, 3, 20, 1); g.fillRect(0, 10, 20, 1);
    });

    this._makeTexture('rope', 16, 16, (g) => {
      g.fillStyle(0xd2b48c);
      for (let i = 0; i < 16; i += 4) {
        g.fillRect(i, 0, 2, 16);
      }
      g.fillStyle(0xc4a882);
      for (let i = 0; i < 16; i += 8) {
        g.fillRect(0, i, 16, 2);
      }
    });

    this._makeTexture('signal_fire', 32, 32, (g) => {
      // Log pile
      g.fillStyle(0x8b4513); g.fillRect(4, 22, 24, 8);
      // Fire
      g.fillStyle(0xff4500); g.fillTriangle(16, 4, 6, 24, 26, 24);
      g.fillStyle(0xff8c00); g.fillTriangle(16, 8, 8, 24, 24, 24);
      g.fillStyle(0xffd700); g.fillTriangle(16, 12, 10, 24, 22, 24);
      // Smoke
      g.fillStyle(0x888888);
      g.fillCircle(14, 2, 3); g.fillCircle(18, 1, 2); g.fillCircle(16, 3, 2);
    });

    this._makeTexture('fish', 16, 10, (g) => {
      g.fillStyle(0x4169e1);
      g.fillEllipse(8, 5, 14, 8);
      // Tail
      g.fillTriangle(15, 5, 12, 0, 12, 10);
      // Eye
      g.fillStyle(0xffffff); g.fillCircle(4, 4, 2);
      g.fillStyle(0x000000); g.fillCircle(4, 4, 1);
    });

    this._makeTexture('berries', 16, 16, (g) => {
      g.fillStyle(0x228b22);
      g.fillRect(7, 0, 2, 8); g.fillRect(4, 2, 3, 2); g.fillRect(9, 3, 3, 2);
      g.fillStyle(0xff0000);
      g.fillCircle(4, 9, 3); g.fillCircle(12, 9, 3); g.fillCircle(8, 13, 3);
    });

    this._makeTexture('shelter', 48, 40, (g) => {
      // Frame
      g.fillStyle(0x8b4513); g.fillRect(4, 20, 40, 20); g.fillRect(0, 20, 6, 20); g.fillRect(42, 20, 6, 20);
      // Roof (leaves)
      g.fillStyle(0x228b22); g.fillTriangle(24, 0, 0, 22, 48, 22);
      g.fillStyle(0x196619); g.fillRect(0, 18, 48, 4);
      // Door opening
      g.fillStyle(0x1a0a00); g.fillRect(18, 24, 12, 16);
    });

    this._makeTexture('chest', 24, 20, (g) => {
      g.fillStyle(0x8b4513); g.fillRect(0, 4, 24, 16);
      g.fillStyle(0xa0522d); g.fillRect(2, 6, 20, 12);
      // Lid
      g.fillStyle(0x8b4513); g.fillRect(0, 0, 24, 6);
      g.fillStyle(0xffd700); g.fillRect(10, 8, 4, 6); // lock
      g.fillRect(11, 9, 2, 4);
    });

    this._makeTexture('raft', 48, 32, (g) => {
      g.fillStyle(0x8b4513);
      for (let i = 0; i < 48; i += 12) g.fillRect(i, 4, 10, 24);
      g.fillStyle(0xd2b48c); g.fillRect(0, 2, 48, 4); g.fillRect(0, 26, 48, 4);
      // Mast
      g.fillStyle(0x6b3410); g.fillRect(22, 0, 4, 28);
      // Sail
      g.fillStyle(0xffffff); g.fillTriangle(24, 2, 24, 20, 40, 14);
    });

    this.scene.start('GameScene');
  }

  _makeTexture(key, w, h, drawFn) {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    drawFn(g);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
