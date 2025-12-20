import { Enemy } from './Enemy.js';

export class GameEngine {
    constructor(game) {
        this.game = game;
        this.canvas = game.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.running = false;

        this.entities = [];
        this.projectiles = [];
        this.enemies = [];
        this.player = null;
        this.score = 0;
        this.starHealth = 100;

        this.spawnTimer = 0;
        this.spawnRate = 2; // seconds between spawns

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.center = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    }

    start() {
        this.running = true;
        this.score = 0;
        this.starHealth = 100;
        this.projectiles = [];
        this.enemies = [];
        this.lastTime = performance.now();
        this.loop();
    }

    stop() {
        this.running = false;
    }

    loop() {
        if (!this.running) return;

        const now = performance.now();
        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.update(dt);
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    update(dt) {
        if (!this.running) return;

        if (this.player) this.player.update(dt);

        // Spawn enemies
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnRate) {
            this.enemies.push(new Enemy(this));
            this.spawnTimer = 0;
            // Gradually increase difficulty
            this.spawnRate *= 0.99;
        }

        // Update entities
        this.projectiles.forEach(p => p.update(dt));
        this.enemies.forEach(e => e.update(dt));

        // Collision Detection
        this.checkCollisions();

        // Cleanup
        this.projectiles = this.projectiles.filter(p => !p.markedForDeletion);
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);
    }

    checkCollisions() {
        this.projectiles.forEach(p => {
            this.enemies.forEach(e => {
                const dx = p.x - e.x;
                const dy = p.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < p.radius + e.radius) {
                    p.markedForDeletion = true;
                    e.markedForDeletion = true;
                    this.score += 10;
                    this.game.state.credits += 1;
                }
            });
        });
    }

    onStarHit() {
        this.starHealth -= 10;
        if (this.starHealth <= 0) {
            this.stop();
            this.game.showScreen('game-over');
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Star
        this.drawStar();

        // Draw Orbit
        this.drawOrbit();

        // Draw HUD
        this.drawHUD();

        // Draw Entities
        this.projectiles.forEach(p => p.draw(this.ctx));
        this.enemies.forEach(e => e.draw(this.ctx));

        // Draw Player
        if (this.player) this.player.draw(this.ctx);
    }

    drawHUD() {
        this.ctx.save();

        // Score
        this.ctx.fillStyle = '#00f2ff';
        this.ctx.font = 'bold 24px Outfit';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`SCORE: ${this.score}`, 40, 50);

        // Credits / Coins
        this.ctx.font = '18px Outfit';
        this.ctx.fillText(`CREDITS: ${this.game.state.credits}`, 40, 80);

        // Health bar Core
        const barWidth = 200;
        const barHeight = 10;
        const px = 40;
        const py = 100;

        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(px, py, barWidth, barHeight);

        const healthPercent = this.starHealth / 100;
        const fillWidth = (barWidth - 4) * healthPercent;

        const gradient = this.ctx.createLinearGradient(px, py, px + barWidth, py);
        gradient.addColorStop(0, this.starHealth > 30 ? '#00f2ff' : '#ff4400');
        gradient.addColorStop(1, this.starHealth > 30 ? '#0077ff' : '#ffaa00');

        this.ctx.fillStyle = gradient;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = this.starHealth > 30 ? '#00f2ff' : '#ff4400';
        this.ctx.fillRect(px + 2, py + 2, fillWidth, barHeight - 4);

        this.ctx.restore();
    }

    drawStar() {
        const pulse = Math.sin(Date.now() / 500) * 5;
        this.ctx.shadowBlur = 40 + pulse;
        this.ctx.shadowColor = '#ffaa00';

        const gradient = this.ctx.createRadialGradient(
            this.center.x, this.center.y, 10,
            this.center.x, this.center.y, 75 + pulse
        );
        gradient.addColorStop(0, '#ffaa00');
        gradient.addColorStop(0.7, '#ff4400');
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, 75 + pulse, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    drawOrbit() {
        this.ctx.strokeStyle = 'rgba(0, 242, 255, 0.3)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.ellipse(this.center.x, this.center.y, 250, 250, 0, 0, Math.PI * 2);
        this.ctx.stroke();
    }
}
