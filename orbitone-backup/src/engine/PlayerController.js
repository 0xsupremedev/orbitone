import { Projectile } from './Projectile.js';

export class PlayerController {
    constructor(engine) {
        this.engine = engine;
        this.angle = 0;
        this.angularVelocity = 0;
        this.maxAngularVelocity = 3; // rad/s
        this.acceleration = 12; // rad/s^2
        this.friction = 0.95;

        this.orbitRadius = 250;
        this.targetOrbitRadius = 250;
        this.minOrbitRadius = 150;
        this.maxOrbitRadius = 350;

        this.input = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.shootTimer = 0;
        this.shootRate = 1 / (this.engine.game.state.upgrades.fireRate / 5);

        // Load player ship sprite
        this.sprite = new Image();
        this.sprite.src = './assets/player-ship.png';
        this.spriteLoaded = false;
        this.sprite.onload = () => { this.spriteLoaded = true; };

        this.setupListeners();
    }

    setupListeners() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.input.left = true;
            if (e.key === 'ArrowRight' || e.key === 'd') this.input.right = true;
            if (e.key === 'ArrowUp' || e.key === 'w') this.input.up = true;
            if (e.key === 'ArrowDown' || e.key === 's') this.input.down = true;
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.input.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd') this.input.right = false;
            if (e.key === 'ArrowUp' || e.key === 'w') this.input.up = false;
            if (e.key === 'ArrowDown' || e.key === 's') this.input.down = false;
        });

        // Touch Zones
        window.addEventListener('touchstart', (e) => {
            const x = e.touches[0].clientX;
            if (x < window.innerWidth / 2) this.input.left = true;
            else this.input.right = true;
        });

        window.addEventListener('touchend', () => {
            this.input.left = false;
            this.input.right = false;
        });

        // Mouse Support for zones
        window.addEventListener('mousedown', (e) => {
            if (e.clientX < window.innerWidth / 2) this.input.left = true;
            else this.input.right = true;
        });

        window.addEventListener('mouseup', () => {
            this.input.left = false;
            this.input.right = false;
        });
    }

    update(dt) {
        // Rotation Physics
        let targetAccel = 0;
        if (this.input.left) targetAccel -= this.acceleration;
        if (this.input.right) targetAccel += this.acceleration;

        this.angularVelocity += targetAccel * dt;
        this.angularVelocity *= this.friction;

        // Cap speed
        if (Math.abs(this.angularVelocity) > this.maxAngularVelocity) {
            this.angularVelocity = Math.sign(this.angularVelocity) * this.maxAngularVelocity;
        }

        this.angle += this.angularVelocity * dt;

        // Radius Control
        if (this.input.up) this.targetOrbitRadius -= 100 * dt;
        if (this.input.down) this.targetOrbitRadius += 100 * dt;
        this.targetOrbitRadius = Math.max(this.minOrbitRadius, Math.min(this.maxOrbitRadius, this.targetOrbitRadius));

        // Lerp radius
        this.orbitRadius += (this.targetOrbitRadius - this.orbitRadius) * 0.1;

        this.x = this.engine.center.x + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.engine.center.y + Math.sin(this.angle) * this.orbitRadius;

        // Auto-Shooting logic
        this.shootTimer += dt;
        if (this.shootTimer >= this.shootRate) {
            this.shoot();
            this.shootTimer = 0;
        }
    }

    shoot() {
        // Shoot directly away from the center
        this.engine.projectiles.push(new Projectile(this.engine, this.x, this.y, this.angle));
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2);

        const shipSize = 50;
        if (this.spriteLoaded) {
            ctx.drawImage(this.sprite, -shipSize / 2, -shipSize / 2, shipSize, shipSize);
        } else {
            // Fallback to triangle if sprite not loaded
            ctx.fillStyle = '#00f2ff';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#00f2ff';
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(10, 10);
            ctx.lineTo(-10, 10);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

