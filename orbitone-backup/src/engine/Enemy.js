export class Enemy {
    constructor(engine) {
        this.engine = engine;
        this.radius = 20;
        this.markedForDeletion = false;

        // Spawn at random edge point
        const angle = Math.random() * Math.PI * 2;
        const spawnDist = Math.max(window.innerWidth, window.innerHeight);
        this.x = this.engine.center.x + Math.cos(angle) * spawnDist;
        this.y = this.engine.center.y + Math.sin(angle) * spawnDist;

        this.speed = 100 + Math.random() * 100;
        this.health = 1;

        // Load enemy ship sprite (shared across all enemies)
        if (!Enemy.sprite) {
            Enemy.sprite = new Image();
            Enemy.sprite.src = './assets/enemy-ship.png';
            Enemy.spriteLoaded = false;
            Enemy.sprite.onload = () => { Enemy.spriteLoaded = true; };
        }
    }

    update(dt) {
        // Move towards center
        const dx = this.engine.center.x - this.x;
        const dy = this.engine.center.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        this.x += (dx / dist) * this.speed * dt;
        this.y += (dy / dist) * this.speed * dt;
        this.angle = Math.atan2(dy, dx); // Point towards center

        // Check if reached star
        if (dist < 80) {
            this.engine.onStarHit();
            this.markedForDeletion = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2); // Rotate to face center

        const shipSize = 40;
        if (Enemy.spriteLoaded) {
            ctx.drawImage(Enemy.sprite, -shipSize / 2, -shipSize / 2, shipSize, shipSize);
        } else {
            // Fallback to triangle if sprite not loaded
            ctx.fillStyle = '#ff4400';
            ctx.strokeStyle = '#ffaa00';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff4400';
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(12, 10);
            ctx.lineTo(-12, 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.restore();
    }
}

