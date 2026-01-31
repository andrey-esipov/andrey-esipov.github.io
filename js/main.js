/**
 * Bento Grid - Refined Animations & Interactions
 * Editorial pastel aesthetic with expanding buttons
 */

document.addEventListener('DOMContentLoaded', () => {
    initEntranceAnimations();
    initDragAndDrop();
    initButtonInteractions();
    initHoverSounds();
});

/* ===========================================
   SUBTLE HOVER SOUNDS
   Uses Web Audio API for soft, tasteful clicks
   =========================================== */
let audioContext = null;

function initHoverSounds() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            playHoverSound();
        });
    });
}

function playHoverSound() {
    // Lazy init audio context (required by browsers)
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    // Create a very subtle, soft click
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // High frequency for subtle "tap" feel
    oscillator.frequency.setValueAtTime(2400, audioContext.currentTime);
    oscillator.type = 'sine';

    // Very quiet - barely perceptible
    gainNode.gain.setValueAtTime(0.015, audioContext.currentTime);
    // Quick fade out for soft click
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.04);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.04);
}

/* ===========================================
   STAGGERED ENTRANCE ANIMATIONS
   =========================================== */
function initEntranceAnimations() {
    const cards = document.querySelectorAll('.card');

    // Create intersection observer for scroll-triggered animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initial load animation with stagger
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = `
                opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                box-shadow 0.4s ease
            `;
            card.classList.add('visible');
        }, 100 + (index * 70));
    });
}

/* ===========================================
   DRAG AND DROP REORDERING
   =========================================== */
let draggedCard = null;
let dragStartPos = { x: 0, y: 0 };

function initDragAndDrop() {
    const cards = document.querySelectorAll('.card');
    const grid = document.getElementById('bentoGrid');

    cards.forEach(card => {
        card.setAttribute('draggable', 'true');

        // Drag Start
        card.addEventListener('dragstart', (e) => {
            draggedCard = card;
            dragStartPos = { x: e.clientX, y: e.clientY };

            // Add dragging class after a tiny delay for smoother visual
            requestAnimationFrame(() => {
                card.classList.add('dragging');
            });

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', card.dataset.id);

            // Create ghost image
            const ghost = card.cloneNode(true);
            ghost.style.opacity = '0';
            document.body.appendChild(ghost);
            e.dataTransfer.setDragImage(ghost, 0, 0);
            setTimeout(() => ghost.remove(), 0);
        });

        // Drag End
        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            document.querySelectorAll('.card').forEach(c => {
                c.classList.remove('drag-over');
            });
            draggedCard = null;
        });

        // Drag Over
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';

            if (card !== draggedCard && draggedCard) {
                card.classList.add('drag-over');
            }
        });

        // Drag Leave
        card.addEventListener('dragleave', (e) => {
            // Only remove if actually leaving the card
            if (!card.contains(e.relatedTarget)) {
                card.classList.remove('drag-over');
            }
        });

        // Drop
        card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');

            if (draggedCard && card !== draggedCard) {
                swapCards(draggedCard, card);
            }
        });
    });
}

function swapCards(card1, card2) {
    const grid = document.getElementById('bentoGrid');
    const cards = Array.from(grid.children);
    const index1 = cards.indexOf(card1);
    const index2 = cards.indexOf(card2);

    // Animate the swap
    card1.style.transition = 'none';
    card2.style.transition = 'none';

    // Perform the DOM swap
    if (index1 < index2) {
        grid.insertBefore(card1, card2.nextSibling);
    } else {
        grid.insertBefore(card1, card2);
    }

    // Re-trigger animations
    card1.classList.remove('visible');
    card2.classList.remove('visible');

    requestAnimationFrame(() => {
        card1.style.transition = `
            opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease
        `;
        card2.style.transition = card1.style.transition;

        requestAnimationFrame(() => {
            card1.classList.add('visible');
            card2.classList.add('visible');
        });
    });
}

/* ===========================================
   BUTTON INTERACTIONS
   =========================================== */
function initButtonInteractions() {
    // Add subtle haptic-like feedback on button hover
    const expandBtns = document.querySelectorAll('.expand-btn');

    expandBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            // Subtle scale bump on parent card
            const card = btn.closest('.card');
            if (card) {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });

        btn.addEventListener('mouseleave', () => {
            const card = btn.closest('.card');
            if (card) {
                card.style.transform = '';
            }
        });

        // Click feedback
        btn.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(0,0,0,0.1);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.4s ease-out;
                pointer-events: none;
            `;

            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';

            btn.style.position = 'relative';
            btn.appendChild(ripple);

            setTimeout(() => ripple.remove(), 400);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/* ===========================================
   THEME PRESETS
   =========================================== */
const themes = {
    pastel: {
        '--bg': '#f5f4f0',
        '--card-blue': '#c8e4fb',
        '--card-pink': '#ffd4e0',
        '--card-coral': '#ffe0d3',
        '--card-mint': '#d4f0e7',
        '--card-yellow': '#fef3c7'
    },
    warm: {
        '--bg': '#faf6f1',
        '--card-blue': '#e8ddd0',
        '--card-pink': '#f5d5c8',
        '--card-coral': '#fce8d5',
        '--card-mint': '#e5e8e0',
        '--card-yellow': '#f5e6c8'
    },
    cool: {
        '--bg': '#f0f3f7',
        '--card-blue': '#bfdbfe',
        '--card-pink': '#e0d4fc',
        '--card-coral': '#d4e0fc',
        '--card-mint': '#c8f0e8',
        '--card-yellow': '#e8f0c8'
    },
    sunset: {
        '--bg': '#fef6ee',
        '--card-blue': '#fcd9bd',
        '--card-pink': '#fed7e2',
        '--card-coral': '#fed7aa',
        '--card-mint': '#c6f6d5',
        '--card-yellow': '#fef08a'
    }
};

function setTheme(name) {
    const theme = themes[name];
    if (theme) {
        // Animate theme change
        document.body.style.transition = 'background 0.5s ease';
        document.querySelectorAll('.card').forEach(card => {
            card.style.transition += ', background 0.5s ease';
        });

        Object.entries(theme).forEach(([prop, val]) => {
            document.documentElement.style.setProperty(prop, val);
        });

        console.log(`🎨 Theme changed to: ${name}`);
    } else {
        console.log(`Available themes: ${Object.keys(themes).join(', ')}`);
    }
}

// Expose theme function globally
window.setTheme = setTheme;

// Log instructions
console.log('🎨 Change theme: setTheme("pastel" | "warm" | "cool" | "sunset")');
