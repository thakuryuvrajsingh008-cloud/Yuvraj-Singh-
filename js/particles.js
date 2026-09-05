/* ============================================================
   AURORA STUDIOS — PARTICLES ENGINE (PARTICLES.JS)
   60 FPS Interactive Particle Swarm & Ambient Cyber Lines
============================================================ */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.numberOfParticles = 65;
    this.colors = ['#38bdf8', '#818cf8', '#ec4899', '#a855f7'];

    this.init();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    this.resize();
    this.particles = [];
    const count = window.innerWidth < 768 ? 30 : this.numberOfParticles;
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2.2 + 1;
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const speedX = (Math.random() - 0.5) * 0.7;
      const speedY = (Math.random() - 0.5) * 0.7;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.particles.push(new Particle(x, y, size, speedX, speedY, color, this));
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.offsetHeight;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
    });

    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  connect() {
    const maxDistance = 120;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a + 1; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.18;
          this.ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();
    }
    this.connect();
    requestAnimationFrame(this.animate.bind(this));
  }
}

class Particle {
  constructor(x, y, size, speedX, speedY, color, engine) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
    this.engine = engine;
    this.baseX = x;
    this.baseY = y;
    this.density = Math.random() * 20 + 5;
  }

  draw() {
    this.engine.ctx.beginPath();
    this.engine.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.engine.ctx.fillStyle = this.color;
    this.engine.ctx.shadowBlur = 8;
    this.engine.ctx.shadowColor = this.color;
    this.engine.ctx.fill();
    this.engine.ctx.shadowBlur = 0;
  }

  update() {
    // Collision / Boundary check
    if (this.x < 0 || this.x > this.engine.canvas.width) {
      this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y > this.engine.canvas.height) {
      this.speedY = -this.speedY;
    }

    // Mouse interactive repulsion / attraction
    if (this.engine.mouse.x != null && this.engine.mouse.y != null) {
      const dx = this.engine.mouse.x - this.x;
      const dy = this.engine.mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.engine.mouse.radius) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = this.engine.mouse.radius;
        const force = (maxDistance - distance) / maxDistance;
        const directionX = forceDirectionX * force * this.density;
        const directionY = forceDirectionY * force * this.density;
        this.x -= directionX * 0.4;
        this.y -= directionY * 0.4;
      }
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ParticleEngine('particleCanvas');
});
