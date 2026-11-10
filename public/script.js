// 1. Lenis Smooth Scroll
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. Custom Cursor Physics
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25 });
});

document.querySelectorAll('.magnetic, a, button, .card').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        gsap.to(ring, { scale: 1.6, borderColor: '#3b82f6', duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 240, 255, 0.4)', duration: 0.2 });
    });
});

// 3. GSAP Entry Animations & Counters
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-title', { y: 60, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.2 });
gsap.from('.glass-card', {
    scrollTrigger: { trigger: '.work', start: 'top 80%' },
    y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out'
});

document.querySelectorAll('.counter').forEach(counter => {
    const target = +counter.getAttribute('data-target');
    gsap.to(counter, {
        scrollTrigger: { trigger: '.stats-banner', start: 'top 85%' },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power1.inOut'
    });
});

// 4. Interactive Magnetic Hover Effect for Hero Title
const heroTitle = document.querySelector('.hero-title');

if (heroTitle) {
    heroTitle.addEventListener('mousemove', (e) => {
        const rect = heroTitle.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(heroTitle, {
            x: x * 0.12,
            y: y * 0.12,
            rotateX: -y * 0.04,
            rotateY: x * 0.04,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });

    heroTitle.addEventListener('mouseleave', () => {
        gsap.to(heroTitle, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.4)'
        });
    });
}

// 5. Interactive Terminal CLI
function toggleTerminal() {
    document.getElementById('terminal-modal').classList.toggle('active');
}

window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        toggleTerminal();
    }
});

const termInput = document.getElementById('term-input');
const termBody = document.getElementById('terminal-body');

const commands = {
    help: "Available commands: <span class='cyan'>about</span>, <span class='cyan'>skills</span>, <span class='cyan'>experience</span>, <span class='cyan'>projects</span>, <span class='cyan'>github</span>, <span class='cyan'>contact</span>, <span class='cyan'>clear</span>",
    about: "Srujan B A — Full-Stack Developer & Operations Specialist based in Bengaluru.",
    skills: "Node.js, Express, EJS, SQL, Chrome Extensions (Manifest V3), JavaScript, Operations Management.",
    experience: "Ex-Assistant Store Manager at Swiggy Instamart (Managed 3k+ daily orders and teams of 35+ personnel).",
    projects: "1. Srujan Mail AI Tool v1.0 (Gemini Powered Chrome Extension)\n2. Q-Commerce Inventory Tracker & Automation\n3. Full-Stack Agency Platforms",
    github: "GitHub: https://github.com/srujan-jagadeesh",
    contact: "Phone: 6364260803 | Email: srujansrujan128@gmail.com | LinkedIn: https://www.linkedin.com/in/srujanjagadeesh/"
};

termInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = termInput.value.trim().toLowerCase();
        termInput.value = '';

        const line = document.createElement('p');
        line.className = 'term-line';
        line.innerHTML = `<span class="prompt">visitor@srujan-dev:~$</span> ${input}`;
        termBody.appendChild(line);

        const response = document.createElement('p');
        response.className = 'term-line';
        
        if (input === 'clear') {
            termBody.innerHTML = '';
            return;
        }

        response.innerHTML = commands[input] || `Command not found: '${input}'. Type <span class='cyan'>help</span> for available commands.`;
        termBody.appendChild(response);
        termBody.scrollTop = termBody.scrollHeight;
    }
});