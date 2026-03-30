// Subtle "raining code" effect in the background
class MatrixParticles {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.characters = '0101010101010101';
        this.fontSize = 14;
    }

    // ... implementation
}

// Matrix Background - vertical "Diamonds"
class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.id = 'matrix-bg';
        
        // Insert into body, but with negative z-index in CSS
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.symbols = ['◊', '⬦', '⬩', '♦', '♢'];
        this.fontSize = 24;
        this.columns = 0;
        this.drops = [];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        // Background very slow (almost imperceptible)
        this.ctx.fillStyle = 'rgba(10, 14, 10, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw symbols
        this.ctx.fillStyle = '#00ff37';
        this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`;
        this.ctx.shadowColor = '#285c28';
        this.ctx.shadowBlur = 4;
        this.ctx.globalAlpha = 0.45;
        
        for (let i = 0; i < this.drops.length; i++) {
            const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(symbol, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Begin when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MatrixBackground();
});