// DOM Elements
const questionText = document.getElementById('questionText');
const questionCount = document.getElementById('questionCount');
const optionsContainer = document.getElementById('optionsContainer');
const scoreValue = document.getElementById('scoreValue');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultsContainer = document.getElementById('resultsContainer');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const finalScore = document.getElementById('finalScore');
const retryBtn = document.getElementById('retryBtn');
const continueBtn = document.getElementById('continueBtn');
const celebrationContainer = document.getElementById('celebrationContainer');
const heartBreakContainer = document.getElementById('heartBreakContainer');
const messagePopup = document.getElementById('messagePopup');
const messageText = document.getElementById('messageText');
const closeMessage = document.getElementById('closeMessage');
const okBtn = document.getElementById('okBtn');

// Quiz State
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// Initialize Quiz
function initQuiz() {
    loadQuestion();
    updateProgress();
    createBackgroundAnimations();
}

// Create background animations
function createBackgroundAnimations() {
    const heartsContainer = document.querySelector('.hearts-container');
    const floatingContainer = document.querySelector('.floating-hearts');
    const sparklesContainer = document.querySelector('.sparkles');
    
    // Static hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-bg');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${12 + Math.random() * 20}s`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        heartsContainer.appendChild(heart);
    }
    
    // Floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${15 + Math.random() * 25}px`;
        heart.style.animationDuration = `${5 + Math.random() * 8}s`;
        floatingContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }
    
    // Sparkles
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparklesContainer.appendChild(sparkle);
    }
    
    setInterval(createFloatingHeart, 1000);
    for (let i = 0; i < 5; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }
}

// Load Question
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    
    questionCount.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        if (userAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        button.innerHTML = `
            <span class="option-number">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option}</span>
        `;
        
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
    
    updateNavigationButtons();
}

// Select Option
function selectOption(selectedIndex) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => button.classList.remove('selected'));
    buttons[selectedIndex].classList.add('selected');
    
    userAnswers[currentQuestion] = selectedIndex;
    nextBtn.disabled = false;
}

// Check Answer
function checkAnswer() {
    const selectedAnswer = userAnswers[currentQuestion];
    const correctAnswer = quizQuestions[currentQuestion].correct;
    const buttons = document.querySelectorAll('.option-btn');
    
    // Mark correct and wrong answers
    buttons.forEach((button, index) => {
        if (index === correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('wrong');
        }
    });
    
    if (selectedAnswer === correctAnswer) {
        score++;
        createCelebration();
        showLoveMessage(quizQuestions[currentQuestion].loveMessage);
    } else {
        createHeartBreak();
        showLoveMessage(wrongAnswerMessages[Math.floor(Math.random() * wrongAnswerMessages.length)]);
    }
    
    scoreValue.textContent = `${score}/${quizQuestions.length}`;
    updateProgress();
}

// Create Celebration Effect
function createCelebration() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-poppers');
            heart.innerHTML = '❤️';
            heart.style.left = `${50 + (Math.random() - 0.5) * 30}%`;
            heart.style.top = `${50 + (Math.random() - 0.5) * 30}%`;
            heart.style.fontSize = `${20 + Math.random() * 30}px`;
            heart.style.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
            heart.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
            
            celebrationContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, i * 50);
    }
}

// Create Heart Break Effect
function createHeartBreak() {
    heartBreakContainer.style.display = 'block';
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 8; i++) {
        const piece = document.createElement('div');
        piece.classList.add('broken-heart-piece');
        piece.innerHTML = '💔';
        piece.style.left = `${centerX}px`;
        piece.style.top = `${centerY}px`;
        piece.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
        piece.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
        piece.style.setProperty('--rot', `${(Math.random() - 0.5) * 360}deg`);
        
        heartBreakContainer.appendChild(piece);
        
        setTimeout(() => {
            piece.remove();
        }, 1000);
    }
    
    setTimeout(() => {
        heartBreakContainer.style.display = 'none';
    }, 1000);
}

// Show Love Message
function showLoveMessage(message) {
    messageText.textContent = message;
    messagePopup.classList.add('show');
}

// Close Love Message
function closeLoveMessage() {
    messagePopup.classList.remove('show');
}

// Update Navigation Buttons
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = userAnswers[currentQuestion] === null;
    nextBtn.textContent = currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question';
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Show Results
function showResults() {
    document.getElementById('quizContainer').style.display = 'none';
    resultsContainer.style.display = 'block';
    
    finalScore.textContent = score;
    
    if (score >= 8) {
        resultIcon.innerHTML = '<i class="fas fa-trophy"></i>';
        resultTitle.textContent = 'Congratulations! 🎉';
        resultMessage.textContent = `You passed with flying colors! You know me so well, my love! With ${score}/10 correct answers, you've earned the next surprise!`;
        continueBtn.style.display = 'inline-flex';
    } else {
        resultIcon.innerHTML = '<i class="fas fa-heart-broken"></i>';
        resultTitle.textContent = 'Almost There! 💔';
        resultMessage.textContent = `You got ${score}/10. You need at least 8 correct answers to continue. But don't worry, my love for you is perfect even if your score isn't! Try again?`;
        continueBtn.style.display = 'none';
    }
}

// Event Listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (userAnswers[currentQuestion] === null) return;
    
    checkAnswer();
    
    if (currentQuestion === quizQuestions.length - 1) {
        setTimeout(showResults, 1500);
    } else {
        currentQuestion++;
        loadQuestion();
    }
});

closeMessage.addEventListener('click', closeLoveMessage);
okBtn.addEventListener('click', closeLoveMessage);

retryBtn.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers.fill(null);
    scoreValue.textContent = '0/10';
    resultsContainer.style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    loadQuestion();
    updateProgress();
});

continueBtn.addEventListener('click', () => {
    // This will go to page 3 when we create it
    alert('This will go to the next page! For now, it shows this message.');
    // window.location.href = 'page3.html';
});

// Close message popup when clicking outside
messagePopup.addEventListener('click', (e) => {
    if (e.target === messagePopup) {
        closeLoveMessage();
    }
});

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);