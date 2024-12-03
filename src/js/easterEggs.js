// Konami Code implementation
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let chars = '01';
    chars = chars.split('');

    let fontSize = 10;
    let drops = [];

    function initMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = canvas.width / fontSize;
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    window.addEventListener('resize', initMatrix);
    initMatrix();
    return setInterval(drawMatrix, 33);
}

// Hidden cursor trail effect
function createCursorTrail() {
    const colors = ['#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C'];
    let particles = [];
    
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = e.pageX + 'px';
        particle.style.top = e.pageY + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(particle);
        
        particles.push({
            element: particle,
            timeLeft: 10
        });
        
        if (particles.length > 50) {
            const oldParticle = particles.shift();
            oldParticle.element.remove();
        }
    });
    
    setInterval(() => {
        particles.forEach((particle, index) => {
            particle.timeLeft--;
            particle.element.style.opacity = particle.timeLeft / 10;
            if (particle.timeLeft <= 0) {
                particle.element.remove();
                particles.splice(index, 1);
            }
        });
    }, 100);
}

export function initializeEasterEggs() {
    let matrixInterval = null;
    let isMatrixActive = false;

    // Konami Code listener
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                isMatrixActive = !isMatrixActive;
                if (isMatrixActive) {
                    matrixInterval = createMatrixRain();
                    document.body.classList.add('matrix-mode');
                } else {
                    clearInterval(matrixInterval);
                    document.body.classList.remove('matrix-mode');
                    const canvas = document.querySelector('canvas');
                    if (canvas) canvas.remove();
                }
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Secret click combination for cursor trail
    let clickCount = 0;
    let clickTimer = null;
    
    document.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        
        clickTimer = setTimeout(() => {
            if (clickCount === 3) {
                createCursorTrail();
            }
            clickCount = 0;
        }, 500);
    });

    // Hidden title message
    let originalTitle = document.title;
    let isHidden = false;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = "🕹️ Come back to hack! 💻";
            isHidden = true;
        } else {
            document.title = originalTitle;
            isHidden = false;
        }
    });
}