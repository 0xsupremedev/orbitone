export class Projectile {
    constructor(engine, x, y, angle) {
        this.engine = engine;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 500; // pixels per second
        this.radius = 5;
        this.markedForDeletion = false;
    }

    update(dt) {
        // Move outward from the center (star)
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;

        // Delete if out of bounds
        const dist = Math.sqrt(
            Math.pow(this.x - this.engine.center.x, 2) +
            Math.pow(this.y - this.engine.center.y, 2)
        );
        if (dist > 1000) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Laser bolt trail
        const gradient = ctx.createLinearGradient(-20, 0, 10, 0);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(0, 242, 255, 0.5)');
        gradient.addColorStop(1, '#00f2ff');

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f2ff';

        ctx.beginPath();
        ctx.moveTo(-20, -2);
        ctx.lineTo(10, -3);
        ctx.lineTo(12, 0);
        ctx.lineTo(10, 3);
        ctx.lineTo(-20, 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

