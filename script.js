// Create background animations
function createBackgroundAnimations() {
    const heartsContainer = document.querySelector('.hearts-container');
    const floatingContainer = document.querySelector('.floating-hearts');
    const sparklesContainer = document.querySelector('.sparkles');
    
    // Static hearts
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${12 + Math.random() * 20}s`;
        heart.style.fontSize = `${18 + Math.random() * 25}px`;
        heartsContainer.appendChild(heart);
    }
    
    // Floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${16 + Math.random() * 30}px`;
        heart.style.animationDuration = `${5 + Math.random() * 8}s`;
        floatingContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    // Sparkles
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparklesContainer.appendChild(sparkle);
    }
    
    setInterval(createFloatingHeart, 800);
    
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
}

// DOM Elements
const openBtn = document.getElementById('openBtn');
const popupOverlay = document.getElementById('popupOverlay');
const closeBtn = document.getElementById('closeBtn');
const nextBtn = document.getElementById('nextBtn');
const packageElement = document.getElementById('package');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundAnimations();
    
    // Package click
    packageElement.addEventListener('click', openPopup);
    
    // Open button click
    openBtn.addEventListener('click', openPopup);
    
    // Close popup
    closeBtn.addEventListener('click', closePopup);
    
    // Close popup when clicking outside
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Next page button - Redirect to page2.html
    nextBtn.addEventListener('click', () => {
        window.location.href = 'page2.html';
    });
    
    // Package hover effect
    packageElement.addEventListener('mouseenter', () => {
        packageElement.style.transform = 'scale(1.15) rotate(5deg)';
    });
    
    packageElement.addEventListener('mouseleave', () => {
        packageElement.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Open popup function
function openPopup() {
    // Add package opening animation
    packageElement.style.animation = 'none';
    void packageElement.offsetWidth; // Trigger reflow
    
    // Add shake and open animation
    packageElement.style.animation = 'packageOpen 1s ease-in-out forwards';
    
    // Add CSS for package opening animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes packageOpen {
            0% { 
                transform: scale(1) rotate(0deg); 
            }
            25% { 
                transform: scale(1.2) rotate(-10deg); 
            }
            50% { 
                transform: scale(1.1) rotate(10deg); 
            }
            75% { 
                transform: scale(1.2) rotate(-5deg); 
            }
            100% { 
                transform: scale(1.15) rotate(0deg); 
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show popup after animation
    setTimeout(() => {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 800);
}

// Close popup function
function closePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset package animation
    setTimeout(() => {
        packageElement.style.animation = 'none';
        void packageElement.offsetWidth;
    }, 300);
}

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
        closePopup();
    }
    if (e.key === 'Enter' && !popupOverlay.classList.contains('active')) {
        openPopup();
    }
});